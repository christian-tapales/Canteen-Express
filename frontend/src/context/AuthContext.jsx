import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('role');
    const firstName = sessionStorage.getItem('firstName');
    if (token && userId && role && firstName) {
      setUser({ token, userId, role, firstName });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      const { token, userId, role, firstName } = response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('firstName', firstName);

      setUser({ token, userId, role, firstName });

      // CRITICAL CHANGE: We return the role here so LoginPage can use it
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