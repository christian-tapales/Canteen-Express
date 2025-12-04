import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const AdminLedger = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [shopFilter, setShopFilter] = useState('All shops');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Check authentication
  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Sample transaction data
  const transactions = [
    { id: 'ORD-20240614-001', date: '2024-06-14 12:45 PM', shop: "Tita's BBQ", customer: 'Aarav Mehta', amount: '₱350.00', payment: 'Completed', status: 'paid' },
    { id: 'ORD-20240614-002', date: '2024-06-14 01:15 PM', shop: 'Cool Sips & Shakes', customer: 'Priya Sharma', amount: '₱120.00', payment: 'Pending', status: 'pending' },
    { id: 'ORD-20240614-003', date: '2024-06-14 02:30 PM', shop: 'Snack Hub', customer: 'Rahul Verma', amount: '₱85.00', payment: 'Completed', status: 'paid' },
    { id: 'ORD-20240614-004', date: '2024-06-14 03:00 PM', shop: 'Green Plate Veggie Bar', customer: 'Neha Kapoor', amount: '₱280.00', payment: 'Failed', status: 'failed' },
    { id: 'ORD-20240614-005', date: '2024-06-14 04:20 PM', shop: 'Campus Bakery Bites', customer: 'Lakshmi Iyer', amount: '₱195.00', payment: 'Completed', status: 'paid' },
    { id: 'ORD-20240614-006', date: '2024-06-14 05:10 PM', shop: "Tita's BBQ", customer: 'Maria Santos', amount: '₱420.00', payment: 'Completed', status: 'paid' },
    { id: 'ORD-20240614-007', date: '2024-06-14 06:35 PM', shop: 'Cool Sips & Shakes', customer: 'John Reyes', amount: '₱150.00', payment: 'Pending', status: 'pending' },
    { id: 'ORD-20240614-008', date: '2024-06-14 07:00 PM', shop: 'Green Plate Veggie Bar', customer: 'Anna Cruz', amount: '₱310.00', payment: 'Completed', status: 'paid' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExportCSV = () => {
    alert('Export to CSV functionality to be implemented');
  };

  const handleExportPDF = () => {
    alert('Export to PDF functionality to be implemented');
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

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">₱12,450</h3>
                <p className="text-sm text-gray-600">Total Today</p>
                <p className="text-xs text-gray-500">All transactions</p>
              </div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">124</h3>
                <p className="text-sm text-gray-600">Orders Today</p>
                <p className="text-xs text-gray-500">Completed + Pending</p>
              </div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">₱98,320</h3>
                <p className="text-sm text-gray-600">Weekly Total</p>
                <p className="text-xs text-gray-500">Last 7 days</p>
              </div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold text-[#8C343A] mb-2">8</h3>
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-xs text-gray-500">Taking orders now</p>
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
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                />
                <select 
                  value={shopFilter}
                  onChange={(e) => setShopFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                >
                  <option>All shops</option>
                  <option>Tita's BBQ</option>
                  <option>Cool Sips & Shakes</option>
                  <option>Snack Hub</option>
                  <option>Green Plate Veggie Bar</option>
                  <option>Campus Bakery Bites</option>
                </select>
                <select 
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                >
                  <option>All</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
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
              <button 
                onClick={handleExportPDF}
                className="px-6 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm" 
                style={{ backgroundColor: '#8C343A' }}
              >
                Export to PDF
              </button>
              <button 
                className="px-6 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm" 
                style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}
              >
                Print Report
              </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#8C343A]" style={{ backgroundColor: '#FBCA30' }}>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Order ID</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Date & Time</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Shop Name</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Customer</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Total Amount</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Payment Status</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-[#8C343A]">{transaction.id}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-700">{transaction.date}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-700">{transaction.shop}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-700">{transaction.customer}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-[#8C343A]">{transaction.amount}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === 'paid' ? 'bg-green-100 text-green-700' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {transaction.payment}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="px-4 py-1 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm text-sm" style={{ backgroundColor: '#8C343A' }}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-600">Showing 1-8 of 124 transactions today</p>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-[#8C343A] text-white font-semibold">1</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">2</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">3</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">4</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">...</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">16</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLedger;
