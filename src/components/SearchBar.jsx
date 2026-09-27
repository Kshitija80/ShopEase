import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="input-group shadow-sm">
      <span className="input-group-text bg-white border-end-0 text-muted" id="search-addon">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0 ps-0"
        placeholder="Search products by title..."
        aria-label="Search products by title"
        aria-describedby="search-addon"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button
          className="btn btn-outline-secondary border-start-0"
          type="button"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
          title="Clear search"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
