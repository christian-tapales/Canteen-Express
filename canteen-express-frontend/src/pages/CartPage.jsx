import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Checkout form state
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleCheckout = () => {
    if (!pickupTime) {
      alert('Please select an estimated pickup time');
      return;
    }
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // TODO: Implement actual checkout/payment integration
    alert(
      `Order Confirmed!\n\n` +
      `Total: ₱${getCartTotal().toFixed(2)}\n` +
      `Pickup Time: ${pickupTime}\n` +
      `Payment Method: ${paymentMethod}\n` +
      `Special Instructions: ${specialInstructions || 'None'}\n\n` +
      `Your order will be ready at the specified time!`
    );
    clearCart();
    setPickupTime('');
    setPaymentMethod('');
    setSpecialInstructions('');
    navigate('/shops');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#8C343A' }}>
            Your Cart is Empty
          </h1>
          <p className="text-base mb-8" style={{ color: '#666666' }}>
            Add some delicious items from our shops to get started!
          </p>
          <button
            onClick={() => navigate('/shops')}
            className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 shadow-md"
            style={{ backgroundColor: '#8C343A' }}
          >
            Browse Shops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#FFF9E6', minHeight: 'calc(100vh - 80px)' }}>
      {/* Header Section with Back Button and Cart Title */}
      <div className="mb-6">
        {/* Back Button - Clearly Separated */}
        <button 
          onClick={() => navigate('/shops')}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg mb-4"
          style={{ 
            color: '#FFFFFF',
            backgroundColor: '#8C343A',
            border: '2px solid #8C343A',
            boxShadow: '0 2px 4px rgba(140, 52, 58, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#6B2A2F';
            e.target.style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#8C343A';
            e.target.style.transform = 'translateX(0)';
          }}
        >
          <span className="text-lg font-bold">←</span>
          <span>Back to Shops</span>
        </button>

        {/* Ribbon Header for "My Cart" - Distinct and Prominent */}
        <div 
          className="rounded-2xl px-10 py-5 shadow-lg"
          style={{ 
            backgroundColor: '#8C343A',
            color: '#FFFFFF',
            border: '3px solid #FBCA30',
            background: 'linear-gradient(135deg, #8C343A 0%, #6B2A2F 100%)'
          }}
        >
          <h1 className="text-4xl font-bold flex items-center gap-4">
            <span className="text-5xl">🛒</span>
            <span>My Cart</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div 
            className="rounded-2xl p-6 shadow-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '2px solid #8C343A'
            }}
          >
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: '#8C343A' }}>
              🛍️ Products
            </h2>
            
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 pb-6"
                  style={{ 
                    borderBottom: '2px solid #F3F4F6'
                  }}
                >
                  {/* Image */}
                  {item.imageUrl && (
                    <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: '#F3F4F6' }}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-grow">
                    <h3 className="text-base font-bold mb-1" style={{ color: '#8C343A' }}>
                      {item.name}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: '#666666' }}>
                      {item.category || 'No add-ons'}
                    </p>
                    <p className="text-base font-bold" style={{ color: '#B78A00' }}>
                      ₱{item.price.toFixed(0)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full font-bold transition-all duration-200 hover:opacity-90 shadow-sm"
                      style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}
                    >
                      −
                    </button>
                    <span className="text-base font-semibold w-8 text-center" style={{ color: '#2D2D2D' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full font-bold transition-all duration-200 hover:opacity-90 shadow-sm"
                      style={{ backgroundColor: '#FBCA30', color: '#8C343A' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xl transition-opacity hover:opacity-70"
                    style={{ color: '#8C343A' }}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Estimated Time Box */}
          <div
            className="rounded-2xl p-6 shadow-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '2px solid #8C343A'
            }}
          >
            <h3 className="text-base font-bold mb-4" style={{ color: '#8C343A' }}>
              Estimated Time
            </h3>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl focus:outline-none text-center font-semibold"
              style={{ 
                backgroundColor: '#FFF9E6',
                border: '2px solid #E5E7EB',
                color: '#8C343A'
              }}
              required
            />
          </div>

          {/* Payment Method Box */}
          <div
            className="rounded-2xl p-6 shadow-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '2px solid #8C343A'
            }}
          >
            <h3 className="text-base font-bold mb-4" style={{ color: '#8C343A' }}>
              Method of Payment
            </h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 rounded-xl focus:outline-none font-semibold"
              style={{ 
                backgroundColor: '#FFF9E6',
                border: '2px solid #E5E7EB',
                color: '#8C343A'
              }}
              required
            >
              <option value="">Selected Method of Payment</option>
              <option value="Cash">Cash</option>
              <option value="GCash">GCash</option>
              <option value="Maya">Maya</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
            <button 
              className="w-full mt-3 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
              style={{ 
                backgroundColor: '#FFF9E6',
                border: '2px solid #E5E7EB',
                color: '#666666'
              }}
            >
              Add New Payment Method
            </button>
          </div>

          {/* Special Instructions Box */}
          <div
            className="rounded-2xl p-6 shadow-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '2px solid #8C343A'
            }}
          >
            <h3 className="text-base font-bold mb-4" style={{ color: '#8C343A' }}>
              Special Instructions
            </h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Enter special instructions..."
              className="w-full px-4 py-3 rounded-xl focus:outline-none resize-none"
              style={{ 
                backgroundColor: '#FFF9E6',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              rows="4"
            />
          </div>

          {/* Receipt Breakdown Box */}
          <div
            className="rounded-2xl p-6 shadow-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '2px solid #8C343A'
            }}
          >
            <h3 className="text-lg font-bold mb-4 pb-3" style={{ color: '#8C343A', borderBottom: '2px solid #E5E7EB' }}>
              📝 Order Summary
            </h3>
            
            {/* Itemized List */}
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="pb-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                  {/* Item Name and Quantity */}
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm" style={{ color: '#8C343A' }}>
                      {item.name}
                    </span>
                    <span className="text-xs font-medium" style={{ color: '#666666' }}>
                      x{item.quantity}
                    </span>
                  </div>
                  
                  {/* Unit Price and Item Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: '#666666' }}>
                      ₱{item.price.toFixed(0)} each
                    </span>
                    <span className="text-sm font-bold" style={{ color: '#B78A00' }}>
                      ₱{(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Divider */}
            <div className="my-4" style={{ borderTop: '2px solid #8C343A' }} />
            
            {/* Total Amount */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold" style={{ color: '#8C343A' }}>
                Total Amount:
              </span>
              <span className="text-2xl font-bold" style={{ color: '#B78A00' }}>
                ₱{getCartTotal().toFixed(0)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full py-4 rounded-full font-bold text-white transition-all duration-200 hover:opacity-90 shadow-lg"
            style={{ backgroundColor: '#8C343A', fontSize: '18px' }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
