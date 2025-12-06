import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const OrderHistoryPage = () => {
  // 1. Get 'loading' from AuthContext (rename to authLoading to avoid conflict)
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  
  // Rename local loading state to avoid confusion
  const [dataLoading, setDataLoading] = useState(true); 
  const [error, setError] = useState('');

  useEffect(() => {
    // 2. CRITICAL FIX: If Auth is still loading, STOP here. Do not redirect yet.
    if (authLoading) return;

    // 3. Now that loading is done, if user is STILL missing, then redirect.
    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/user', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load order history');
      } finally {
        setDataLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading, navigate]); // 4. Add authLoading to dependencies
  

  // 5. Show loading screen if Auth is initializing OR if data is fetching
  if (authLoading || dataLoading) return (
    <div className="container mx-auto px-4 py-12 text-center text-lg" style={{ color: '#8C343A' }}>
      Loading your orders...
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-12 text-center text-lg" style={{ color: '#DC2626' }}>
      {error}
    </div>
  );

  // Handle Delete (Cancel)
  const handleCancelOrder = async (orderId, status) => {
    if (status !== 'PENDING') {
      alert("You cannot cancel an order that is already being prepared!");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
      
      // Update UI immediately without refreshing
      setOrders(orders.filter(order => order.orderId !== orderId));
      alert("Order cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order.");
    }
  };

  // Handle Update (Example: Editing the Note)
  const handleUpdateNote = async (orderId, currentNote) => {
    const newNote = prompt("Update your special instructions:", currentNote);
    if (newNote === null) return; // User pressed cancel

    try {
      // Send the update to backend
      await axios.put(`http://localhost:8080/api/orders/${orderId}`, {
        specialInstructions: newNote
      });

      // Update UI immediately
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, specialInstructions: newNote } : order
      ));
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate('/shops')}
          className="text-2xl font-bold"
          style={{ color: '#8C343A' }}
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold" style={{ color: '#8C343A' }}>
          Order History
        </h1>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#8C343A' }}>
            No orders yet
          </h2>
          <p className="text-lg mb-6" style={{ color: '#666666' }}>
            Start ordering from your favorite shops!
          </p>
          <button
            onClick={() => navigate('/shops')}
            className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 shadow-md"
            style={{ backgroundColor: '#8C343A' }}
          >
            Browse Shops
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            
            <div
              key={order.orderId}
              className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #8C343A'
              }}
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: '#8C343A' }}>
                    Order #{order.orderId}
                  </h2>
                  <p className="text-sm" style={{ color: '#666666' }}>
                    {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'Date not available'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: '#B78A00' }}>
                    ₱{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}
                  </p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: order.status === 'COMPLETED' ? '#10B981' : order.status === 'PENDING' ? '#FBCA30' : '#DC2626',
                      color: '#FFFFFF'
                    }}
                  >
                    {order.status || 'Unknown'}
                  </span>
                </div>
            
              </div>
                {/* ACTION BUTTONS - Only show if PENDING */}
                  {order.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdateNote(order.orderId, order.specialInstructions)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit Note
                      </button>
                      
                      <button 
                        onClick={() => handleCancelOrder(order.orderId, order.status)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}
              {/* Order Items */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold" style={{ color: '#8C343A' }}>
                  Items:
                </h3>
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-3 rounded-lg"
                      style={{ backgroundColor: '#FFF9E6' }}
                    >
                      <span className="font-medium" style={{ color: '#2D2D2D' }}>
                        {item.foodItem ? item.foodItem.itemName : 'Unknown Item'}
                      </span>
                      <span className="text-sm" style={{ color: '#666666' }}>
                        Qty: {item.quantity} × ₱{item.priceAtOrder ? item.priceAtOrder.toFixed(2) : '0.00'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm" style={{ color: '#666666' }}>
                    No items details available
                  </p>
                )}
              </div>

              {/* Order Details */}
              {order.pickupTime && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <p className="text-sm" style={{ color: '#666666' }}>
                    <strong>Pickup Time:</strong> {order.pickupTime}
                  </p>
                  {order.specialInstructions && (
                    <p className="text-sm mt-1" style={{ color: '#666666' }}>
                      <strong>Instructions:</strong> {order.specialInstructions}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;