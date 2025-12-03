import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!loading && (!user || user.role !== 'VENDOR')) {
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

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9E6]">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-xl font-semibold text-[#8C343A]">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not vendor (useEffect will handle redirect)
  if (!user || user.role !== 'VENDOR') {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[#FFF9E6]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F5DEB3] flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#8C343A]">Vendor Panel</h1>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            <li>
              <Link to="/vendor/dashboard" className="bg-[#8C343A] text-white block py-2 px-4 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/vendor/orders" className="block py-2 px-4 rounded hover:bg-[#8C343A] hover:text-white transition-colors">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/vendor/store" className="block py-2 px-4 rounded hover:bg-[#8C343A] hover:text-white transition-colors">
                Store
              </Link>
            </li>
            <li>
              <Link to="/vendor/menu" className="block py-2 px-4 rounded hover:bg-[#8C343A] hover:text-white transition-colors">
                Food Menu
              </Link>
            </li>
            <li>
              <Link to="/vendor/sales" className="block py-2 px-4 rounded hover:bg-[#8C343A] hover:text-white transition-colors">
                Sales Report
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#8C343A]">Dashboard</h2>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-lg font-semibold bg-[#FBCA30] text-[#8C343A] hover:bg-[#B78A00] hover:text-white transition-colors"
            >
              Import CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 rounded-lg font-semibold bg-[#8C343A] text-white hover:bg-[#6B2831] transition-colors"
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-white border-2 border-[#8C343A] rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-[#8C343A]">Today&apos;s Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border-2 border-[#8C343A] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-[#8C343A]">Total Orders</h3>
              <p className="text-5xl font-bold text-[#8C343A]">{todaySummary.totalOrders}</p>
            </div>
            <div className="bg-white border-2 border-[#8C343A] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-[#8C343A]">Revenue</h3>
              <p className="text-5xl font-bold text-[#B78A00]">₱{todaySummary.revenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white border-2 border-[#8C343A] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-[#8C343A]">Items Sold</h3>
              <p className="text-5xl font-bold text-[#8C343A]">{todaySummary.itemsSold}</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Peak Order Times */}
          <div className="bg-white border-2 border-[#8C343A] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-[#8C343A]">Peak Order Times</h2>
            <div className="relative h-64">
              {/* Simple bar chart */}
              <div className="flex items-end justify-around h-full pb-8">
                {peakOrderTimes.map((data, index) => (
                  <div key={index} className="flex flex-col items-center w-24">
                    <div className="text-sm font-semibold mb-2 text-[#8C343A]">{data.orders}</div>
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80 bg-[#8C343A]"
                      style={{
                        height: `${(data.orders / 60) * 100}%`,
                        minHeight: '20px'
                      }}
                    />
                    <div className="text-xs font-semibold mt-2 text-[#8C343A]">{data.time}</div>
                  </div>
                ))}
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
          <div className="bg-white border-2 border-[#8C343A] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-[#8C343A]">Top 3 Best-Sellers</h2>
            <div className="space-y-4">
              {topSellers.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#FFF9E6]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#8C343A]">{index + 1}.</span>
                    <span className="font-semibold text-[#8C343A]">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#8C343A]">({item.sold} sold)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
