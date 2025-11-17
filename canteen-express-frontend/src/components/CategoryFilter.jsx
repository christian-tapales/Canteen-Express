import PropTypes from 'prop-types';

/**
 * Reusable component for category filtering buttons
 * Displays a horizontal list of category buttons with active state highlighting
 */
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm ${
            selectedCategory === category
              ? 'transform scale-105'
              : 'hover:opacity-80'
          }`}
          style={{
            backgroundColor: selectedCategory === category ? '#FBCA30' : '#FFFFFF',
            color: selectedCategory === category ? '#8C343A' : '#666666',
            border: `2px solid ${selectedCategory === category ? '#8C343A' : '#E5E7EB'}`
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
