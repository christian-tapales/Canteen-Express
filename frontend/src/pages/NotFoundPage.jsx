import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const NotFoundPage = () => {
  const { user } = useAuth();
  let target = '/';
  if (user) {
    if (user.role === 'VENDOR') target = '/vendor/dashboard';
    else if (user.role === 'ADMIN') target = '/admin/dashboard';
    else target = '/';
  } else {
    target = '/';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF9E6] px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#8C343A] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6">Page Not Found</h2>
        <p className="text-lg text-[#666666] mb-8">
        </p>
        <Link 
          to={target} 
          className="px-8 py-3 rounded-full font-bold text-white transition-all hover:opacity-90 shadow-lg"
          style={{ backgroundColor: '#8C343A' }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;