import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useAuth } from '../context/useAuth';
import NotFoundPage from './NotFoundPage';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [dateFilter, setDateFilter] = useState('Today');
  const [isForbidden, setIsForbidden] = useState(false);

  // 1. Define State for Dashboard Data
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    itemsSold: 0,
    shopName: 'My Shop' // Default placeholder
  });
  const [topSellers, setTopSellers] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [peakTimes, setPeakTimes] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  // 2. Check authentication and redirect if needed
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'VENDOR')) {
      navigate('/login', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // 3. Fetch Real Data from Backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Only fetch if we have a valid logged-in vendor
      if (!user || !user.token) return;

      try {
        const headers = { 'Authorization': `Bearer ${user.token}` };
        
        // Fetch all dashboard data in parallel
        const [statsRes, topSellersRes, transactionsRes, peakTimesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/vendor/dashboard/stats', { headers }),
          axios.get('http://localhost:8080/api/vendor/dashboard/top-sellers', { headers }),
          axios.get('http://localhost:8080/api/vendor/dashboard/recent-transactions', { headers }),
          axios.get('http://localhost:8080/api/vendor/dashboard/peak-times', { headers })
        ]);

        // Update state with real data
        setStats(statsRes.data);
        setTopSellers(topSellersRes.data);
        setRecentTransactions(transactionsRes.data);
        setPeakTimes(peakTimesRes.data);
        
        setLoadingStats(false);

      } catch (error) {
        console.error("Failed to load dashboard data", error);
        if (error.response && error.response.status === 403) {
            setIsForbidden(true); // Trigger the "Ghost" 404
            setLoadingStats(false); // Stop loading
            return;
        }
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isForbidden) {
    return <NotFoundPage />;
  }

  // Static data for charts (You can replace this later with a charts endpoint)
  const salesMetrics = [
    { label: 'Gross Revenue', value: `₱${stats.revenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`, icon: '💰', change: '+12%' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '📦', change: '+8%' },
    { label: 'Average Order Value', value: stats.totalOrders > 0 ? `₱${(stats.revenue / stats.totalOrders).toLocaleString('en-PH', { minimumFractionDigits: 2 })}` : '₱0.00', icon: '💵', change: '+5%' },
    { label: 'Items Sold', value: stats.itemsSold, icon: '🛒', change: '+15%' },
    { label: 'Net Profit', value: `₱${(stats.revenue * 0.8).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`, icon: '📊', change: '+10%' } // Example: 80% of revenue
  ];

  const handleExportCSV = () => {
    // Updated CSV export to use real stats
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Orders', stats.totalOrders],
      ['Revenue', `₱${stats.revenue.toFixed(2)}`],
      ['Items Sold', stats.itemsSold],
      [''],
      ['Top Sellers'],
      ['Item', 'Quantity', 'Revenue'],
      ...topSellers.map(item => [item.name, item.sold, `₱${item.revenue}`])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canteen-express-vendor-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleExportPDF = () => {
    alert('PDF export functionality will generate a detailed report with charts and tables. This requires a PDF library like jsPDF or react-pdf.');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Show loading while checking authentication OR fetching stats
  if (authLoading || loadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C343A]"></div>
      </div>
    );
  }

  // Don't render if not vendor (useEffect will handle redirect)
  if (!user || user.role !== 'VENDOR') {
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
              {/* Display the real shop name here if available, or fallback to default */}
              {"Canteen Express : "+stats.shopName || 'Canteen Express - Vendor'}
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
              <Link to="/vendor/dashboard" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Dashboard & Sales
              </Link>
              <Link to="/vendor/orders" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Orders
              </Link>
              <Link to="/vendor/shop-management" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Shop Management
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-[#8C343A]">Dashboard</h2>
            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-lg font-semibold bg-white text-[#8C343A] border-2 border-[#8C343A] hover:bg-[#FFF9E6] transition-colors shadow-sm"
              >
                Export CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm"
                style={{ backgroundColor: '#8C343A' }}
              >
                Export Report
              </button>
            </div>
          </div>

        {/* Today's Summary */}
        <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mb-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-[#8C343A]">Today&apos;s Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-[#8C343A]">Total Orders</h3>
              {/* Display Real Total Orders */}
              <p className="text-5xl font-bold text-[#8C343A]">{stats.totalOrders}</p>
            </div>
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-[#8C343A]">Revenue</h3>
              {/* Display Real Revenue */}
              <p className="text-5xl font-bold text-[#8C343A]">₱{stats.revenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-[#8C343A]">Items Sold</h3>
              {/* Display Real Items Sold */}
              <p className="text-5xl font-bold text-[#8C343A]">{stats.itemsSold}</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Peak Order Times */}
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#8C343A]">Peak Order Times</h2>
            <div className="relative h-64">
              {/* Simple bar chart with real data */}
              <div className="flex items-end justify-around h-full pb-8">
                {peakTimes.length > 0 ? peakTimes.map((data, index) => {
                  const maxOrders = Math.max(...peakTimes.map(t => t.orders));
                  return (
                    <div key={index} className="flex flex-col items-center w-24">
                      <div className="text-sm font-semibold mb-2 text-[#8C343A]">{data.orders}</div>
                      <div
                        className="w-full rounded-t-lg transition-all hover:opacity-80 bg-[#8C343A]"
                        style={{
                          height: `${(data.orders / maxOrders) * 100}%`,
                          minHeight: '20px'
                        }}
                      />
                      <div className="text-xs font-semibold mt-2 text-[#8C343A]">{data.time}</div>
                    </div>
                  );
                }) : (
                  <div className="text-center text-gray-500">No order data available</div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t-2 border-[#8C343A]"></div>
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
                <span>60</span>
                <span>50</span>
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-semibold text-[#8C343A]">
                Orders
              </div>
            </div>
          </div>

          {/* Top 3 Best-Sellers */}
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#8C343A]">Top 3 Best-Sellers</h2>
            <div className="space-y-4">
              {topSellers.slice(0, 3).length > 0 ? topSellers.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#FFF9E6]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#8C343A]">{index + 1}.</span>
                    <span className="font-semibold text-[#8C343A]">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#8C343A]">({item.sold} sold)</span>
                </div>
              )) : (
                <div className="text-center text-gray-500 py-4">No sales data available</div>
              )}
            </div>
          </div>
        </div>

          {/* DIVIDER - Sales Analytics Section */}
          <div className="border-t-4 border-[#8C343A] my-8"></div>
          
          <h2 className="text-3xl font-bold mb-6 text-[#8C343A]">Sales Analytics & Performance</h2>

          {/* Sales Metrics Grid */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {salesMetrics.map((metric, index) => (
              <div key={index} className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 shadow-md text-center">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <h3 className="text-2xl font-bold mb-1 text-[#8C343A]">{metric.value}</h3>
                <p className="text-sm text-gray-600 font-semibold">{metric.label}</p>
                <p className="text-xs font-semibold mt-1" style={{ color: '#10B981' }}>{metric.change}</p>
              </div>
            ))}
          </div>

          {/* Filter Section */}
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 mb-6 shadow-md">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-[#8C343A]">Filter By:</span>
              <div className="flex gap-2">
                {['Today', 'This Week', 'This Month', 'All Time'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDateFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-sm ${
                      dateFilter === filter
                        ? 'text-white'
                        : 'bg-white text-[#8C343A] border-2 border-[#8C343A] hover:bg-[#FFF9E6]'
                    }`}
                    style={dateFilter === filter ? { backgroundColor: '#8C343A' } : {}}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Chart & Best Selling Items */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Sales Chart Placeholder */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#8C343A]">Sales Trend (Last 7 Days)</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[60, 75, 50, 85, 70, 40, 35].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: `${height}%` }}></div>
                    <span className="text-xs text-gray-600 mt-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Selling Items */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#8C343A]">Best Selling Items</h3>
              <div className="space-y-3">
                {topSellers.length > 0 ? topSellers.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#FFF9E6] rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#8C343A]">{index + 1}</span>
                      <span className="font-semibold text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#10B981' }}>
                        {item.sold} sold
                      </span>
                      <p className="text-sm font-bold text-[#8C343A] mt-1">₱{typeof item.revenue === 'number' ? item.revenue.toLocaleString('en-PH', { minimumFractionDigits: 2 }) : item.revenue}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-4">No sales data available</div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden shadow-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#8C343A]">Recent Transactions</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-y-2 border-[#8C343A]" style={{ backgroundColor: '#FBCA30' }}>
                  <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Order ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Date & Time</th>
                  <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Total</th>
                  <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Payment</th>
                  <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#8C343A]">{transaction.id}</td>
                    <td className="py-3 px-4 text-gray-700">
                      <div>{transaction.date}</div>
                      <div className="text-sm text-gray-500">{transaction.time}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#8C343A]">
                      ₱{typeof transaction.total === 'number' ? transaction.total.toLocaleString('en-PH', { minimumFractionDigits: 2 }) : transaction.total}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{transaction.payment}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === 'COMPLETED' || transaction.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        transaction.status === 'READY' ? 'bg-blue-100 text-blue-700' :
                        transaction.status === 'PREPARING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No transactions available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-200">
              <button className="text-[#8C343A] font-semibold hover:underline">View All Transactions →</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;