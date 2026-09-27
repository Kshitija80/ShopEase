import React from 'react';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="input-group shadow-sm">
      <span className="input-group-text bg-white text-muted" id="category-addon">
        <i className="bi bi-funnel"></i>
      </span>
      <select
        id="categorySelect"
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        aria-label="Filter products by category"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => {
          const slug = typeof category === 'object' ? category.slug : category;
          const name = typeof category === 'object' ? category.name : category;
          return (
            <option key={slug} value={slug}>
              {name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ')}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CategoryFilter;
