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
import AdminOrders from './pages/AdminOrders.jsx';
import AdminStore from './pages/AdminStore.jsx';
import AdminMenu from './pages/AdminMenu.jsx';
import AdminSales from './pages/AdminSales.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import VendorOrders from './pages/VendorOrders.jsx';
import VendorStore from './pages/VendorStore.jsx';
import VendorMenu from './pages/VendorMenu.jsx';
import VendorSales from './pages/VendorSales.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Landing Page - No Navbar */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login/Register Pages - No Navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Admin Routes - No Navbar */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/store" element={<AdminStore />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/sales" element={<AdminSales />} />
        
        {/* Vendor Routes - No Navbar */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/store" element={<VendorStore />} />
        <Route path="/vendor/menu" element={<VendorMenu />} />
        <Route path="/vendor/sales" element={<VendorSales />} />
        
        {/* Regular Routes with Navbar */}
        <Route path="/shops" element={
          <>
            <Navbar />
            <main className="container mx-auto p-4">
              <ShopListPage />
            </main>
          </>
        } />
        <Route path="/shop/:shopId/menu" element={
          <>
            <Navbar />
            <main className="container mx-auto p-4">
              <ShopMenuPage />
            </main>
          </>
        } />
        <Route path="/cart" element={
          <>
            <Navbar />
            <main className="container mx-auto p-4">
              <CartPage />
            </main>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
