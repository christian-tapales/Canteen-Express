import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const API_BASE = 'http://localhost:8080/api';

const AdminLedger = () => {
  const navigate = useNavigate();
  const { user, logout, loading, token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [shopFilter, setShopFilter] = useState('All shops');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  // Data from database
  const [ledgerStats, setLedgerStats] = useState({
    totalSalesToday: 0,
    ordersToday: 0,
    weeklyTotal: 0,
    activeVendors: 0
  });
  const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Check authentication
  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      setLoadingData(true);
      setError(null);
      
      try {
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        
        // Fetch ledger stats, orders, and shops in parallel
        const [statsRes, ordersRes, shopsRes] = await Promise.all([
          fetch(`${API_BASE}/admin/ledger/stats`, { headers }),
          fetch(`${API_BASE}/admin/ledger/orders`, { headers }),
          fetch(`${API_BASE}/admin/shops`, { headers })
        ]);
        
        if (!statsRes.ok) throw new Error('Failed to fetch ledger stats');
        if (!ordersRes.ok) throw new Error('Failed to fetch orders');
        if (!shopsRes.ok) throw new Error('Failed to fetch shops');
        
        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();
        const shopsData = await shopsRes.json();
        
        setLedgerStats(statsData);
        setOrders(ordersData);
        setShops(shopsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    };
    
    fetchData();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Format currency
  const formatCurrency = (amount) => {
    const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return `₱${num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (order.orderId && order.orderId.toString().includes(searchLower)) ||
      (order.customerName && order.customerName.toLowerCase().includes(searchLower));
    
    // Shop filter
    const matchesShop = shopFilter === 'All shops' || order.shopName === shopFilter;
    
    // Status filter (based on payment status)
    const matchesStatus = statusFilter === 'All' || order.paymentStatus === statusFilter;
    
    // Date filter
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const orderDate = order.orderDate ? new Date(order.orderDate) : null;
      if (orderDate) {
        if (dateFrom) {
          const fromDate = new Date(dateFrom);
          fromDate.setHours(0, 0, 0, 0);
          if (orderDate < fromDate) matchesDate = false;
        }
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59, 999);
          if (orderDate > toDate) matchesDate = false;
        }
      }
    }
    
    return matchesSearch && matchesShop && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  // Get unique shop names for filter dropdown
  const shopNames = ['All shops', ...new Set(shops.map(s => s.shopName).filter(Boolean))];

  // Get payment status color
  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'FAILED':
        return 'bg-red-100 text-red-700';
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Get order status color
  const getOrderStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'PREPARING':
        return 'bg-blue-100 text-blue-700';
      case 'READY':
        return 'bg-teal-100 text-teal-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['Order ID', 'Date & Time', 'Shop Name', 'Customer', 'Total Amount', 'Payment Status', 'Order Status'];
    const rows = filteredOrders.map(order => [
      `ORD-${order.orderId}`,
      formatDate(order.orderDate),
      order.shopName || 'N/A',
      order.customerName || 'N/A',
      formatCurrency(order.totalAmount),
      order.paymentStatus || 'N/A',
      order.status || 'N/A'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ledger_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-xl font-semibold text-[#8C343A]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <nav className="shadow-md" style={{ backgroundColor: '#FBCA30', padding: '1rem 0' }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#8C343A' }}
            >
              <span className="text-2xl">🍽️</span>
            </div>
            <span className="text-xl font-bold" style={{ color: '#8C343A' }}>
              Canteen Express - Admin
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm"
            style={{ 
              backgroundColor: '#8C343A',
              color: '#FFFFFF'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-73px)]">
          <div className="p-4">
            <nav className="space-y-2">
              <Link to="/admin/dashboard" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Dashboard
              </Link>
              <Link to="/admin/management" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Management
              </Link>
              <Link to="/admin/ledger" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Master Ledger
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mb-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#8C343A]">Master Ledger / Transaction History</h2>
            <p className="text-gray-600 mb-6">View, filter, and export all transactions across all vendors and students in your canteen system.</p>

            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                Error: {error}
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">
                  {loadingData ? '...' : formatCurrency(ledgerStats.totalSalesToday)}
                </h3>
                <p className="text-sm text-gray-600">Total Today</p>
                <p className="text-xs text-gray-500">Completed payments</p>
              </div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">
                  {loadingData ? '...' : ledgerStats.ordersToday}
                </h3>
                <p className="text-sm text-gray-600">Orders Today</p>
                <p className="text-xs text-gray-500">All statuses</p>
              </div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">
                  {loadingData ? '...' : formatCurrency(ledgerStats.weeklyTotal)}
                </h3>
                <p className="text-sm text-gray-600">Weekly Total</p>
                <p className="text-xs text-gray-500">Last 7 days</p>
              </div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">
                  {loadingData ? '...' : ledgerStats.activeVendors}
                </h3>
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-xs text-gray-500">Registered vendors</p>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 mb-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#8C343A]">Filters</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer name..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                />
                <select 
                  value={shopFilter}
                  onChange={(e) => { setShopFilter(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                >
                  {shopNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                >
                  <option value="All">All Payments</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleExportCSV}
                className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" 
                style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
              >
                Export to CSV
              </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden">
              {loadingData ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">Loading orders...</p>
                </div>
              ) : (
                <>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#8C343A]" style={{ backgroundColor: '#FBCA30' }}>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Order ID</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Date & Time</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Shop Name</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Customer</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Total Amount</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Payment</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-gray-500">
                            No orders found
                          </td>
                        </tr>
                      ) : (
                        paginatedOrders.map((order) => (
                          <tr key={order.orderId} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                            <td className="py-3 px-4">
                              <p className="font-semibold text-[#8C343A]">ORD-{order.orderId}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-700">{formatDate(order.orderDate)}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-semibold text-gray-700">{order.shopName || 'N/A'}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-gray-700">{order.customerName || 'N/A'}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-bold text-[#8C343A]">{formatCurrency(order.totalAmount)}</p>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusStyle(order.paymentStatus)}`}>
                                {order.paymentStatus || 'NONE'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusStyle(order.status)}`}>
                                {order.status || 'N/A'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  
                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Showing {filteredOrders.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length} transactions
                    </p>
                    {totalPages > 1 && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6] disabled:opacity-50"
                        >
                          ←
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button 
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 rounded flex items-center justify-center font-semibold ${
                                currentPage === pageNum 
                                  ? 'bg-[#8C343A] text-white' 
                                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        <button 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6] disabled:opacity-50"
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLedger;
