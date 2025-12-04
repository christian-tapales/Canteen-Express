import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const AdminManagement = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('accounts');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('Any wing');

  // Check authentication
  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Sample user data
  const users = [
    { id: 1, name: 'Aarav Mehta', email: 'aarav.mehta@student.school.edu', role: 'Customer', status: 'Active', avatar: '👤' },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@vendor.canteen.com', role: 'Vendor', status: 'Active', avatar: '👤' },
    { id: 3, name: 'Rahul Verma', email: 'rahul.verma@student.school.edu', role: 'Customer', status: 'Inactive', avatar: '👤' },
    { id: 4, name: 'Neha Kapoor', email: 'neha.kapoor@admin.school.edu', role: 'Admin', status: 'Active', avatar: '👤' },
    { id: 5, name: 'Lakshmi Iyer', email: 'lakshmi.iyer@vendor.canteen.com', role: 'Vendor', status: 'Banned', avatar: '👤' },
  ];

  // Sample stalls data
  const stalls = [
    { id: 1, name: "Tita's BBQ", location: 'Food Courtyard • Grill Corner', owner: 'Maria Cruz', joined: 'Vendor • Joined 2022', status: 'Open', avatar: '🍖' },
    { id: 2, name: 'Cool Sips & Shakes', location: 'Science Wing • Drinks Bar', owner: 'Rahul Verma', joined: 'Vendor • Joined 2023', status: 'Open', avatar: '🥤' },
    { id: 3, name: 'Snack Hub', location: 'Library Level • Snack Lane', owner: 'Priya Sharma', joined: 'Vendor • Joined 2021', status: 'Force Closed', avatar: '🍿' },
    { id: 4, name: 'Green Plate Veggie Bar', location: 'Ground Floor • Health Corner', owner: 'Lakshmi Iyer', joined: 'Vendor • Joined 2020', status: 'Open', avatar: '🥗' },
    { id: 5, name: 'Campus Bakery Bites', location: 'Arts Block • Bakery Row', owner: 'Neha Kapoor', joined: 'Vendor • Joined 2019', status: 'Force Closed', avatar: '🍰' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <Link to="/admin/management" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
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
          {/* Tab Navigation */}
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'accounts' 
                  ? 'bg-[#8C343A] text-white shadow-md' 
                  : 'bg-white text-[#8C343A] border-2 border-[#8C343A] hover:bg-[#FFF9E6]'
              }`}
            >
              User Accounts
            </button>
            <button
              onClick={() => setActiveTab('stalls')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'stalls' 
                  ? 'bg-[#8C343A] text-white shadow-md' 
                  : 'bg-white text-[#8C343A] border-2 border-[#8C343A] hover:bg-[#FFF9E6]'
              }`}
            >
              Stalls Management
            </button>
          </div>

          {/* Accounts Management Tab */}
          {activeTab === 'accounts' && (
            <div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mb-6 shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-[#8C343A]">User Accounts Management</h2>
                <p className="text-gray-600 mb-6">Manage students, vendors, and admins for your school canteen.</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">120</h3>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-xs text-gray-500">Includes students, staff, vendors and admins</p>
                  </div>
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">5</h3>
                    <p className="text-sm text-gray-600">Active Vendors</p>
                    <p className="text-xs text-gray-500">Currently serving in the canteen</p>
                  </div>
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">2</h3>
                    <p className="text-sm text-gray-600">Banned</p>
                    <p className="text-xs text-gray-500">Restricted from ordering or selling</p>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                  <select 
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  >
                    <option>All</option>
                    <option>Customer</option>
                    <option>Vendor</option>
                    <option>Admin</option>
                  </select>
                  <button className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                    Add User
                  </button>
                </div>

                {/* Users Table */}
                <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#8C343A]" style={{ backgroundColor: '#FBCA30' }}>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">User Info</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Role</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Status</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#8C343A] flex items-center justify-center text-white text-xl">
                                {user.avatar}
                              </div>
                              <div>
                                <p className="font-semibold text-[#8C343A]">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === 'Customer' ? 'bg-blue-100 text-blue-700' :
                              user.role === 'Vendor' ? 'bg-green-100 text-green-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'Active' ? 'bg-green-100 text-green-700' :
                              user.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="px-4 py-1 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm text-sm" style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}>
                                Promote to Vendor
                              </button>
                              <button className="px-4 py-1 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm text-sm" style={{ backgroundColor: '#8C343A' }}>
                                Ban
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Showing 1-5 of 120 users</p>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded flex items-center justify-center bg-[#8C343A] text-white font-semibold">1</button>
                      <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">2</button>
                      <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">3</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stalls Management Tab */}
          {activeTab === 'stalls' && (
            <div>
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mb-6 shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-[#8C343A]">Canteen Stalls Management</h2>
                <p className="text-gray-600 mb-6">Configure physical stalls, assign vendor owners, and control availability.</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">8</h3>
                    <p className="text-sm text-gray-600">Total Stalls</p>
                    <p className="text-xs text-gray-500">Registered canteen shops</p>
                  </div>
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">6</h3>
                    <p className="text-sm text-gray-600">Open Right Now</p>
                    <p className="text-xs text-gray-500">Visible and serving students</p>
                  </div>
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">2</h3>
                    <p className="text-sm text-gray-600">Force Closed</p>
                    <p className="text-xs text-gray-500">Temporarily disabled by admin</p>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search stalls by name or owner..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  >
                    <option>All</option>
                    <option>Open</option>
                    <option>Force Closed</option>
                  </select>
                  <select 
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  >
                    <option>Any wing</option>
                    <option>Food Courtyard</option>
                    <option>Science Wing</option>
                    <option>Library Level</option>
                  </select>
                  <button className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                    Create New Stall
                  </button>
                </div>

                {/* Stalls Table */}
                <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#8C343A]" style={{ backgroundColor: '#FBCA30' }}>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Stall</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Owner</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Status</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stalls.map((stall) => (
                        <tr key={stall.id} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#8C343A] flex items-center justify-center text-white text-xl">
                                {stall.avatar}
                              </div>
                              <div>
                                <p className="font-semibold text-[#8C343A]">{stall.name}</p>
                                <p className="text-sm text-gray-500">{stall.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-gray-700">{stall.owner}</p>
                            <p className="text-sm text-gray-500">{stall.joined}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              stall.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {stall.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="px-4 py-1 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm text-sm" style={{ backgroundColor: '#8C343A' }}>
                                Edit Details
                              </button>
                              <button className="px-4 py-1 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm text-sm" style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}>
                                Manage Owner
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Showing 1-5 of 8 stalls</p>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded flex items-center justify-center bg-[#8C343A] text-white font-semibold">1</button>
                      <button className="w-8 h-8 rounded flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#FFF9E6]">2</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminManagement;
