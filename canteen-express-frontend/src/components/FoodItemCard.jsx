import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to your cart');
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      style={{ 
        backgroundColor: '#FFFFFF',
        border: '2px solid #8C343A'
      }}
    >
      {/* Image */}
      {item.imageUrl && (
        <div className="w-full h-48 overflow-hidden" style={{ backgroundColor: '#F3F4F6' }}>
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
            className="px-5 py-2 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 shadow-sm"
            style={{ 
              backgroundColor: user ? '#8C343A' : '#9CA3AF'
            }}
            title={!user ? 'Login to add items to cart' : ''}
          >
            {user ? 'Order Now' : 'Login to Order'}
          </button>
        </div>
        
        {quantityInCart > 0 && (
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
  }).isRequired,
};

export default FoodItemCard;
