import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const { token, userId } = response.data;
      const user = { userId, role: response.data.role }; 
      
      auth.login(token, user);
      
      navigate(from, { replace: true });

    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Invalid email or password.');
      } else {
        setError('Login failed. Please try again later.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW MODERN COLOR PALETTE ---
  // Outer Background: #F5F5F5 (light grey for a clean, modern look)
  // Main Container Background: #FFFFFF (white for contrast and simplicity)
  // Accent Color: #2563EB (vibrant blue for a fresh, professional feel)
  // Input Field Background: #FAFAFA (subtle off-white for depth)
  // Input Field Border: #E5E7EB (light grey for subtle definition)
  // Button Text: #FFFFFF (white for readability)

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]" style={{ backgroundColor: '#DEC67E' }}>
      <div className="w-full max-w-md p-10 space-y-6 shadow-2xl" style={{ backgroundColor: '#EEC56E', border: '4px solid #5B050B' }}>
        <h3 className="text-xl font-semibold text-center" style={{ color: '#5B050B' }}>
            Canteen Express
        </h3>
        <h2 className="text-4xl font-extrabold text-center uppercase tracking-wider" style={{ color: '#5B050B' }}>
          Log In
        </h2>
        {error && <p className="text-sm text-center p-2 rounded-md" style={{ color: '#5B050B', backgroundColor: '#FAE7BF', border: '1px solid #8C343A' }}>{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="block text-base font-semibold"
                    style={{ color: '#5B050B' }}
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-2 text-gray-800"
                    style={{ backgroundColor: '#FAE7BF', border: '1px solid #8C343A', focusRingColor: '#8C343A' }}
                />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
                <label
                    htmlFor="password"
                    className="block text-base font-semibold"
                    style={{ color: '#5B050B' }}
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-2 text-gray-800"
                    style={{ backgroundColor: '#FAE7BF', border: '1px solid #8C343A', focusRingColor: '#8C343A' }}
                />
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 uppercase tracking-widest"
              style={{ color: '#DFAD13', backgroundColor: '#8C343A' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5B050B'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#8C343A'}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm" style={{ color: '#5B050B' }}>
          No account yet?{' '}
          <Link to="/register" className="font-bold hover:underline" style={{ color: '#5B050B' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;