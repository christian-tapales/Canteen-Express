import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import CategoryFilter from '../components/CategoryFilter';
import FoodItemCard from '../components/FoodItemCard';

const ShopMenuPage = () => {
  const { shopId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [shop, setShop] = useState(null); // NEW: State to store shop details
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Shop Details (Name, Image, etc.)
        // Ensure your backend has an endpoint like GET /api/shops/:id
        const shopResponse = await axios.get(`http://localhost:8080/api/shops/${shopId}`);
        setShop(shopResponse.data);

        // 2. Fetch Menu
        const menuResponse = await axios.get(`http://localhost:8080/api/shops/${shopId}/menu`);
        const menuData = menuResponse.data;
        
        const enrichedMenu = (menuData || []).map((it) => ({ ...it, shopId: Number(shopId) }));
        setMenu(enrichedMenu);
        setFilteredMenu(enrichedMenu);
        
        const uniqueCategories = [...new Set(enrichedMenu.map(item => item.category).filter(Boolean))];
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.error(err);
        setError('Failed to load shop data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [shopId]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter(item => item.category === category));
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-12 text-center text-lg" style={{ color: '#8C343A' }}>
      Loading...
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-12 text-center text-lg" style={{ color: '#DC2626' }}>
      {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Card */}
      <div 
        className="rounded-2xl p-6 mb-8 shadow-md flex items-center gap-6"
        style={{ 
          backgroundColor: '#FFFFFF',
          border: '2px solid #8C343A'
        }}
      >
        {/* Canteen Image - NOW DYNAMIC */}
        <div 
          className="w-32 h-32 rounded-xl overflow-hidden shrink-0"
          style={{ 
            backgroundColor: '#E5E7EB',
            // Uses shop.image_url if available, otherwise falls back to the default
            backgroundImage: `url(${shop?.image_url || 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Canteen Info */}
        <div className="grow">
          {/* Shop Name - NOW DYNAMIC */}
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#8C343A' }}>
            {shop?.name || 'Loading Name...'}
          </h1>
          <p className="text-gray-600 mb-3">{shop?.description}</p>

          <button 
            onClick={() => navigate(-1)} // Better way to go back
            className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all hover:opacity-90 shadow-sm"
            style={{ 
              backgroundColor: '#8C343A',
              color: '#FFFFFF'
            }}
          >
            ← Back to Shops
          </button>
        </div>
      </div>
      
      {/* ... The rest of your code (CategoryFilter, Grid, etc.) stays the same ... */}
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryFilter}
      />

      {filteredMenu.length === 0 ? (
        <div className="text-center text-lg py-12" style={{ color: '#666666' }}>
          No items found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopMenuPage;