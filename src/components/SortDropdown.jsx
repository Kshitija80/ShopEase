import React from 'react';

function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="input-group shadow-sm">
      <span className="input-group-text bg-white text-muted" id="sort-addon">
        <i className="bi bi-arrow-down-up"></i>
      </span>
      <select
        id="sortSelect"
        className="form-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort products"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
}

export default SortDropdown;
