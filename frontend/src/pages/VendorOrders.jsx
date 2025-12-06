import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios';

const VendorOrders = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orderFilter, setOrderFilter] = useState('PENDING');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'VENDOR')) {
      navigate('/login', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        console.log('Token from sessionStorage:', token ? 'exists' : 'missing');
        const response = await axios.get('http://localhost:8080/api/vendor/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user && user.role === 'VENDOR') {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/vendor/orders/${orderId}/accept`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Refresh orders
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status: 'PREPARING' } : order
      ));
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order');
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/vendor/orders/${orderId}/reject`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Refresh orders
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status: 'REJECTED' } : order
      ));
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order');
    }
  };

  const handleMarkReady = async (orderId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/vendor/orders/${orderId}/ready`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Refresh orders
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status: 'READY' } : order
      ));
    } catch (error) {
      console.error('Error marking order ready:', error);
      alert('Failed to mark order as ready');
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/vendor/orders/${orderId}/complete`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Refresh orders
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status: 'COMPLETED' } : order
      ));
    } catch (error) {
      console.error('Error completing order:', error);
      alert('Failed to complete order');
    }
  };

  const filteredOrders = orderFilter === 'ALL' ? orders : orders.filter(o => o.status === orderFilter);

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
        <div className="mb-6 flex gap-3 flex-wrap">
          <button
            onClick={() => setOrderFilter('ALL')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              orderFilter === 'ALL' ? 'bg-[#FBCA30] text-[#8C343A]' : 'bg-white text-gray-700 border-2 border-gray-300'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setOrderFilter('PENDING')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              orderFilter === 'PENDING' ? 'bg-[#FBCA30] text-[#8C343A]' : 'bg-white text-gray-700 border-2 border-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setOrderFilter('PREPARING')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              orderFilter === 'PREPARING' ? 'bg-[#FBCA30] text-[#8C343A]' : 'bg-white text-gray-700 border-2 border-gray-300'
            }`}
          >
            Preparing
          </button>
          <button
            onClick={() => setOrderFilter('READY')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              orderFilter === 'READY' ? 'bg-[#FBCA30] text-[#8C343A]' : 'bg-white text-gray-700 border-2 border-gray-300'
            }`}
          >
            Ready
          </button>
          <button
            onClick={() => setOrderFilter('COMPLETED')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              orderFilter === 'COMPLETED' ? 'bg-[#FBCA30] text-[#8C343A]' : 'bg-white text-gray-700 border-2 border-gray-300'
            }`}
          >
            Completed
          </button>
        </div>

          {/* Orders Grid */}
          {loadingOrders ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">No orders found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <div key={order.orderId} className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold mb-2 text-[#8C343A]">Order #{order.orderId}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Customer: {order.user?.firstName} {order.user?.lastName}
                  </p>
                  <div className="text-sm text-gray-600 mb-2">
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx}>
                        {item.quantity}x {item.foodItem?.itemName} (₱{item.priceAtOrder})
                      </div>
                    ))}
                  </div>
                  <p className="text-lg font-bold text-[#B78A00] mb-2">Total: ₱{order.totalAmount?.toFixed(2)}</p>
                  {order.specialInstructions && (
                    <div 
                      className="mt-3 p-3 rounded-lg text-sm"
                      style={{ backgroundColor: '#FFF9E6', border: '1px border #FBCA30', color: '#8C343A' }}
                    >
                      <span className="font-bold">📝 Note: </span> 
                      {order.specialInstructions}
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mb-4">
                    Status: <span className={`font-semibold ${
                      order.status === 'PENDING' ? 'text-orange-600' :
                      order.status === 'PREPARING' ? 'text-blue-600' :
                      order.status === 'READY' ? 'text-green-600' :
                      order.status === 'COMPLETED' ? 'text-gray-600' :
                      'text-red-600'
                    }`}>{order.status}</span>
                  </p>

                  {/* Status Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-[#FFF9E6] border-4 border-[#8C343A] flex items-center justify-center">
                      <span className="text-4xl">
                        {order.status === 'PENDING' ? '🔔' :
                         order.status === 'PREPARING' ? '�‍🍳' :
                         order.status === 'READY' ? '✅' :
                         order.status === 'COMPLETED' ? '🎉' : '❌'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {order.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => handleAcceptOrder(order.orderId)}
                          className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm" 
                          style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                        >
                          Accept Order
                        </button>
                        <button 
                          onClick={() => handleRejectOrder(order.orderId)}
                          className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm" 
                          style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}
                        >
                          Reject Order
                        </button>
                      </>
                    )}
                    {order.status === 'PREPARING' && (
                      <button 
                        onClick={() => handleMarkReady(order.orderId)}
                        className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm" 
                        style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                      >
                        Mark as Ready
                      </button>
                    )}
                    {order.status === 'READY' && (
                      <button 
                        onClick={() => handleCompleteOrder(order.orderId)}
                        className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm" 
                        style={{ backgroundColor: '#8C343A', color: '#FFFFFF' }}
                      >
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VendorOrders;
