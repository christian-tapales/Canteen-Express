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
    <div className="flex min-h-screen bg-[#FFF9E6]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F5DEB3] flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#8C343A]">Vendor Panel</h1>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            <li>
              <Link to="/vendor/dashboard" className="block py-2 px-4 rounded hover:bg-[#8C343A] hover:text-white transition-colors">
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
              <Link to="/vendor/menu" className="bg-[#8C343A] text-white block py-2 px-4 rounded">
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
          <button className="px-6 py-2 rounded-lg font-semibold bg-white border-2 border-[#8C343A] text-[#8C343A] hover:bg-[#8C343A] hover:text-white transition-colors">
            Import CSV
          </button>
          <button className="px-6 py-2 rounded-lg font-semibold bg-[#FBCA30] border-2 border-[#8C343A] text-[#8C343A] hover:bg-[#B78A00] hover:text-white transition-colors">
            + Add new category
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {/* Soup Category */}
          <div className="bg-[#F5DEB3] border-2 border-[#8C343A] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory('soup')}
              className="w-full px-6 py-4 flex justify-between items-center font-bold text-[#8C343A] hover:bg-[#E5D3A3] transition-colors"
            >
              <span className="text-xl">Soup</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">+</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">✎</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">🗑</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">
                  {expandedCategory === 'soup' ? '↑' : '↓'}
                </button>
              </div>
            </button>
          </div>

          {/* Main Dishes Category */}
          <div className="bg-[#F5DEB3] border-2 border-[#8C343A] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory('mainDishes')}
              className="w-full px-6 py-4 flex justify-between items-center font-bold text-[#8C343A] hover:bg-[#E5D3A3] transition-colors"
            >
              <span className="text-xl">Main Dishes</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">+</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">✎</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">🗑</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">
                  {expandedCategory === 'mainDishes' ? '↑' : '↓'}
                </button>
              </div>
            </button>
          </div>

          {/* Desserts Category */}
          <div className="bg-[#F5DEB3] border-2 border-[#8C343A] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory('desserts')}
              className="w-full px-6 py-4 flex justify-between items-center font-bold text-[#8C343A] hover:bg-[#E5D3A3] transition-colors"
            >
              <span className="text-xl">Desserts</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">+</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">✎</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">🗑</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center">
                  {expandedCategory === 'desserts' ? '↑' : '↓'}
                </button>
              </div>
            </button>

            {expandedCategory === 'desserts' && (
              <div className="p-6 bg-[#FFF9E6]">
                <div className="grid grid-cols-4 gap-6">
                  {menuItems.desserts.map((item) => (
                    <div key={item.id} className="bg-white border-2 border-[#8C343A] rounded-lg overflow-hidden">
                      <div className="aspect-square relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2 text-[#8C343A]">{item.name}</h3>
                        <p className="font-bold mb-3 text-[#B78A00]">₱{item.price.toFixed(2)}</p>
                        <button
                          className={`w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
                            item.available ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {item.available ? 'Available' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Item Card */}
                  <div className="bg-[#FFF9E6] border-2 border-[#8C343A] rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-[#F5DEB3] transition-colors min-h-[250px]">
                    <div className="w-16 h-16 rounded-full bg-[#FBCA30] flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-[#8C343A]">+</span>
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
  );
};

export default VendorMenu;
