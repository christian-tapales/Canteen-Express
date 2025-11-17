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
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#5B050B' }}>
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some delicious items from our shops to get started!
          </p>
          <button
            onClick={() => navigate('/shops')}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#8C343A' }}
          >
            Browse Shops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8" style={{ color: '#5B050B' }}>
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
              style={{ borderLeft: '4px solid #8C343A' }}
            >
              {/* Image */}
              {item.imageUrl && (
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
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
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#5B050B' }}>
                  {item.name}
                </h3>
                {item.category && (
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: '#FAE7BF', color: '#8C343A' }}
                  >
                    {item.category}
                  </span>
                )}
                <p className="text-xl font-bold mt-2" style={{ color: '#DFAD13' }}>
                  ₱{item.price.toFixed(2)} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#8C343A' }}
                >
                  -
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#8C343A' }}
                >
                  +
                </button>
              </div>

              {/* Subtotal & Remove */}
              <div className="text-right">
                <p className="text-xl font-bold mb-2" style={{ color: '#5B050B' }}>
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Box */}
        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-lg shadow-md p-6 sticky top-4"
            style={{ borderTop: '4px solid #DFAD13' }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#5B050B' }}>
              Checkout
            </h2>

            {/* Estimated Pickup Time */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#5B050B' }}>
                Estimated Pickup Time *
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-opacity-50"
                style={{ borderColor: '#8C343A' }}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#5B050B' }}>
                Method of Payment *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-opacity-50"
                style={{ borderColor: '#8C343A' }}
                required
              >
                <option value="">Select mode of payment</option>
                <option value="Cash">Cash</option>
                <option value="GCash">GCash</option>
                <option value="Maya">Maya</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
              </select>
            </div>

            {/* Special Instructions */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#5B050B' }}>
                Special Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests? (optional)"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-opacity-50 resize-none"
                style={{ borderColor: '#8C343A' }}
                rows="3"
              />
            </div>

            {/* Order Summary */}
            <div className="border-t-2 pt-4 mb-4" style={{ borderColor: '#FAE7BF' }}>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>₱{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>₱0.00</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t" style={{ color: '#5B050B' }}>
                <span>Total Amount</span>
                <span style={{ color: '#DFAD13' }}>₱{getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 mb-3"
              style={{ backgroundColor: '#8C343A' }}
            >
              Place Order
            </button>

            <button
              onClick={() => navigate('/shops')}
              className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100"
              style={{ backgroundColor: '#FAE7BF', color: '#8C343A' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
