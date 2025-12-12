import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import NotFoundPage from '../pages/NotFoundPage';

const normalizePath = (p) => {
  if (!p) return p;
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1);
  return p;
};

const RoleGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const customerAllowed = ['/', '/shops', '/order-history', '/cart'];
  const customerRegex = [/^\/shop\/[^/]+\/menu$/];

  const vendorAllowed = ['/vendor/dashboard', '/vendor/orders', '/vendor/shop-management', '/'];
  const adminAllowed = ['/admin/dashboard', '/admin/management', '/admin/ledger', '/'];

  const path = normalizePath(location.pathname);

  // Unauthenticated users: allow only public customer pages; block /vendor and /admin
  if (!user) {
    if (path.startsWith('/vendor') || path.startsWith('/admin')) {
      return <NotFoundPage />;
    }
    // allow public customer pages and others (login/register)
    return children;
  }

  // Authenticated: enforce per-role allowed pages
  if (user.role === 'CUSTOMER') {
    if (customerAllowed.includes(path) || customerRegex.some((r) => r.test(path))) {
      return children;
    }
    return <NotFoundPage />;
  }

  if (user.role === 'VENDOR') {
    if (vendorAllowed.includes(path)) return children;
    return <NotFoundPage />;
  }

  if (user.role === 'ADMIN') {
    if (adminAllowed.includes(path)) return children;
    return <NotFoundPage />;
  }

  return children;
};

export default RoleGuard;
