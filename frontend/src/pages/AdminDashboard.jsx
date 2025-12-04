import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [statistics, setStatistics] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Fetch statistics from backend
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/admin/statistics', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (user && user.role === 'ADMIN') {
      fetchStatistics();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading || loadingStats) {
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
              <Link to="/admin/dashboard" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Dashboard
              </Link>
              <Link to="/admin/management" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Management
              </Link>
              <Link to="/admin/ledger" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Master Ledger
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8 text-[#8C343A]">Admin Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md text-center">
              <h3 className="text-4xl font-bold mb-2 text-[#8C343A]">{statistics?.totalUsers || 0}</h3>
              <p className="text-gray-600 font-semibold">Total Users</p>
              <p className="text-sm text-gray-500 mt-1">Students, staff & vendors</p>
            </div>
            
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md text-center">
              <h3 className="text-4xl font-bold mb-2 text-[#8C343A]">{statistics?.totalShops || 0}</h3>
              <p className="text-gray-600 font-semibold">Total Shops</p>
              <p className="text-sm text-gray-500 mt-1">Registered shops</p>
            </div>
            
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md text-center">
              <h3 className="text-4xl font-bold mb-2 text-[#8C343A]">{statistics?.totalFoodItems || 0}</h3>
              <p className="text-gray-600 font-semibold">Food Items</p>
              <p className="text-sm text-gray-500 mt-1">Available menu items</p>
            </div>
            
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md text-center">
              <h3 className="text-4xl font-bold mb-2 text-[#8C343A]">{statistics?.totalOrders || 0}</h3>
              <p className="text-gray-600 font-semibold">Total Orders</p>
              <p className="text-sm text-gray-500 mt-1">All time orders</p>
            </div>
            
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md text-center">
              <h3 className="text-4xl font-bold mb-2 text-[#8C343A]">₱{statistics?.totalRevenue?.toLocaleString() || 0}</h3>
              <p className="text-gray-600 font-semibold">Total Revenue</p>
              <p className="text-sm text-gray-500 mt-1">All transactions</p>
            </div>
          </div>

          {/* Revenue & Orders Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#8C343A]">Revenue Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="text-2xl font-bold text-[#8C343A]">₱{statistics?.totalRevenue?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed Revenue</span>
                  <span className="text-2xl font-bold text-green-600">₱{statistics?.completedRevenue?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Revenue</span>
                  <span className="text-2xl font-bold text-orange-600">₱{statistics?.pendingRevenue?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#8C343A]">Order Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Orders</span>
                  <span className="text-2xl font-bold text-orange-600">{statistics?.pendingOrders || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Preparing Orders</span>
                  <span className="text-2xl font-bold text-blue-600">{statistics?.preparingOrders || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed Orders</span>
                  <span className="text-2xl font-bold text-green-600">{statistics?.completedOrders || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Charts */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#8C343A]">Sales Chart (Last 7 Days)</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: '60%' }}></div>
                  <span className="text-xs text-gray-600 mt-2">Mon</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: '75%' }}></div>
                  <span className="text-xs text-gray-600 mt-2">Tue</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: '50%' }}></div>
                  <span className="text-xs text-gray-600 mt-2">Wed</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: '85%' }}></div>
                  <span className="text-xs text-gray-600 mt-2">Thu</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: '70%' }}></div>
                  <span className="text-xs text-gray-600 mt-2">Fri</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: '40%' }}></div>
                  <span className="text-xs text-gray-600 mt-2">Sat</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg" style={{ backgroundColor: '#10B981', height: '35%' }}></div>
                  <span className="text-xs text-gray-600 mt-2">Sun</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#8C343A]">Top Performing Stalls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#FFF9E6] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍖</span>
                    <span className="font-semibold text-gray-700">Tita's BBQ</span>
                  </div>
                  <span className="font-bold text-[#8C343A]">₱3,240</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FFF9E6] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥗</span>
                    <span className="font-semibold text-gray-700">Green Plate Veggie Bar</span>
                  </div>
                  <span className="font-bold text-[#8C343A]">₱2,890</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FFF9E6] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥤</span>
                    <span className="font-semibold text-gray-700">Cool Sips & Shakes</span>
                  </div>
                  <span className="font-bold text-[#8C343A]">₱2,650</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FFF9E6] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍰</span>
                    <span className="font-semibold text-gray-700">Campus Bakery Bites</span>
                  </div>
                  <span className="font-bold text-[#8C343A]">₱2,120</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold mb-4 text-[#8C343A]">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4">
              <Link to="/admin/management">
                <button className="w-full px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                  Manage Users
                </button>
              </Link>
              <Link to="/admin/management">
                <button className="w-full px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                  Manage Stalls
                </button>
              </Link>
              <Link to="/admin/ledger">
                <button className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#8C343A' }}>
                  View Transactions
                </button>
              </Link>
              <button className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}>
                Generate Report
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
