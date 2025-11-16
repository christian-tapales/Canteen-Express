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

  if (loading) return <div className="text-center mt-8 text-lg">Loading menu...</div>;
  if (error) return <div className="text-center mt-8 text-red-500 text-lg">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: '#5B050B' }}>Menu</h1>
      
      {/* Category Filter Component */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryFilter}
      />

      {/* Menu Items Count */}
      <p className="text-center mb-4 text-gray-600">
        Showing {filteredMenu.length} item{filteredMenu.length !== 1 ? 's' : ''}
        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
      </p>

      {/* Menu Items Grid */}
      {filteredMenu.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No items found in this category</div>
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
