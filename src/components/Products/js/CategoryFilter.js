import "../css/CategoryFilter.css";
export function CategoryFilter({ categories, selectedCategories, onToggleCategory, onClearFilters }) {
  return (
    <div className="category-filter">
      <h2 className="category-filter-title">Categories</h2>
      <div className="category-list">
        {categories.map((category) => (
          <label
            key={category.id}
            className="category-item"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.name)}
              onChange={() => onToggleCategory(category.name)}
              className="category-checkbox"
            />
            <span className="category-label">
              {category.name}
            </span>
          </label>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <button 
          className="clear-filters-btn"
          onClick={onClearFilters}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
