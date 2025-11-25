import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ShopListPage from './pages/ShopListPage.jsx';
import ShopMenuPage from './pages/ShopMenuPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Landing Page - No Navbar */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Dashboard - No Navbar */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Login/Register Pages - No Navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Regular Routes with Navbar */}
        <Route path="*" element={
          <>
            <Navbar />
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/shops" element={<ShopListPage />} />
                <Route path="/shop/:shopId/menu" element={<ShopMenuPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
