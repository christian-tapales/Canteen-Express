import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const VendorOrders = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orderFilter, setOrderFilter] = useState('all');

  // Sample orders data
  const orders = [
    { id: '001', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '002', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '003', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '004', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '005', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '006', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '007', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '008', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
    { id: '009', customer: 'Juan Dela Cruz', items: '2x Fried Chicken', amount: 180.00, status: 'preparing', category: 'new' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.category === orderFilter);

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
              <Link to="/vendor/orders" className="bg-[#8C343A] text-white block py-2 px-4 rounded">
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
          <h2 className="text-3xl font-bold text-[#8C343A]">Orders</h2>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setOrderFilter('new')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              orderFilter === 'new' ? 'bg-[#FBCA30] text-[#8C343A]' : 'bg-white text-gray-700 border-2 border-gray-300'
            }`}
          >
            New Orders
          </button>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white border-2 border-[#8C343A] rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-[#8C343A]">Order #{order.id}</h3>
              <p className="text-sm text-gray-600 mb-1">For: {order.customer}</p>
              <p className="text-sm text-gray-600 mb-2">{order.items}</p>
              <p className="text-lg font-bold text-[#B78A00] mb-4">₱{order.amount.toFixed(2)}</p>

              {/* Clock Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#FFF9E6] border-4 border-[#8C343A] flex items-center justify-center">
                  <span className="text-4xl">🕐</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg font-semibold bg-[#FBCA30] text-[#8C343A] hover:bg-[#B78A00] hover:text-white transition-colors">
                  Start Preparing
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg font-semibold bg-[#8C343A] text-white hover:bg-[#6B2831] transition-colors">
                  New Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VendorOrders;
