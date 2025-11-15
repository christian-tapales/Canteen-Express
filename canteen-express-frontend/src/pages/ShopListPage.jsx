import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShopListPage = () => {
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

  if (loading) return <div className="text-center">Loading shops...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Shops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{shop.name}</h2>
            <p className="text-gray-600 mb-4">{shop.description}</p>
            <Link
              to={`/shop/${shop.id}/menu`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Menu
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopListPage;
