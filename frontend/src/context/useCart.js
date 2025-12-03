// frontend/src/context/useCart.js
import { useContext } from 'react';
import { CartContext } from './CartContext'; // Import the context from the new file

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};