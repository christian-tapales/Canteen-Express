import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryFilter from '../components/CategoryFilter';
import FoodItemCard from '../components/FoodItemCard';

const ShopMenuPage = () => {
  const { shopId } = useParams();
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/shops/${shopId}/menu`);
        const menuData = response.data;
        setMenu(menuData);
        setFilteredMenu(menuData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(menuData.map(item => item.category).filter(Boolean))];
        setCategories(['All', ...uniqueCategories]);
      } catch {
        setError('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
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
      Loading menu...
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
        {/* Canteen Image */}
        <div 
          className="w-32 h-32 rounded-xl overflow-hidden shrink-0"
          style={{ 
            backgroundColor: '#E5E7EB',
            backgroundImage: 'url(https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Canteen Info */}
        <div className="grow">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#8C343A' }}>
            Main Canteen
          </h1>
          <button 
            onClick={() => window.history.back()}
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
      
      {/* Category Filter Component */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryFilter}
      />

      {/* Menu Items Grid */}
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
