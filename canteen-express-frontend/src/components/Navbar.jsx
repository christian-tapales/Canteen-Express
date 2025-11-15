import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="p-4 shadow-md border-b-4" style={{ backgroundColor: '#DEC67E', color: '#5B050B', borderBottomColor: '#5B050B' }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:opacity-80" style={{ color: '#5B050B' }}>Canteen Express</Link>
        <div className="flex space-x-4">
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
