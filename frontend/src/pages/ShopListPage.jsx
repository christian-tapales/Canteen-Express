import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const ShopListPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/shops');
        setShops(response.data);
      } catch {
        setError('Failed to load shops');
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  if (loading) return (
    <div className="container mx-auto px-4 py-12 text-center text-lg" style={{ color: '#8C343A' }}>
      Loading shops...
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-12 text-center text-lg" style={{ color: '#DC2626' }}>
      {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Greeting Card */}
      <div 
        className="rounded-2xl p-6 mb-8 shadow-md"
        style={{ 
          backgroundColor: '#FFFFFF',
          border: '2px solid #8C343A'
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#8C343A' }}>
          {user ? `Hi ${user.firstName}, Welcome to Canteen Express!` : 'Hello, Welcome! 👋'}
        </h1>
        <button
          onClick={() => navigate('/order-history')}
          className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm"
          style={{
            backgroundColor: '#10B981',
            color: '#FFFFFF'
          }}
        >
          View Order History
        </button>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#8C343A' }}>
        Where would you like to order today?
      </h2>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div 
            key={shop.id} 
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '2px solid #8C343A'
            }}
          >
            {/* Shop Image Placeholder */}
            <div 
              className="h-48 w-full"
              style={{ 
                backgroundColor: '#E5E7EB',
                backgroundImage: 'url(https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Shop Info */}
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2" style={{ color: '#8C343A' }}>
                {shop.name}
              </h2>
              <p className="text-sm mb-4" style={{ color: '#666666' }}>
                {shop.description}
              </p>
              
              {/* Action Button */}
              <Link
                to={`/shop/${shop.id}/menu`}
                className="inline-block w-full text-center px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm"
                style={{ 
                  backgroundColor: '#10B981',
                  color: '#FFFFFF'
                }}
              >
                Now Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopListPage;
