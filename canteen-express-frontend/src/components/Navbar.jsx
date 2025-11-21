import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="shadow-md" style={{ backgroundColor: '#FBCA30', padding: '1rem 0' }}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/shops" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#8C343A' }}
          >
            <span className="text-2xl">🍽️</span>
          </div>
          <span className="text-xl font-bold" style={{ color: '#8C343A' }}>
            Canteen Express
          </span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Icon with Badge */}
          <Link 
            to="/cart" 
            className="relative hover:opacity-80 transition-opacity p-2" 
            title="Shopping Cart"
          >
            <span style={{ fontSize: '28px' }}>🛒</span>
            {cartCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 text-xs font-bold px-2 py-1 rounded-full text-white shadow-md"
                style={{ 
                  backgroundColor: '#8C343A', 
                  minWidth: '22px', 
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* User Actions */}
          {user ? (
            <button 
              onClick={handleLogout} 
              className="px-5 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm"
              style={{ 
                backgroundColor: '#8C343A',
                color: '#FBCA30'
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-5 py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity"
                style={{ 
                  color: '#8C343A',
                  backgroundColor: 'transparent',
                  border: '2px solid #8C343A'
                }}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-all shadow-sm"
                style={{ 
                  backgroundColor: '#8C343A',
                  color: '#FBCA30'
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
