import React from 'react';

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onViewDetails
}) {
  const { id, title, price, description, category, thumbnail, rating } = product;

  return (
    <div className="card product-card rounded-3 shadow-sm position-relative">
      {/* Wishlist Button */}
      <button
        type="button"
        className={`wishlist-btn ${isWishlisted ? 'active text-danger' : 'text-secondary'}`}
        onClick={() => onToggleWishlist(product)}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}`}></i>
      </button>

      {/* Product Image */}
      <div
        className="product-img-container"
        style={{ cursor: 'pointer' }}
        onClick={() => onViewDetails(id)}
      >
        <img
          src={thumbnail}
          alt={title}
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
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-light text-primary border border-primary-subtle text-capitalize px-2 py-1">
            {category}
          </span>
          {rating && (
            <div className="rating-stars d-flex align-items-center gap-1">
              <i className="bi bi-star-fill text-warning"></i>
              <span className="small text-secondary fw-semibold">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h5
          className="card-title fs-6 fw-bold mb-1 text-truncate"
          title={title}
          style={{ cursor: 'pointer' }}
          onClick={() => onViewDetails(id)}
        >
          {title}
        </h5>

        {/* Short Description */}
        <p className="card-text text-muted small text-truncate-2 mb-3">
          {description}
        </p>

        {/* Price & Actions pinned to bottom */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-baseline mb-3">
            <span className="fs-5 fw-bold text-dark">${price.toFixed(2)}</span>
          </div>

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2 py-2"
              onClick={() => onAddToCart(product)}
            >
              <i className="bi bi-cart-plus"></i>
              <span>Add to Cart</span>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm py-1"
              onClick={() => onViewDetails(id)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
