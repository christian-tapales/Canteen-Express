import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default fallback if no specific destination was requested
  const from = location.state?.from?.pathname || '/shops';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Attempt Login
      const result = await auth.login(email, password);
      
      if (result.success) {
        // 2. CHECK ROLE AND REDIRECT ACCORDINGLY
        // This is the "Traffic Cop" logic
        if (result.role === 'ADMIN') {
            navigate('/admin/dashboard', { replace: true });
        } else if (result.role === 'VENDOR') {
            navigate('/vendor/dashboard', { replace: true });
        } else {
            // Default to customer page (or where they tried to go)
            // If 'from' is just login, go to shops, otherwise go to their intended destination
            const destination = from === '/login' ? '/shops' : from;
            navigate(destination, { replace: true });
        }
      } else {
        setError(result.message || 'Login failed');
      }

    } catch (err) {
      setError('Login failed. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen px-4 py-12" 
      style={{ backgroundColor: '#FFF9E6' }}
    >
      <div 
        className="w-full max-w-md rounded-3xl p-10 shadow-2xl"
        style={{ 
          backgroundColor: '#FFFFFF',
          border: '3px solid #8C343A'
        }}
      >
        {/* Logo/Brand */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            style={{ 
              backgroundColor: '#8C343A',
              border: '3px solid #FBCA30'
            }}
          >
            <span className="text-4xl">🍽️</span>
          </div>
        </div>

        {/* Title */}
        <h2 
          className="text-4xl font-bold text-center mb-2"
          style={{ color: '#8C343A' }}
        >
          Login to Your Account
        </h2>
        <p 
          className="text-center text-sm mb-8"
          style={{ color: '#666666' }}
        >
          Welcome back! Please enter your credentials
        </p>

        {/* Error Message */}
        {error && (
          <div 
            className="mb-6 p-4 rounded-2xl text-center"
            style={{ 
              backgroundColor: '#FEE2E2',
              border: '2px solid #DC2626',
              color: '#991B1B'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2"
              style={{ color: '#8C343A' }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
              style={{ 
                backgroundColor: '#FFFCF2',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8C343A'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
              style={{ color: '#8C343A' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
              style={{ 
                backgroundColor: '#FFFCF2',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8C343A'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a 
              href="#" 
              className="text-sm font-semibold hover:underline"
              style={{ color: '#8C343A' }}
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full text-lg font-bold transition-all duration-300 hover:opacity-90 shadow-lg disabled:opacity-50"
            style={{ 
              backgroundColor: '#8C343A',
              color: '#FFFFFF'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p 
          className="text-center text-sm mt-8"
          style={{ color: '#666666' }}
        >
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-bold hover:underline"
            style={{ color: '#8C343A' }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;