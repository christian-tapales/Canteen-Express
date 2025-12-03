// frontend/src/context/AuthContext.jsx

// 1. Import dependencies
import { useState, useEffect } from 'react';
import axios from 'axios';
// We only need AuthContext here, imported from your separate AuthContext.js file
import { AuthContext } from './AuthContext.js'; // Assuming you named it AuthContext.js

// NOTE: Remove all code related to 'useContext' or 'useAuth' here.
// NOTE: Remove all code related to 'createContext' here.

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===================================
  // 1. Re-define Core Functions (Fixes 'no-undef')
  // ===================================

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      const { token, userId, role, firstName } = response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('firstName', firstName);

      setUser({ token, userId, role, firstName });

      return { success: true, role: role };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (firstName, lastName, email, password, phoneNumber) => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', { firstName, lastName, email, password, phoneNumber });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('firstName');
    setUser(null);
  };

  // ===================================
  // 2. useEffect Logic (Fixes 'set-state-in-effect')
  // ===================================

  useEffect(() => {
    // 1. Define the function to run the logic
    const initializeAuth = () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const role = sessionStorage.getItem('role');
        const firstName = sessionStorage.getItem('firstName');
        
        if (token && userId && role && firstName) {
            // 2. Set the user state if valid data is found
            setUser({ token, userId, role, firstName }); 
        }

        // 3. Mark the loading process as complete (This is critical)
        setLoading(false);
    };

    // Call the function
    initializeAuth();

}, []); // Run only once on mount

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};