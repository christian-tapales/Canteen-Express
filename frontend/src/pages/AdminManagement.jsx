import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const API_BASE = 'http://localhost:8080/api';

const AdminManagement = () => {
  const navigate = useNavigate();
  const { user, logout, loading, token } = useAuth();
  const [activeTab, setActiveTab] = useState('accounts');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [stallSearchQuery, setStallSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Data states
  const [users, setUsers] = useState([]);
  const [stalls, setStalls] = useState([]);
  const [userStats, setUserStats] = useState({ totalUsers: 0, activeVendors: 0 });
  const [stallStats, setStallStats] = useState({ totalStalls: 0, openStalls: 0 });
  const [loadingData, setLoadingData] = useState(true);

  // Modal states
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedShopForPromotion, setSelectedShopForPromotion] = useState('');
  const [showEditStallModal, setShowEditStallModal] = useState(false);
  const [selectedStall, setSelectedStall] = useState(null);
  const [editStallName, setEditStallName] = useState('');
  const [showManageOwnerModal, setShowManageOwnerModal] = useState(false);
  const [selectedVendorForStall, setSelectedVendorForStall] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check authentication
  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Fetch data
  useEffect(() => {
    if (user && user.role === 'ADMIN' && token) {
      fetchData();
    }
  }, [user, token]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [usersRes, stallsRes, userStatsRes, stallStatsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/users`, { headers }),
        fetch(`${API_BASE}/admin/shops`, { headers }),
        fetch(`${API_BASE}/admin/users/stats`, { headers }),
        fetch(`${API_BASE}/admin/shops/stats`, { headers })
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }
      if (stallsRes.ok) {
        const stallsData = await stallsRes.json();
        setStalls(stallsData);
      }
      if (userStatsRes.ok) {
        const statsData = await userStatsRes.json();
        setUserStats(statsData);
      }
      if (stallStatsRes.ok) {
        const statsData = await stallStatsRes.json();
        setStallStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get available stalls (stalls without a vendor)
  const getAvailableStalls = () => {
    return stalls.filter(stall => {
      const vendor = stall.users?.find(u => u.role === 'VENDOR');
      return !vendor;
    });
  };

  // Get available users for vendor assignment (customers only, not admins)
  const getAvailableUsersForVendor = () => {
    return users.filter(u => u.role === 'CUSTOMER');
  };

  // Promote user to vendor
  const handlePromoteToVendor = async () => {
    if (!selectedUser || !selectedShopForPromotion) {
      setErrorMessage('Please select a shop to assign the vendor to');
      return;
    }

    setActionLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE}/admin/users/${selectedUser.userId}/promote`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shopId: parseInt(selectedShopForPromotion) })
      });

      if (response.ok) {
        setSuccessMessage(`${selectedUser.firstName} ${selectedUser.lastName} promoted to vendor successfully!`);
        setShowPromoteModal(false);
        setSelectedUser(null);
        setSelectedShopForPromotion('');
        fetchData();
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Failed to promote user');
      }
    } catch (error) {
      setErrorMessage('Error promoting user: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Demote vendor to customer
  const handleDemoteToCustomer = async (userToDemote) => {
    if (!window.confirm(`Are you sure you want to demote ${userToDemote.firstName} ${userToDemote.lastName} to customer? They will be unassigned from their stall.`)) {
      return;
    }

    setActionLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE}/admin/users/${userToDemote.userId}/demote`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSuccessMessage(`${userToDemote.firstName} ${userToDemote.lastName} demoted to customer successfully!`);
        fetchData();
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Failed to demote user');
      }
    } catch (error) {
      setErrorMessage('Error demoting user: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Edit stall details
  const handleEditStall = async () => {
    if (!selectedStall || !editStallName.trim()) {
      setErrorMessage('Stall name is required');
      return;
    }

    setActionLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE}/admin/shops/${selectedStall.shopId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          shopName: editStallName,
          description: selectedStall.description,
          isOpen: selectedStall.isOpen
        })
      });

      if (response.ok) {
        setSuccessMessage('Stall updated successfully!');
        setShowEditStallModal(false);
        setSelectedStall(null);
        setEditStallName('');
        fetchData();
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Failed to update stall');
      }
    } catch (error) {
      setErrorMessage('Error updating stall: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Assign vendor to stall
  const handleAssignVendor = async () => {
    if (!selectedStall) return;

    setActionLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE}/admin/shops/${selectedStall.shopId}/assign-vendor`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vendorId: selectedVendorForStall ? parseInt(selectedVendorForStall) : null })
      });

      if (response.ok) {
        setSuccessMessage('Vendor assignment updated successfully!');
        setShowManageOwnerModal(false);
        setSelectedStall(null);
        setSelectedVendorForStall('');
        fetchData();
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Failed to assign vendor');
      }
    } catch (error) {
      setErrorMessage('Error assigning vendor: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchesSearch = searchQuery === '' || 
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter.toUpperCase();
    return matchesSearch && matchesRole;
  });

  // Filter stalls
  const filteredStalls = stalls.filter(s => {
    const matchesSearch = stallSearchQuery === '' || 
      s.shopName.toLowerCase().includes(stallSearchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Open' && s.isOpen) || 
      (statusFilter === 'Closed' && !s.isOpen);
    return matchesSearch && matchesStatus;
  });

  // Get vendor for a stall
  const getStallVendor = (stall) => {
    return stall.users?.find(u => u.role === 'VENDOR');
  };

  // Clear messages after timeout
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}

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
                <p className="text-gray-600 mb-6">Manage students and vendors for your school canteen.</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">{userStats.totalUsers}</h3>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-xs text-gray-500">Includes students, staff, and vendors</p>
                  </div>
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">{userStats.activeVendors}</h3>
                    <p className="text-sm text-gray-600">Active Vendors</p>
                    <p className="text-xs text-gray-500">Currently serving in the canteen</p>
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
                  </select>
                </div>

                {/* Users Table */}
                <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#8C343A]" style={{ backgroundColor: '#FBCA30' }}>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">User Info</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Role</th>
                        <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingData ? (
                        <tr>
                          <td colSpan="3" className="py-8 text-center text-gray-500">Loading users...</td>
                        </tr>
                      ) : filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="py-8 text-center text-gray-500">No users found</td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u.userId} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#8C343A] flex items-center justify-center text-white text-xl">
                                  👤
                                </div>
                                <div>
                                  <p className="font-semibold text-[#8C343A]">{u.firstName} {u.lastName}</p>
                                  <p className="text-sm text-gray-500">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                u.role === 'CUSTOMER' ? 'bg-blue-100 text-blue-700' :
                                u.role === 'VENDOR' ? 'bg-green-100 text-green-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                {u.role === 'CUSTOMER' && (
                                  <button 
                                    onClick={() => {
                                      setSelectedUser(u);
                                      setShowPromoteModal(true);
                                    }}
                                    className="px-4 py-1 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm text-sm" 
                                    style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}
                                  >
                                    Promote to Vendor
                                  </button>
                                )}
                                {u.role === 'VENDOR' && (
                                  <button 
                                    onClick={() => handleDemoteToCustomer(u)}
                                    disabled={actionLoading}
                                    className="px-4 py-1 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm text-sm bg-orange-100 text-orange-700 border border-orange-300"
                                  >
                                    Demote to Customer
                                  </button>
                                )}
                                {u.role === 'ADMIN' && (
                                  <span className="px-4 py-1 rounded-lg text-sm text-gray-500 italic">
                                    Admin (Protected)
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Showing {filteredUsers.length} of {users.length} users</p>
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
                <p className="text-gray-600 mb-6">Configure physical stalls and assign vendor owners.</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">{stallStats.totalStalls}</h3>
                    <p className="text-sm text-gray-600">Total Stalls</p>
                    <p className="text-xs text-gray-500">Registered canteen shops</p>
                  </div>
                  <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 text-center">
                    <h3 className="text-4xl font-bold text-[#8C343A] mb-2">{stallStats.openStalls}</h3>
                    <p className="text-sm text-gray-600">Open Right Now</p>
                    <p className="text-xs text-gray-500">Visible and serving students</p>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search stalls by name..."
                    value={stallSearchQuery}
                    onChange={(e) => setStallSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  >
                    <option>All</option>
                    <option>Open</option>
                    <option>Closed</option>
                  </select>
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
                      {loadingData ? (
                        <tr>
                          <td colSpan="4" className="py-8 text-center text-gray-500">Loading stalls...</td>
                        </tr>
                      ) : filteredStalls.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-8 text-center text-gray-500">No stalls found</td>
                        </tr>
                      ) : (
                        filteredStalls.map((stall) => {
                          const vendor = getStallVendor(stall);
                          return (
                            <tr key={stall.shopId} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-[#8C343A] flex items-center justify-center text-white text-xl">
                                    🏪
                                  </div>
                                  <div>
                                    <p className="font-semibold text-[#8C343A]">{stall.shopName}</p>
                                    <p className="text-sm text-gray-500">{stall.description || 'No description'}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {vendor ? (
                                  <div>
                                    <p className="font-semibold text-gray-700">{vendor.firstName} {vendor.lastName}</p>
                                    <p className="text-sm text-gray-500">{vendor.email}</p>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 italic">No vendor assigned</span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  stall.isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {stall.isOpen ? 'Open' : 'Closed'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => {
                                      setSelectedStall(stall);
                                      setEditStallName(stall.shopName);
                                      setShowEditStallModal(true);
                                    }}
                                    className="px-4 py-1 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm text-sm" 
                                    style={{ backgroundColor: '#8C343A' }}
                                  >
                                    Edit Details
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setSelectedStall(stall);
                                      const currentVendor = getStallVendor(stall);
                                      setSelectedVendorForStall(currentVendor ? currentVendor.userId.toString() : '');
                                      setShowManageOwnerModal(true);
                                    }}
                                    className="px-4 py-1 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm text-sm" 
                                    style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}
                                  >
                                    Manage Owner
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Showing {filteredStalls.length} of {stalls.length} stalls</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Promote to Vendor Modal */}
      {showPromoteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold text-[#8C343A] mb-4">Promote to Vendor</h3>
            <p className="text-gray-600 mb-4">
              Promote <strong>{selectedUser.firstName} {selectedUser.lastName}</strong> to a vendor role.
              Please select a stall to assign them to.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Stall</label>
              <select
                value={selectedShopForPromotion}
                onChange={(e) => setSelectedShopForPromotion(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
              >
                <option value="">-- Select a stall --</option>
                {getAvailableStalls().map(stall => (
                  <option key={stall.shopId} value={stall.shopId}>
                    {stall.shopName}
                  </option>
                ))}
              </select>
              {getAvailableStalls().length === 0 && (
                <p className="text-sm text-orange-600 mt-2">
                  No stalls available. All stalls already have vendors assigned.
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowPromoteModal(false);
                  setSelectedUser(null);
                  setSelectedShopForPromotion('');
                  setErrorMessage('');
                }}
                className="px-4 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePromoteToVendor}
                disabled={actionLoading || !selectedShopForPromotion}
                className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#8C343A' }}
              >
                {actionLoading ? 'Promoting...' : 'Promote'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stall Modal */}
      {showEditStallModal && selectedStall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold text-[#8C343A] mb-4">Edit Stall Details</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stall Name</label>
              <input
                type="text"
                value={editStallName}
                onChange={(e) => setEditStallName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                placeholder="Enter stall name"
              />
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Stall Information</h4>
              <p className="text-sm text-gray-600"><strong>ID:</strong> {selectedStall.shopId}</p>
              <p className="text-sm text-gray-600"><strong>Description:</strong> {selectedStall.description || 'No description'}</p>
              <p className="text-sm text-gray-600"><strong>Status:</strong> {selectedStall.isOpen ? 'Open' : 'Closed'}</p>
              <p className="text-sm text-gray-600"><strong>Created:</strong> {selectedStall.createdAt ? new Date(selectedStall.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowEditStallModal(false);
                  setSelectedStall(null);
                  setEditStallName('');
                  setErrorMessage('');
                }}
                className="px-4 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEditStall}
                disabled={actionLoading || !editStallName.trim()}
                className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#8C343A' }}
              >
                {actionLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Owner Modal */}
      {showManageOwnerModal && selectedStall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold text-[#8C343A] mb-4">Manage Stall Owner</h3>
            <p className="text-gray-600 mb-4">
              Assign a vendor to <strong>{selectedStall.shopName}</strong>.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Vendor</label>
              <select
                value={selectedVendorForStall}
                onChange={(e) => setSelectedVendorForStall(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
              >
                <option value="">-- No vendor (unassign) --</option>
                {getAvailableUsersForVendor().map(u => (
                  <option key={u.userId} value={u.userId}>
                    {u.firstName} {u.lastName} ({u.email})
                  </option>
                ))}
                {/* Include current vendor if exists */}
                {getStallVendor(selectedStall) && (
                  <option value={getStallVendor(selectedStall).userId}>
                    {getStallVendor(selectedStall).firstName} {getStallVendor(selectedStall).lastName} (Current Vendor)
                  </option>
                )}
              </select>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowManageOwnerModal(false);
                  setSelectedStall(null);
                  setSelectedVendorForStall('');
                  setErrorMessage('');
                }}
                className="px-4 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignVendor}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#8C343A' }}
              >
                {actionLoading ? 'Saving...' : 'Save Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
