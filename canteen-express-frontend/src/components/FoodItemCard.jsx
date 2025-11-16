import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import AddToCartModal from './AddToCartModal';

/**
 * Reusable component for displaying a food item card
 * Shows image, name, category, description, and price with "Add to Cart" button
 */
const FoodItemCard = ({ item }) => {
  const { cartItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
      style={{ borderTop: '4px solid #8C343A' }}
    >
      {/* Image */}
      {item.imageUrl && (
        <div className="w-full h-48 overflow-hidden bg-gray-100">
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
          <h2 className="text-xl font-semibold" style={{ color: '#5B050B' }}>
            {item.name}
          </h2>
          {item.category && (
            <span 
              className="text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2"
              style={{ backgroundColor: '#FAE7BF', color: '#8C343A' }}
            >
              {item.category}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold" style={{ color: '#DFAD13' }}>
            ₱{item.price?.toFixed(2)}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#8C343A' }}
          >
            Add to Cart {quantityInCart > 0 && `(${quantityInCart})`}
          </button>
        </div>
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
