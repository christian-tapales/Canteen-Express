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
              <Link to="/vendor/orders" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Orders
              </Link>
              <Link to="/vendor/shop-management" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Shop Management
              </Link>
            </nav>
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
              <div key={order.id} className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
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
                  <button className="flex-1 px-4 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                    Start Preparing
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#8C343A' }}>
                    New Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorOrders;
