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
    <nav className="p-4 shadow-md border-b-4" style={{ backgroundColor: '#DEC67E', color: '#5B050B', borderBottomColor: '#5B050B' }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:opacity-80" style={{ color: '#5B050B' }}>Canteen Express</Link>
        <div className="flex items-center space-x-4">
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative hover:opacity-80" title="Shopping Cart">
            <span style={{ fontSize: '24px', color: '#5B050B' }}>🛒</span>
            {cartCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: '#8C343A', minWidth: '20px', textAlign: 'center' }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <button onClick={handleLogout} className="px-4 py-2 rounded-sm font-bold uppercase tracking-widest" style={{ color: '#DFAD13', backgroundColor: '#8C343A' }}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:opacity-80 font-semibold" style={{ color: '#5B050B' }}>Login</Link>
              <Link to="/register" className="hover:opacity-80 font-semibold" style={{ color: '#5B050B' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
