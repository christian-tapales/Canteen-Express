import { useState, useEffect } from 'react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth'; // Import useAuth to get user token/ID
import { useNavigate } from 'react-router-dom';

import axios from 'axios'; // Import axios

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();
  // Add this near your other state variables
  const [shopPaymentNumber, setShopPaymentNumber] = useState('');

  // Checkout form state
  const [transactionCode, setTransactionCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state for submission

  // Fetch Shop Payment Number
  useEffect(() => {
    const fetchShopDetails = async () => {
      if (cartItems.length > 0) {
        const shopId = cartItems[0].shopId;
        try {
          // We can reuse the public shop endpoint since paymentNumber is now in the DTO
          const response = await axios.get(`http://localhost:8080/api/shops/${shopId}`);
          setShopPaymentNumber(response.data.paymentNumber);
        } catch (error) {
          console.error("Failed to load shop payment info");
        }
      }
    };
    fetchShopDetails();
  }, [cartItems]);
  const handleCheckout = async () => {
    if (!transactionCode) {
      alert('Please enter the transaction code');
      return;
    }
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Safety check for logged-in user
    if (!user || !user.userId || !user.token) {
        alert('You must be logged in to place an order.');
        navigate('/login');
        return;
    }

    setIsSubmitting(true);

    // Determine the shopId. Assuming all items in cart are from the same shop for this version.
    // Ideally, the cart should enforce single-shop orders or group by shop.
    // Fallback to the first item's shopId.
    const shopId = cartItems[0]?.shopId;

    if (!shopId) {
        alert("Error: Missing shop information for items in cart. Please clear cart and try again.");
        setIsSubmitting(false);
        return;
    }

    // --- 1. PREPARE THE PAYLOAD ---
    const totalAmount = getCartTotal();
    
    // Convert pickup time (HH:MM format) to ISO LocalDateTime format
    // Get today's date and combine it with the selected time
    
    const orderPayload = {
        userId: user.userId,
        shopId: shopId,
        orderItems: cartItems.map(item => ({
            foodItemId: item.id,
            quantity: item.quantity,
        })),
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        transactionCode: transactionCode,
        specialInstructions: specialInstructions,
    };

    console.log("Sending Order Payload:", orderPayload);
    console.log("Authorization Header:", `Bearer ${user.token}`);
    console.log("User Object:", user);

    // --- 2. SEND API REQUEST ---
    try {
        const API_BASE_URL = 'http://localhost:8080';
        const response = await axios.post(
            `${API_BASE_URL}/api/orders`,
            orderPayload,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`, // Include JWT token
                    'Content-Type': 'application/json'
                }
            }
        );

        // --- 3. HANDLE SUCCESS ---
        if (response.status === 200) {
            // response.data should contain the created order entity
            const orderId = response.data.orderId || 'New'; 
            
            alert(
              `Order #${orderId} Confirmed!\n\n` +
              `Total: ₱${getCartTotal().toFixed(2)}\n` +
              `Transaction Code: ${transactionCode}\n` +
              `Payment Method: ${paymentMethod}\n` +
              `You'll be notified when your order will be ready for pickup!`
            );
            
            clearCart();
            setTransactionCode('');
            setPaymentMethod('');
            setSpecialInstructions('');
            navigate('/shops');
        }
    } catch (error) {
        console.error('Checkout failed:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Server error. Please try again.';
        alert(`Order placement failed: ${errorMessage}`);
    } finally {
        setIsSubmitting(false);
    }
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
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#FBCA30', minHeight: 'calc(100vh - 80px)' }}>
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/shops')}
          className="text-2xl font-bold"
          style={{ color: '#8C343A' }}
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold" style={{ color: '#8C343A' }}>
          My Cart
        </h1>
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
                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: '#F3F4F6' }}>
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
                  <div className="grow">
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
              className="w-full px-4 py-4 rounded-xl focus:outline-none font-semibold mb-2"
              style={{ 
                backgroundColor: '#FFF9E6',
                border: '2px solid #E5E7EB',
                color: '#8C343A'
              }}
              required
            >
              <option value="">Selected Method of Payment</option>
              <option value="GCash">GCash</option>
              <option value="Maya">Maya</option>
              <option value="ShopeePay">ShopeePay</option>
              <option value="Coins.ph">Coins.ph</option>
              <option value="GrabPay">GrabPay</option>
            </select>

            {/* ✅ NEW: Display Shop's Payment Number */}
            {shopPaymentNumber && (
              <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs font-bold text-green-600 uppercase mb-1 ">
                  Send Payment To:
                </p>
                <p className="text-lg font-mono font-bold text-gray-800 tracking-wider">
                  {shopPaymentNumber}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Please send the exact total amount to this number (any of the payment methods uses the same number).
                </p>
              </div>
            )}
            <textarea
              value={transactionCode}
              onChange={(e) => setTransactionCode(e.target.value)}
              placeholder="Transaction Code"
              className="w-full px-4 py-3 rounded-xl focus:outline-none resize-none"
              style={{ 
                backgroundColor: '#FFF9E6',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              rows="1"
            />
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

          {/* Total Amount Box */}
          <div
            className="rounded-2xl p-6 shadow-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '2px solid #8C343A'
            }}
          >
            <h3 className="text-base font-bold mb-4" style={{ color: '#8C343A' }}>
              Total Amount:
            </h3>
            <p className="text-2xl font-bold text-center" style={{ color: '#B78A00' }}>
              ₱{getCartTotal().toFixed(0)}
            </p>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full py-4 rounded-full font-bold text-white transition-all duration-200 hover:opacity-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#8C343A', fontSize: '18px' }}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;