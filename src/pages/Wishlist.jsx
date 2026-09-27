import React from 'react';

function Wishlist({
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onContinueShopping,
  onViewDetails
}) {
  if (wishlist.length === 0) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div className="mb-4">
            <span className="badge bg-light p-4 rounded-circle border">
              <i className="bi bi-heart text-muted" style={{ fontSize: '3.5rem' }}></i>
            </span>
          </div>
          <h2 className="fw-bold text-dark mb-2">Your wishlist is empty.</h2>
          <p className="text-secondary mb-4">
            Save items that you like and want to buy later by clicking the heart icon on any product!
          </p>
          <div>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
              onClick={onContinueShopping}
            >
              <i className="bi bi-compass me-2"></i> Discover Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Page Title */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">My Wishlist</h1>
          <p className="text-muted small mb-0">
            You have <strong className="text-dark">{wishlist.length}</strong> saved {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm rounded-pill px-3"
          onClick={onContinueShopping}
        >
          <i className="bi bi-arrow-left me-1"></i> Continue Shopping
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="row g-4">
        {wishlist.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card product-card rounded-3 shadow-sm position-relative">
              {/* Remove from Wishlist button */}
              <button
                type="button"
                className="wishlist-btn active text-danger"
                onClick={() => onRemoveFromWishlist(product.id)}
                title="Remove from Wishlist"
                aria-label="Remove from Wishlist"
              >
                <i className="bi bi-heart-fill"></i>
              </button>

              {/* Product Image */}
              <div
                className="product-img-container"
                style={{ cursor: 'pointer' }}
                onClick={() => onViewDetails(product.id)}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x200?text=No+Image';
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="card-body d-flex flex-column p-3">
                <span className="badge bg-light text-primary border border-primary-subtle text-capitalize px-2 py-1 align-self-start mb-2">
                  {product.category}
                </span>

                <h5
                  className="card-title fs-6 fw-bold mb-1 text-truncate"
                  title={product.title}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onViewDetails(product.id)}
                >
                  {product.title}
                </h5>

                <div className="mt-auto pt-2">
                  <div className="fs-5 fw-bold text-dark mb-3">
                    ${product.price.toFixed(2)}
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2 py-2"
                      onClick={() => {
                        onAddToCart(product);
                      }}
                    >
                      <i className="bi bi-cart-plus"></i>
                      <span>Move to Cart</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm py-1"
                      onClick={() => onViewDetails(product.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
