import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';

/**
 * Modal component for adding items to cart with quantity controls
 */
const AddToCartModal = ({ item, isOpen, onClose }) => {
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  const itemInCart = cartItems.find(cartItem => cartItem.id === item?.id);

  useEffect(() => {
    if (isOpen && itemInCart) {
      setQuantity(itemInCart.quantity);
    } else if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, itemInCart]);

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    if (itemInCart) {
      updateQuantity(item.id, quantity);
    } else {
      // Add the item with the specified quantity
      addToCart(item);
      for (let i = 1; i < quantity; i++) {
        addToCart(item);
      }
    }
    onClose();
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const subtotal = item.price * quantity;

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: '4px solid #8C343A' }}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#5B050B' }}>
              Add to Cart
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Item Details */}
          <div className="flex gap-4 mb-6">
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
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#5B050B' }}>
                {item.name}
              </h3>
              {item.category && (
                <span
                  className="text-xs px-2 py-1 rounded-full font-semibold inline-block mb-2"
                  style={{ backgroundColor: '#FAE7BF', color: '#8C343A' }}
                >
                  {item.category}
                </span>
              )}
              <p className="text-xl font-bold" style={{ color: '#DFAD13' }}>
                ₱{item.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2" style={{ color: '#5B050B' }}>
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-12 h-12 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                style={{ backgroundColor: '#8C343A' }}
              >
                -
              </button>
              <span className="text-2xl font-bold w-16 text-center" style={{ color: '#5B050B' }}>
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-12 h-12 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90 text-xl"
                style={{ backgroundColor: '#8C343A' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <span className="text-lg font-semibold" style={{ color: '#5B050B' }}>
              Subtotal
            </span>
            <span className="text-2xl font-bold" style={{ color: '#DFAD13' }}>
              ₱{subtotal.toFixed(2)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100"
              style={{ backgroundColor: '#FAE7BF', color: '#8C343A' }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#8C343A' }}
            >
              {itemInCart ? 'Update Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddToCartModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddToCartModal;
