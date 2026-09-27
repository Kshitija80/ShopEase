import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortDropdown from '../components/SortDropdown';
import LoadingSpinner from '../components/LoadingSpinner';

function Home({
  products = [],
  categories = [],
  isLoading = false,
  error = null,
  onRetry,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  onViewDetails
}) {
  // Filter & Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Filter and sort products (Derived State - without mutating original products)
  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filter by category
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filter by search term (product title)
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // 3. Sort without mutating original array
    const sorted = [...result];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="container py-4">
      {/* Hero Banner Header */}
      <header className="text-center py-4 mb-4 bg-white rounded-4 shadow-sm border p-4">
        <h1 className="display-5 fw-bold text-dark mb-2">ShopEase</h1>
        <p className="lead text-secondary mb-0">
          Discover products and shop with ease.
        </p>
      </header>

      {/* Search, Filter & Sort Controls Toolbar */}
      <section className="bg-white p-3 p-md-4 rounded-4 shadow-sm border mb-4" aria-label="Product filters and search">
        <div className="row g-3 align-items-center">
          {/* Search Bar */}
          <div className="col-12 col-md-5">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          {/* Category Filter */}
          <div className="col-12 col-sm-6 col-md-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="col-12 col-sm-6 col-md-3">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Active Filter Indicators & Count */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 pt-3 border-top small text-muted">
          <div>
            Showing <strong className="text-dark">{filteredAndSortedProducts.length}</strong>{' '}
            {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
            {products.length > 0 && ` (of ${products.length} total)`}
          </div>

          {(searchTerm || selectedCategory !== 'all' || sortBy !== 'default') && (
            <button
              type="button"
              className="btn btn-link btn-sm text-decoration-none text-danger p-0"
              onClick={handleResetFilters}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Main Content Area: Loading, Error, or Product Grid */}
      {isLoading && <LoadingSpinner message="Loading products..." />}

      {error && !isLoading && (
        <div className="alert alert-danger d-flex flex-column align-items-center justify-content-center py-5 rounded-4 shadow-sm border-0 my-4 text-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill fs-1 text-danger mb-2"></i>
          <h4 className="alert-heading fw-bold">Oops! Something went wrong</h4>
          <p className="mb-3">{error}</p>
          {onRetry && (
            <button
              type="button"
              className="btn btn-danger px-4 py-2 rounded-pill shadow-sm"
              onClick={onRetry}
            >
              <i className="bi bi-arrow-clockwise me-2"></i> Try Again
            </button>
          )}
        </div>
      )}

      {!isLoading && !error && filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-5 my-4 bg-white rounded-4 shadow-sm border p-4">
          <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
          <h4 className="fw-bold mt-3 mb-2">No products found.</h4>
          <p className="text-muted mb-3">
            We couldn't find any products matching your search or filters.
          </p>
          <button
            type="button"
            className="btn btn-outline-primary rounded-pill px-4"
            onClick={handleResetFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {!isLoading && !error && filteredAndSortedProducts.length > 0 && (
        <div className="row g-4">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={isWishlisted(product.id)}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
