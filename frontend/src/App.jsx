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
import AdminManagement from './pages/AdminManagement.jsx';
import AdminLedger from './pages/AdminLedger.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import VendorOrders from './pages/VendorOrders.jsx';
import ShopManagement from './pages/ShopManagement.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Landing Page - No Navbar */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login/Register Pages - No Navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Admin Routes - No Navbar (Consolidated 3-page structure) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/management" element={<AdminManagement />} />
        <Route path="/admin/ledger" element={<AdminLedger />} />
        
        {/* Vendor Routes - No Navbar (Consolidated 3-page structure) */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/shop-management" element={<ShopManagement />} />
        
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
        <Route path="/order-history" element={
          <>
            <Navbar />
            <main className="container mx-auto p-4">
              <OrderHistoryPage />
            </main>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
