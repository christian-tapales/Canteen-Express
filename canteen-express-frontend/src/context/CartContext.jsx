import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Load cart from localStorage on mount and when user changes
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setCurrentUserId(userId);
    
    if (userId) {
      // Load cart specific to this user
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    } else {
      // No user logged in, clear cart
      setCartItems([]);
    }
  }, []);

  // Monitor userId changes (for login/logout/switch account)
  useEffect(() => {
    const checkUserChange = () => {
      const userId = localStorage.getItem('userId');
      
      if (userId !== currentUserId) {
        setCurrentUserId(userId);
        
        if (userId) {
          // User logged in or switched account - load their cart
          const savedCart = localStorage.getItem(`cart_${userId}`);
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          } else {
            setCartItems([]);
          }
        } else {
          // User logged out - clear cart
          setCartItems([]);
        }
      }
    };

    // Check immediately
    checkUserChange();

    // Set up interval to check for changes
    const interval = setInterval(checkUserChange, 500);
    return () => clearInterval(interval);
  }, [currentUserId]);

  // Save cart to localStorage whenever it changes (user-specific)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    // Also clear from localStorage for current user
    const userId = localStorage.getItem('userId');
    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
