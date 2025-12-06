import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios'; // <--- Make sure this is imported

const ShopManagement = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('store');
  const [expandedCategory, setExpandedCategory] = useState(null);

  // 1. Change State to boolean (initially null until loaded)
const [isOpen, setIsOpen] = useState(true); 
const [loadingShop, setLoadingShop] = useState(true);
const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // --- NEW: FETCH REAL STATUS ON LOAD ---
  // Update your existing useEffect
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/vendor/shop', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Set the state with data from backend
        setIsOpen(response.data.isOpen);
        setShopName(response.data.name);               // <--- ADD THIS
        setShopDescription(response.data.description); // <--- ADD THIS
        
      } catch (error) {
        console.error("Failed to load shop details", error);
      } finally {
        setLoadingShop(false);
      }
    };
    
    if (user?.role === 'VENDOR') {
      fetchShopDetails();
    }
  }, [user]);

  // --- NEW: TOGGLE FUNCTION CONNECTED TO API ---
  const toggleStoreStatus = async () => {
    try {
      const token = sessionStorage.getItem('token');
      // Call the endpoint we just created
      const response = await axios.put('http://localhost:8080/api/vendor/shop/status', {}, {
           headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setIsOpen(response.data.isOpen); // Update UI with real status
      alert(`Store is now ${response.data.isOpen ? 'OPEN' : 'CLOSED'}`);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    }
  };

  // Store data
  const [announcement, setAnnouncement] = useState('Welcome to our shop!');
  const inventory = [
    { id: 1, item: 'Lumpiang Shanghai', stock: 50, status: 'In Stock' },
    { id: 2, item: 'Chicken Curry', stock: 30, status: 'In Stock' },
    { id: 3, item: 'Bottled Water', stock: 5, status: 'Low Stock' },
    { id: 4, item: 'Graham Bars', stock: 0, status: 'Out of Stock' }
  ];

  // Menu data
  const categories = [
    {
      id: 1,
      name: 'Main Dishes',
      items: [
        { id: 1, name: 'Lumpiang Shanghai (10 pcs)', price: '₱60.00', category: 'Main Dishes', available: true, image: '🥟' },
        { id: 2, name: 'Chicken Curry', price: '₱90.00', category: 'Main Dishes', available: true, image: '🍛' },
        { id: 3, name: 'Beef Caldereta', price: '₱100.00', category: 'Main Dishes', available: true, image: '🍲' }
      ]
    },
    {
      id: 2,
      name: 'Drinks',
      items: [
        { id: 4, name: 'Bottled Water', price: '₱10.00', category: 'Drinks', available: true, image: '💧' },
        { id: 5, name: 'Coke 330ml', price: '₱25.00', category: 'Drinks', available: false, image: '🥤' },
        { id: 6, name: 'Fresh Lemonade', price: '₱35.00', category: 'Drinks', available: true, image: '🍋' }
      ]
    },
    {
      id: 3,
      name: 'Snacks & Desserts',
      items: [
        { id: 7, name: 'Graham Bars', price: '₱30.00', category: 'Snacks & Desserts', available: true, image: '🍪' },
        { id: 8, name: 'Banana Cake Slice', price: '₱45.00', category: 'Snacks & Desserts', available: true, image: '🍰' }
      ]
    }
  ];

  const handleUpdateProfile = async () => {
    setSavingProfile(true);
    try {
      const token = sessionStorage.getItem('token');
      await axios.put('http://localhost:8080/api/vendor/shop', 
        {
          name: shopName,
          description: shopDescription
        }, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      alert("Shop profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Shop name might already be taken.");
    } finally {
      setSavingProfile(false);
    }
  };

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
              Canteen Express - Vendor
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
              <Link to="/vendor/dashboard" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Dashboard & Sales
              </Link>
              <Link to="/vendor/orders" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Orders
              </Link>
              <Link to="/vendor/shop-management" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Shop Management
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-[#8C343A]">Shop Management</h1>

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setActiveTab('store')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
                activeTab === 'store' 
                  ? 'bg-[#8C343A] text-white' 
                  : 'bg-white text-[#8C343A] border-2 border-[#8C343A] hover:bg-[#FFF9E6]'
              }`}
            >
              Store Settings
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
                activeTab === 'menu' 
                  ? 'bg-[#8C343A] text-white' 
                  : 'bg-white text-[#8C343A] border-2 border-[#8C343A] hover:bg-[#FFF9E6]'
              }`}
            >
              Menu Management
            </button>
          </div>

          {/* Store Settings Tab */}
          {activeTab === 'store' && (
            <div>
              {/* Store Status Card */}
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mb-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-[#8C343A]">Store Status</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg mb-2">
                      Your store is currently: 
                      <span className={`ml-2 font-bold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                        {isOpen ? 'OPEN' : 'CLOSED'}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      {isOpen 
                        ? "Customers can currently place orders." 
                        : "Your shop is hidden from the main list or marked as closed."}
                    </p>
                  </div>
                  <button
                    onClick={toggleStoreStatus}
                    disabled={loadingShop}
                    className={`px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90 shadow-md text-white ${
                      isOpen ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    {isOpen ? 'Close Store' : 'Open Store'}
                  </button>
                </div>
              </div>

              {/* Shop Profile Card */}
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mb-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-[#8C343A]">Shop Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name</label>
                    <input
                      type="text"
                      value={shopName} // <--- Connected to State
                      onChange={(e) => setShopName(e.target.value)} // <--- Updates State
                      className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      rows="3"
                      value={shopDescription} // <--- Connected to State
                      onChange={(e) => setShopDescription(e.target.value)} // <--- Updates State
                      className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                    />
                  </div>
                  <button 
                    onClick={handleUpdateProfile} // <--- Connected to Function
                    disabled={savingProfile}
                    className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm disabled:opacity-50" 
                    style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                  >
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>

              
              {/* Inventory Overview Card */}
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#8C343A]">Inventory Overview</h2>
                  <button className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                    Add New Stock
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {inventory.map((item) => (
                    <div key={item.id} className="bg-white border-2 border-[#8C343A] rounded-2xl p-4">
                      <h3 className="font-bold text-lg text-[#8C343A] mb-2">{item.item}</h3>
                      <p className="text-2xl font-bold text-gray-700 mb-1">{item.stock} units</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store Hours Card */}
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mt-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-[#8C343A]">Store Hours</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Opening Time</label>
                    <input
                      type="time"
                      defaultValue="07:00"
                      className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Closing Time</label>
                    <input
                      type="time"
                      defaultValue="18:00"
                      className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                  Update Hours
                </button>
              </div>
            </div>
          )}

          {/* Menu Management Tab */}
          {activeTab === 'menu' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">Manage your food menu items, pricing, and availability</p>
                <button className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                  Add New Item
                </button>
              </div>

              {/* Menu Categories */}
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden shadow-md">
                    {/* Category Header */}
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-[#FFF9E6] transition-colors"
                      style={{ backgroundColor: expandedCategory === category.id ? '#FFF9E6' : 'white' }}
                    >
                      <h3 className="text-xl font-bold text-[#8C343A]">{category.name}</h3>
                      <span className="text-2xl text-[#8C343A]">
                        {expandedCategory === category.id ? '▼' : '▶'}
                      </span>
                    </button>

                    {/* Category Items */}
                    {expandedCategory === category.id && (
                      <div className="p-4 border-t-2 border-[#8C343A]">
                        <div className="grid grid-cols-2 gap-4">
                          {category.items.map((item) => (
                            <div key={item.id} className="bg-white border-2 border-[#8C343A] rounded-2xl p-4">
                              <div className="flex items-start gap-4">
                                <div className="text-5xl">{item.image}</div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg text-[#8C343A] mb-1">{item.name}</h4>
                                  <p className="text-xl font-bold text-gray-700 mb-2">{item.price}</p>
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm font-semibold text-gray-600">Available:</span>
                                    <button
                                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                                        item.available 
                                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                                      }`}
                                    >
                                      {item.available ? 'Yes' : 'No'}
                                    </button>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-1 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm text-sm" style={{ backgroundColor: '#8C343A' }}>
                                      Edit
                                    </button>
                                    <button className="flex-1 px-3 py-1 rounded-lg font-semibold bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 transition-all shadow-sm text-sm">
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Add Item Card */}
                          <div className="bg-white border-2 border-dashed border-[#8C343A] rounded-2xl p-4 flex items-center justify-center hover:bg-[#FFF9E6] transition-colors cursor-pointer">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                                <span className="text-3xl text-white">+</span>
                              </div>
                              <p className="font-semibold text-[#8C343A]">Add Item</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopManagement;
