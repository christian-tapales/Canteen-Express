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
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            selectedCategory === category
              ? 'shadow-lg transform scale-105'
              : 'hover:opacity-80'
          }`}
          style={{
            backgroundColor: selectedCategory === category ? '#8C343A' : '#DEC67E',
            color: selectedCategory === category ? '#DFAD13' : '#5B050B',
            border: `2px solid ${selectedCategory === category ? '#5B050B' : '#8C343A'}`
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
