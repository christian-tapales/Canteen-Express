import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShopMenuPage = () => {
  const { shopId } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/shops/${shopId}/menu`);
        setMenu(response.data);
      } catch {
        setError('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [shopId]);

  if (loading) return <div className="text-center">Loading menu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-bold text-green-600">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopMenuPage;
