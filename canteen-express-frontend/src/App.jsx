import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ShopListPage from './pages/ShopListPage.jsx';
import ShopMenuPage from './pages/ShopMenuPage.jsx';
import CartPage from './pages/CartPage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ShopListPage />} />
          <Route path="/shops" element={<ShopListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shop/:shopId/menu" element={<ShopMenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add protected routes here if needed in the future */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
