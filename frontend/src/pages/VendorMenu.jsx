import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const VendorMenu = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('desserts');

  const menuItems = {
    desserts: [
      { id: 1, name: 'Ice Cream', price: 20.00, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200', available: true },
      { id: 2, name: 'Graham Bars', price: 50.00, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=200', available: true },
      { id: 3, name: 'Cookies', price: 10.00, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200', available: false },
    ]
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

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
                Dashboard
              </Link>
              <Link to="/vendor/orders" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Orders
              </Link>
              <Link to="/vendor/store" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Store
              </Link>
              <Link to="/vendor/menu" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Food Menu
              </Link>
              <Link to="/vendor/sales" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Sales Report
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-[#8C343A]">Food Menu</h2>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <input
              type="text"
              placeholder="Search categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
            />
            <button className="px-6 py-2 rounded-lg font-semibold bg-white border-2 border-[#8C343A] text-[#8C343A] hover:bg-[#FFF9E6] transition-colors shadow-sm">
              Import CSV
            </button>
            <button className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
              + Add new category
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {/* Soup Category */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden shadow-md">
              <button
                onClick={() => toggleCategory('soup')}
                className="w-full px-6 py-4 flex justify-between items-center font-bold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors"
              >
                <span className="text-xl">Soup</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">+</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">✎</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">🗑</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">
                    {expandedCategory === 'soup' ? '↑' : '↓'}
                  </button>
                </div>
              </button>
            </div>

            {/* Main Dishes Category */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden shadow-md">
              <button
                onClick={() => toggleCategory('mainDishes')}
                className="w-full px-6 py-4 flex justify-between items-center font-bold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors"
              >
                <span className="text-xl">Main Dishes</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">+</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">✎</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">🗑</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">
                    {expandedCategory === 'mainDishes' ? '↑' : '↓'}
                  </button>
                </div>
              </button>
            </div>

            {/* Desserts Category */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden shadow-md">
              <button
                onClick={() => toggleCategory('desserts')}
                className="w-full px-6 py-4 flex justify-between items-center font-bold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors"
              >
                <span className="text-xl">Desserts</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">+</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">✎</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">🗑</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center text-[#8C343A]">
                    {expandedCategory === 'desserts' ? '↑' : '↓'}
                  </button>
                </div>
              </button>

              {expandedCategory === 'desserts' && (
                <div className="p-6 bg-[#F5F5F5]">
                  <div className="grid grid-cols-4 gap-6">
                    {menuItems.desserts.map((item) => (
                      <div key={item.id} className="bg-white border-2 border-[#8C343A] rounded-2xl overflow-hidden shadow-md">
                        <div className="aspect-square relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2 text-[#8C343A]">{item.name}</h3>
                          <p className="font-bold mb-3 text-[#8C343A]">₱{item.price.toFixed(2)}</p>
                          <button
                            className={`w-full px-4 py-2 rounded-full font-semibold text-white transition-all hover:opacity-90 shadow-sm ${
                              item.available ? '' : 'opacity-60'
                            }`}
                            style={{ backgroundColor: item.available ? '#10B981' : '#EF4444' }}
                          >
                            {item.available ? 'Available' : 'Unavailable'}
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Item Card */}
                    <div className="bg-white border-2 border-[#8C343A] rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-[#FFF9E6] transition-colors min-h-[250px]">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all hover:opacity-90" style={{ backgroundColor: '#10B981' }}>
                        <span className="text-4xl font-bold text-white">+</span>
                      </div>
                      <p className="font-bold text-[#8C343A]">Add Item</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorMenu;
