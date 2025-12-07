import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios'; // <--- Make sure this is imported

const ShopManagement = () => {
const navigate = useNavigate();
const { user, logout, loading } = useAuth();
const [activeTab, setActiveTab] = useState('store');

  // 1. Change State to boolean (initially null until loaded)
const [isOpen, setIsOpen] = useState(true); 
const [loadingShop, setLoadingShop] = useState(true);
const [shopName, setShopName] = useState('');
const [shopDescription, setShopDescription] = useState('');
const [shopImage, setShopImage] = useState('');
const [savingProfile, setSavingProfile] = useState(false);
const [paymentNumber, setPaymentNumber] = useState('');

// ✅ Inventory State
const [inventory, setInventory] = useState([]);
const [loadingInventory, setLoadingInventory] = useState(false);

// --- MENU MANAGEMENT STATE ---
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [showForm, setShowForm] = useState(false); // Toggle between List and Add/Edit Form
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All'); // <--- ADD THIS
  const [availableCategories, setAvailableCategories] = useState([]);

  // Form Inputs
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState('');



  // 1. Fetch Data
  useEffect(() => {
    const fetchAllData = async () => {
      if (!user || user.role !== 'VENDOR') return;
      
      const token = sessionStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      try {
        // Fetch Shop Details
        const shopRes = await axios.get('http://localhost:8080/api/vendor/shop', { headers });
        setIsOpen(shopRes.data.isOpen);
        setShopName(shopRes.data.name);
        setShopDescription(shopRes.data.description);
        setShopImage(shopRes.data.imageUrl || '');
        setPaymentNumber(shopRes.data.paymentNumber || '');

        // ✅ Fetch Inventory
        fetchInventory();

      } catch (error) {
        console.error("Error loading shop data", error);
      } finally {
        setLoadingShop(false);
      }
    };

    fetchAllData();
  }, [user]);

  // ✅ Helper to fetch Inventory
  const fetchInventory = async () => {
    setLoadingInventory(true);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/vendor/inventory', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setInventory(res.data);
    } catch (err) {
      console.error("Failed to load inventory", err);
    } finally {
      setLoadingInventory(false);
    }
  };

  // ✅ Helper to update stock
  const handleUpdateStock = async (foodItemId, currentQty) => {
    const newQty = prompt("Enter new stock quantity:", currentQty);
    if (newQty === null) return; // Cancelled
    
    const parsedQty = parseInt(newQty);
    if (isNaN(parsedQty) || parsedQty < 0) {
      alert("Please enter a valid number");
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      // Call the new specific update endpoint
      await axios.put(`http://localhost:8080/api/vendor/inventory/${foodItemId}`, null, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { quantity: parsedQty }
      });
      
      // Refresh list
      fetchInventory();
      alert("Stock updated!");
    } catch (err) {
      console.error("Failed to update stock", err);
      alert("Failed to update stock");
    }
  };


  // 1. Fetch Menu from Backend
  const fetchMenu = async () => {
    setLoadingMenu(true);
    try {
      const token = sessionStorage.getItem('token');
      // First get shop ID
      const shopResponse = await axios.get('http://localhost:8080/api/vendor/shop', {
         headers: { 'Authorization': `Bearer ${token}` }
      });
      const shopId = shopResponse.data.id;

      // Then get the menu
      const menuResponse = await axios.get(`http://localhost:8080/api/shops/${shopId}/menu`);
      setMenuItems(menuResponse.data);

      //Extract unique categories from the fetched items
      const uniqueCats = [...new Set(menuResponse.data.map(item => item.category).filter(Boolean))];
      setAvailableCategories(uniqueCats);

    } catch (error) {
      console.error("Failed to load menu", error);
    } finally {
      setLoadingMenu(false);
    }
  };

  // Trigger fetch when tab is 'menu'
  useEffect(() => {
    if (activeTab === 'menu') fetchMenu();
  }, [activeTab]);

  // 2. Handle Form Submit (Create or Update)
  const handleSaveItem = async (e) => {
    e.preventDefault();
    console.log('handleSaveItem called');
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        alert("No authentication token found. Please log in again.");
        return;
      }
      const payload = {
        itemName: itemName,
        description: itemDesc,
        price: parseFloat(itemPrice),
        category: itemCategory,
        imageUrl: itemImage,
        isAvailable: true
      };
      console.log('payload', payload);

      if (isEditing) {
        await axios.put(`http://localhost:8080/api/vendor/items/${editItemId}`, payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert("Item updated!");
      } else {
        await axios.post('http://localhost:8080/api/vendor/items', payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert("Item added!");
      }

      setShowForm(false);
      resetForm();
      fetchMenu();
      fetchInventory();
    } catch (error) {
      console.log('error', error);
      console.log('error.response', error.response);
      console.log('error.response.data', error.response?.data);
      const errorMessage = error.response?.data?.message ||
                          error.response?.data ||
                          error.message ||
                          'Unknown error';
      alert("Failed to save item: " + JSON.stringify(errorMessage));
    }
  };

  // 3. Handle Delete
  const handleDeleteItem = async (itemId) => {
    if (!confirm("Delete this item?")) return;
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/vendor/items/${itemId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMenu();
    } catch (error) {
      alert("Failed to delete.",error);
    }
  };

  // Helper to prep form for editing
  const startEdit = (item) => {
    setItemName(item.name || item.itemName);
    setItemDesc(item.description);
    setItemPrice(item.price);
    setItemCategory(item.category);
    setItemImage(item.imageUrl);
    setEditItemId(item.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setItemName(''); 
    setItemDesc(''); 
    setItemPrice('');
    setItemCategory(''); // 4️⃣ UPDATE: Clear category instead of hardcoding
    setItemImage('');
    setIsEditing(false); 
    setEditItemId(null);
  };

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
        setShopImage(response.data.imageUrl || '');
        setPaymentNumber(response.data.paymentNumber || '');
        
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


  const handleUpdateProfile = async () => {
    setSavingProfile(true);
    try {
      const token = sessionStorage.getItem('token');
      await axios.put('http://localhost:8080/api/vendor/shop', 
        {
          name: shopName,
          description: shopDescription,
          imageUrl: shopImage,
          paymentNumber: paymentNumber
        }, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      alert("Shop profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setSavingProfile(false);
    }
  };

  
      

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to determine status style
  const getStockStatus = (qty) => {
    if (qty === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
    if (qty < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
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

  // Filter logic
  const displayedItems = filterCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === filterCategory);

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
              Canteen Express : {shopName}
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
                  
                  {/* Image Preview Section */}
                  <div className="flex gap-4 items-start">
                    <div 
                      className="w-24 h-24 rounded-lg bg-gray-200 shrink-0 border-2 border-gray-300 overflow-hidden"
                      style={{
                        backgroundImage: `url(${shopImage || 'https://via.placeholder.com/150'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="grow">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Image URL</label>
                      <input
                        type="text"
                        placeholder="Paste an image link here (e.g., https://...)"
                        value={shopImage}
                        onChange={(e) => setShopImage(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A] text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Paste a link from Google Images, Unsplash, or Imgur.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name</label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      rows="3"
                      value={shopDescription}
                      onChange={(e) => setShopDescription(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                    />
                  </div>

                  {/* ✅ NEW: Payment Number Input */}
                  <div>
                    <label className="block text-sm font-bold text-[#8C343A] mb-2">
                      Digital Wallet Number (GCash/Maya)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 0917-123-4567"
                      value={paymentNumber}
                      onChange={(e) => setPaymentNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[#FFF9E6] border-2 border-gray-300 focus:outline-none focus:border-[#8C343A] font-mono text-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Customers will send payments to this number.
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleUpdateProfile}
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
                  {inventory.map((inv) => {
                // Safe check to handle if quantity is null (default to 0)
                const qty = inv.quantityAvailable ?? 0;
                const status = getStockStatus(qty);
                
                return (
                  <div key={inv.inventoryId} className="bg-white border-2 border-[#8C343A] rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-[#8C343A]">
                        {/* Use Optional Chaining (?.) to prevent crashes if foodItem isn't loaded yet */}
                        {inv.foodItem?.itemName || 'Loading...'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-2xl font-bold text-gray-700">{qty} units</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <button 
                      // Pass the correct Food Item ID and current Quantity to the handler
                      onClick={() => handleUpdateStock(inv.foodItem?.foodItemId, qty)}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
                </div>
              </div>
            </div>
          )}

          {/* Menu Management Tab */}
          {activeTab === 'menu' && (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#8C343A]">
                  {showForm ? (isEditing ? 'Edit Item' : 'Add New Item') : 'Your Menu'}
                </h2>

                {/* ✅ NEW: Category Filter Dropdown (Only show when list is visible) */}
                  {!showForm && (
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:border-[#8C343A]"
                    >
                      <option value="All">All Categories</option>
                      {/* 5️⃣ UPDATE: Use dynamic categories for the FILTER too */}
                      {availableCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  )}
                <button 
                  onClick={() => {
                    if(showForm) { setShowForm(false); resetForm(); }
                    else { setShowForm(true); resetForm(); }
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm text-white ${showForm ? 'bg-gray-500' : 'bg-[#10B981]'}`}
                >
                  {showForm ? 'Cancel' : '+ Add New Item'}
                </button>
              </div>

              {/* --- VIEW 1: THE FORM --- */}
              {showForm ? (
                <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md max-w-2xl mx-auto">
                  <form onSubmit={handleSaveItem} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700">Item Name</label>
                      <input required type="text" value={itemName} onChange={e => setItemName(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Burger" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700">Description</label>
                      <textarea value={itemDesc} onChange={e => setItemDesc(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-lg" placeholder="Ingredients, taste..." rows="2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700">Price (₱)</label>
                        <input required type="number" step="0.01" value={itemPrice} onChange={e => setItemPrice(e.target.value)} 
                          className="w-full px-4 py-2 border rounded-lg" placeholder="0.00" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700">Category</label>
                        <input 
                          type="text" 
                          list="category-options" 
                          value={itemCategory} 
                          onChange={e => setItemCategory(e.target.value)} 
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#8C343A]"
                          placeholder="Select or type..."
                          required
                        />
                        <datalist id="category-options">
                          {availableCategories.map((cat, index) => (
                            <option key={index} value={cat} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700">Image URL</label>
                      <input type="text" value={itemImage} onChange={e => setItemImage(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#8C343A] text-white font-bold rounded-lg hover:opacity-90">
                      {isEditing ? 'Update Item' : 'Create Item'}
                    </button>
                  </form>
                </div>
              ) : (
                /* --- VIEW 2: THE LIST --- */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loadingMenu ? <p>Loading menu...</p> : displayedItems.length === 0 ? <p>No items yet. Add one!</p> : 
                    displayedItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-300 rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-all">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-200 rounded-lg shrink-0 overflow-hidden"
                           style={{
                             backgroundImage: `url(${item.imageUrl || 'https://via.placeholder.com/150'})`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center'
                           }}
                      />
                      
                      {/* Info */}
                      <div className="grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-[#8C343A]">{item.name || item.itemName}</h3>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{item.category}</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                        <p className="font-bold text-[#B78A00] mt-1">₱{item.price?.toFixed(2)}</p>
                        
                        {/* Actions */}
                        <div className="flex gap-2 mt-3">
                          <button 
                            onClick={() => startEdit(item)}
                            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-semibold"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopManagement;
