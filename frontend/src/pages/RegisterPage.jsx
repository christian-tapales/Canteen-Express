import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = await register(firstName, lastName, email, password, phoneNumber);
    if (result.success) {
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.message);
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
          Create Account
        </h2>
        <p 
          className="text-center text-sm mb-8"
          style={{ color: '#666666' }}
        >
          Join Canteen Express today!
        </p>

        {/* Messages */}
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
        {success && (
          <div 
            className="mb-6 p-4 rounded-2xl text-center"
            style={{ 
              backgroundColor: '#D1FAE5',
              border: '2px solid #10B981',
              color: '#065F46'
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label 
              htmlFor="firstName" 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#8C343A' }}
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
              className="w-full px-5 py-3 rounded-xl focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#FFFCF2',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8C343A'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Last Name */}
          <div>
            <label 
              htmlFor="lastName" 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#8C343A' }}
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
              className="w-full px-5 py-3 rounded-xl focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#FFFCF2',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8C343A'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Email */}
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
              className="w-full px-5 py-3 rounded-xl focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#FFFCF2',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8C343A'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Password */}
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
              placeholder="Create a password"
              className="w-full px-5 py-3 rounded-xl focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#FFFCF2',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8C343A'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label 
              htmlFor="phoneNumber" 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#8C343A' }}
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Enter your phone number"
              className="w-full px-5 py-3 rounded-xl focus:outline-none transition-all"
              style={{ 
                backgroundColor: '#FFFCF2',
                border: '2px solid #E5E7EB',
                color: '#2D2D2D'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8C343A'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-full text-lg font-bold transition-all duration-300 hover:opacity-90 shadow-lg mt-6"
            style={{ 
              backgroundColor: '#8C343A',
              color: '#FFFFFF'
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p 
          className="text-center text-sm mt-8"
          style={{ color: '#666666' }}
        >
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-bold hover:underline"
            style={{ color: '#8C343A' }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
