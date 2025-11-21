import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Static data for demonstration
  const todaySummary = {
    totalOrders: 125,
    revenue: 8750.00,
    itemsSold: 450
  };

  const peakOrderTimes = [
    { time: '11:30 A.M.', orders: 20 },
    { time: '12:00 P.M.', orders: 60 }
  ];

  const topSellers = [
    { name: 'Lumpiang Shanghai', sold: 80 },
    { name: 'Chicken Curry', sold: 65 },
    { name: 'Lumpiang Shanghai', sold: 20 }
  ];

  const handleExportCSV = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Orders', todaySummary.totalOrders],
      ['Revenue', `₱${todaySummary.revenue.toFixed(2)}`],
      ['Items Sold', todaySummary.itemsSold],
      [''],
      ['Top Sellers'],
      ['Item', 'Quantity'],
      ...topSellers.map(item => [item.name, item.sold])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canteen-express-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleExportPDF = () => {
    alert('PDF export functionality will generate a detailed report with charts and tables. This requires a PDF library like jsPDF or react-pdf.');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAE7BF' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-xl font-semibold" style={{ color: '#5B050B' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not admin (useEffect will handle redirect)
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#2D2D2D' }}>
      {/* Sidebar */}
      <div className="w-64 shadow-lg" style={{ backgroundColor: '#FAE7BF' }}>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3" style={{ backgroundColor: '#DFAD13' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8C343A' }}>
            <span className="text-white font-bold text-xl">🍽️</span>
          </div>
          <div>
            <h1 className="font-bold text-lg" style={{ color: '#5B050B' }}>Canteen</h1>
            <h2 className="font-bold text-lg" style={{ color: '#5B050B' }}>Express</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'dashboard' ? 'bg-white shadow-md' : 'hover:bg-white/50'
            }`}
            style={{ color: '#8C343A' }}
          >
            <span>📊</span> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'orders' ? 'bg-white shadow-md' : 'hover:bg-white/50'
            }`}
            style={{ color: '#8C343A' }}
          >
            <span>📦</span> Orders
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'store' ? 'bg-white shadow-md' : 'hover:bg-white/50'
            }`}
            style={{ color: '#8C343A' }}
          >
            <span>🏪</span> Store
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'menu' ? 'bg-white shadow-md' : 'hover:bg-white/50'
            }`}
            style={{ color: '#8C343A' }}
          >
            <span>📋</span> Food Menu
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'sales' ? 'bg-white shadow-md' : 'hover:bg-white/50'
            }`}
            style={{ color: '#8C343A' }}
          >
            <span>📈</span> Sales Report
          </button>
        </nav>

        {/* Vendor Info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8C343A' }}>
            <span className="text-white font-bold">👤</span>
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: '#8C343A' }}>Vendor Seller</p>
            <p className="text-xs text-gray-600">admin@canteenexpress.com</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8" style={{ backgroundColor: '#FAE7BF' }}>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold" style={{ color: '#5B050B' }}>Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-lg font-semibold border-2 transition-all hover:bg-white"
              style={{ borderColor: '#8C343A', color: '#8C343A', backgroundColor: 'white' }}
            >
              Import CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#DFAD13' }}
            >
              Export Report
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#8C343A' }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#5B050B' }}>Today&apos;s Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="border-2 rounded-lg p-6 text-center" style={{ borderColor: '#8C343A' }}>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#5B050B' }}>Total Orders</h3>
              <p className="text-5xl font-bold" style={{ color: '#5B050B' }}>{todaySummary.totalOrders}</p>
            </div>
            <div className="border-2 rounded-lg p-6 text-center" style={{ borderColor: '#8C343A' }}>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#5B050B' }}>Revenue</h3>
              <p className="text-5xl font-bold" style={{ color: '#5B050B' }}>₱ {todaySummary.revenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="border-2 rounded-lg p-6 text-center" style={{ borderColor: '#8C343A' }}>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#5B050B' }}>Items Sold</h3>
              <p className="text-5xl font-bold" style={{ color: '#5B050B' }}>{todaySummary.itemsSold}</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Peak Order Times */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#5B050B' }}>Peak Order Times</h2>
            <div className="relative h-64">
              {/* Simple bar chart */}
              <div className="flex items-end justify-around h-full pb-8">
                {peakOrderTimes.map((data, index) => (
                  <div key={index} className="flex flex-col items-center w-24">
                    <div className="text-sm font-semibold mb-2" style={{ color: '#5B050B' }}>{data.orders}</div>
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80"
                      style={{
                        backgroundColor: '#8C343A',
                        height: `${(data.orders / 60) * 100}%`,
                        minHeight: '20px'
                      }}
                    />
                    <div className="text-xs font-semibold mt-2" style={{ color: '#5B050B' }}>{data.time}</div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t-2" style={{ borderColor: '#8C343A' }}></div>
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
                <span>60</span>
                <span>50</span>
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-semibold" style={{ color: '#5B050B' }}>
                Orders
              </div>
            </div>
          </div>

          {/* Top 3 Best-Sellers */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#5B050B' }}>Top 3 Best-Sellers</h2>
            <div className="space-y-4">
              {topSellers.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FAE7BF' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold" style={{ color: '#8C343A' }}>{index + 1}.</span>
                    <span className="font-semibold" style={{ color: '#5B050B' }}>{item.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: '#8C343A' }}>({item.sold} sold)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
