import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import AddToCartModal from './AddToCartModal';

/**
 * Reusable component for displaying a food item card
 * Shows image, name, category, description, and price with "Add to Cart" button
 */
const FoodItemCard = ({ item }) => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;
  const isAvailable = item.isAvailable !== false; // Default to true if undefined

  const handleAddToCart = () => {
    if (!isAvailable) {
      alert('This item is currently out of stock');
      return;
    }
    if (!user) {
      alert('Please login to add items to your cart');
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div 
      className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${!isAvailable ? 'opacity-75' : ''}`}
      style={{ 
        backgroundColor: '#FFFFFF',
        border: '2px solid #8C343A'
      }}
    >
      {/* Image */}
      {item.imageUrl && (
        <div className="w-full h-48 overflow-hidden relative" style={{ backgroundColor: '#F3F4F6' }}>
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                OUT OF STOCK
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold" style={{ color: '#8C343A' }}>
            {item.name}
          </h2>
          {item.category && (
            <span 
              className="text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ml-2"
              style={{ 
                backgroundColor: '#FEF3C7',
                color: '#92400E'
              }}
            >
              {item.category}
            </span>
          )}
        </div>
        
        <p className="text-sm mb-3" style={{ color: '#666666' }}>
          {item.description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold" style={{ color: '#B78A00' }}>
            ₱{item.price?.toFixed(0)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`px-5 py-2 rounded-full font-semibold text-white transition-all duration-200 shadow-sm ${
              !isAvailable ? 'cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{ 
              backgroundColor: !isAvailable ? '#6B7280' : (user ? '#8C343A' : '#9CA3AF')
            }}
            title={!isAvailable ? 'Out of stock' : (!user ? 'Login to add items to cart' : '')}
          >
            {!isAvailable ? 'Unavailable' : (user ? 'Order Now' : 'Login to Order')}
          </button>
        </div>
        
        {quantityInCart > 0 && isAvailable && (
          <div 
            className="mt-3 text-center text-sm font-semibold py-1 rounded-full"
            style={{ 
              backgroundColor: '#FEF3C7',
              color: '#92400E'
            }}
          >
            {quantityInCart} in cart
          </div>
        )}
        
        {!isAvailable && (
          <div 
            className="mt-3 text-center text-sm font-semibold py-1 rounded-full"
            style={{ 
              backgroundColor: '#FEE2E2',
              color: '#991B1B'
            }}
          >
            Currently Unavailable
          </div>
        )}
      </div>

      <AddToCartModal 
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

FoodItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    imageUrl: PropTypes.string,
    isAvailable: PropTypes.bool,
  }).isRequired,
};

export default FoodItemCard;
