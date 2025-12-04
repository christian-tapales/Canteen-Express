import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const VendorStore = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [inventory] = useState([
    { id: 1, name: 'Lumpia', stock: 10 },
    { id: 2, name: 'Adobo', stock: 20 },
    { id: 3, name: 'Chicken', stock: 40 },
    { id: 4, name: 'Bola - bola', stock: 25 },
    { id: 5, name: 'Halang x 2', stock: 13 },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [publicAnnouncement, setPublicAnnouncement] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <Link to="/vendor/store" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Store
              </Link>
              <Link to="/vendor/menu" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
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
            <h2 className="text-3xl font-bold text-[#8C343A]">STORE</h2>
            <button className="px-6 py-2 rounded-lg font-semibold bg-white text-[#8C343A] border-2 border-[#8C343A] hover:bg-[#FFF9E6] transition-colors shadow-sm">
              Edit Store
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory Management */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#8C343A]">Inventory Management</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center font-bold text-[#8C343A] transition-colors">+</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center font-bold text-[#8C343A] transition-colors">✎</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center font-bold text-[#8C343A] transition-colors">🗑</button>
                  <button className="w-8 h-8 rounded bg-white border-2 border-[#8C343A] hover:bg-[#FFF9E6] flex items-center justify-center font-bold text-[#8C343A] transition-colors">↑</button>
                </div>
              </div>

              <button className="w-full px-6 py-3 rounded-full font-bold mb-6 transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                + Add New Stock
              </button>

              {/* Inventory Table */}
              <div className="bg-white border-2 border-[#8C343A] rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 px-4 py-3 bg-[#FBCA30] font-bold text-[#8C343A]">
                  <div>Item</div>
                  <div className="text-center">Stocks</div>
                </div>
                {inventory.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-2 px-4 py-3 border-t border-gray-300">
                    <div className="text-gray-700">{index + 1}. {item.name}</div>
                    <div className="text-center font-bold text-gray-700">{item.stock}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements and Store Hours */}
            <div className="space-y-6">
              {/* Announcements */}
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-[#8C343A]">Announcements</h3>
                <div className="space-y-4">
                  <textarea
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    placeholder="New Announcements"
                    className="w-full h-24 px-4 py-3 rounded-lg resize-none bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                  <textarea
                    value={publicAnnouncement}
                    onChange={(e) => setPublicAnnouncement(e.target.value)}
                    placeholder="Public Announcements"
                    className="w-full h-24 px-4 py-3 rounded-lg resize-none bg-white border-2 border-gray-300 focus:outline-none focus:border-[#8C343A]"
                  />
                </div>
              </div>

              {/* Store Hours & Status */}
              <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-[#8C343A]">Store Hours & Status</h3>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Today's Opening Time:</label>
                  <button className="w-full px-4 py-3 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                    Save Hour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorStore;
