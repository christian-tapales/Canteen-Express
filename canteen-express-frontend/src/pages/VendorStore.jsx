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
              <Link to="/vendor/store" className="bg-[#8C343A] text-white block py-2 px-4 rounded">
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
          <h2 className="text-3xl font-bold text-[#8C343A]">STORE</h2>
          <button className="px-6 py-2 rounded-lg font-semibold bg-[#FBCA30] text-[#8C343A] hover:bg-[#B78A00] hover:text-white transition-colors border-2 border-[#8C343A]">
            Edit Store
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Management */}
          <div className="bg-[#FFF9E6] border-2 border-[#8C343A] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#8C343A]">Inventory Management</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center font-bold text-[#8C343A] transition-colors">+</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center font-bold text-[#8C343A] transition-colors">✎</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center font-bold text-[#8C343A] transition-colors">🗑</button>
                <button className="w-8 h-8 rounded bg-[#FBCA30] hover:bg-[#B78A00] flex items-center justify-center font-bold text-[#8C343A] transition-colors">↑</button>
              </div>
            </div>

            <button className="w-full px-6 py-3 rounded-lg font-bold mb-6 bg-[#FBCA30] text-[#8C343A] hover:bg-[#B78A00] hover:text-white transition-colors border-2 border-[#8C343A]">
              + Add New Stock
            </button>

            {/* Inventory Table */}
            <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 px-4 py-3 bg-[#F5DEB3] font-bold text-[#8C343A]">
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
            <div className="bg-[#FFF9E6] border-2 border-[#8C343A] rounded-lg p-6">
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
            <div className="bg-[#FFF9E6] border-2 border-[#8C343A] rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-[#8C343A]">Store Hours & Status</h3>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Today's Opening Time:</label>
                <button className="w-full px-4 py-3 rounded-lg font-semibold bg-[#FBCA30] text-[#8C343A] hover:bg-[#B78A00] hover:text-white transition-colors">
                  Save Hour
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorStore;
