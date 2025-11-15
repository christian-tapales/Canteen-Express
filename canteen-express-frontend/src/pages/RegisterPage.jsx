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
    <div className="flex justify-center items-center h-[calc(100vh-64px)]" style={{ backgroundColor: '#DEC67E' }}>
      <div className="w-full max-w-md p-10 space-y-6 shadow-2xl" style={{ backgroundColor: '#EEC56E', border: '4px solid #5B050B' }}>
        <h3 className="text-xl font-semibold text-center" style={{ color: '#5B050B' }}>
          Canteen Express
        </h3>
        <h2 className="text-4xl font-extrabold text-center uppercase tracking-wider" style={{ color: '#5B050B' }}>
          Register
        </h2>
        {error && <p className="text-sm text-center p-2 rounded-md" style={{ color: '#5B050B', backgroundColor: '#FAE7BF', border: '1px solid #8C343A' }}>{error}</p>}
        {success && <p className="text-sm text-center p-2 rounded-md" style={{ color: '#10B981', backgroundColor: '#ECFDF5', border: '1px solid #10B981' }}>{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* First Name Field */}
            <div className="space-y-1">
              <label htmlFor="firstName" className="block text-base font-semibold" style={{ color: '#5B050B' }}>
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-2 text-gray-800"
                style={{ backgroundColor: '#FAE7BF', border: '1px solid #8C343A' }}
              />
            </div>

            {/* Last Name Field */}
            <div className="space-y-1">
              <label htmlFor="lastName" className="block text-base font-semibold" style={{ color: '#5B050B' }}>
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-2 text-gray-800"
                style={{ backgroundColor: '#FAE7BF', border: '1px solid #8C343A' }}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-base font-semibold" style={{ color: '#5B050B' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-2 text-gray-800"
                style={{ backgroundColor: '#FAE7BF', border: '1px solid #8C343A' }}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-base font-semibold" style={{ color: '#5B050B' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-2 text-gray-800"
                style={{ backgroundColor: '#FAE7BF', border: '1px solid #8C343A' }}
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="block text-base font-semibold" style={{ color: '#5B050B' }}>
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-2 text-gray-800"
                style={{ backgroundColor: '#FAE7BF', border: '1px solid #8C343A' }}
              />
            </div>
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 uppercase tracking-widest"
              style={{ color: '#DFAD13', backgroundColor: '#8C343A' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5B050B'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#8C343A'}
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm" style={{ color: '#5B050B' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-bold hover:underline" style={{ color: '#5B050B' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
