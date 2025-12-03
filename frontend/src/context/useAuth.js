// 🟢 CORRECTED useAuth.js

import { useContext } from 'react';
import { AuthContext } from './AuthContext.js'; // Note: Ensure this path is correct

export const useAuth = () => {
  // Add the safety check
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};