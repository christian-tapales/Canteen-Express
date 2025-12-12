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
    // Initialize auth by validating token with server (do NOT trust client-stored role)
    const initializeAuth = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { userId, role, firstName, email } = res.data;
        // Overwrite client storage with authoritative server values
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('firstName', firstName);

        setUser({ token, userId, role, firstName, email });
      } catch (err) {
        // Token invalid or expired — clear local auth
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('firstName');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    token: user?.token || sessionStorage.getItem('token'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};