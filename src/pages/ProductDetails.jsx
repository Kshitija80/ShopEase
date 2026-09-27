import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetails({
  productId,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) {
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        if (isMounted) {
          setProduct(data);
          setActiveImage(data.thumbnail || (data.images && data.images[0]) || '');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching product details:', err);
          setError('Unable to load product details. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (productId) {
      fetchProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger rounded-4 p-5 shadow-sm">
          <i className="bi bi-exclamation-circle-fill fs-1 text-danger mb-3"></i>
          <h4>{error || 'Product not found'}</h4>
          <p className="text-muted">The product you are looking for may have been removed or is temporarily unavailable.</p>
          <button
            type="button"
            className="btn btn-primary rounded-pill px-4 mt-2"
            onClick={onBack}
          >
            <i className="bi bi-arrow-left me-2"></i> Back to Products
          </button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="container py-4">
      {/* Back Button Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3 shadow-sm"
          onClick={onBack}
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to Products</span>
        </button>
      </nav>

      {/* Product Detail Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-3 p-md-5">
        <div className="row g-4 g-lg-5">
          {/* Images Column */}
          <div className="col-12 col-md-6">
            <div className="bg-light rounded-4 p-4 d-flex align-items-center justify-content-center mb-3" style={{ minHeight: '380px', maxHeight: '450px' }}>
              <img
                src={activeImage}
                alt={product.title}
                className="img-fluid"
                style={{ maxHeight: '360px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x300?text=No+Image';
                }}
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="d-flex gap-2 overflow-auto pb-2">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`btn p-1 bg-light rounded-3 border ${activeImage === imgUrl ? 'border-primary border-2' : 'border-light'}`}
                    style={{ width: '64px', height: '64px', flexShrink: 0 }}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="col-12 col-md-6 d-flex flex-column">
            {/* Category & Rating */}
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle text-capitalize px-3 py-2 rounded-pill">
                {product.category}
              </span>
              {product.brand && (
                <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill">
                  Brand: {product.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="h2 fw-bold text-dark mb-2">{product.title}</h1>

            {/* Rating & Stock */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="d-flex align-items-center gap-1 text-warning">
                <i className="bi bi-star-fill"></i>
                <span className="fw-bold text-dark">{product.rating ? product.rating.toFixed(1) : 'N/A'}</span>
                <span className="text-muted small">/ 5.0</span>
              </div>
              <span className="text-muted">|</span>
              <span className={`badge ${product.stock > 0 ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger'} rounded-pill px-3 py-1`}>
                <i className={`bi ${product.stock > 0 ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-1`}></i>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="display-6 fw-bold text-primary">${product.price.toFixed(2)}</span>
              {product.discountPercentage && (
                <span className="badge bg-danger ms-2 align-middle">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <h6 className="fw-bold text-dark text-uppercase small tracking-wide text-secondary">Description</h6>
              <p className="text-secondary leading-relaxed">{product.description}</p>
            </div>

            {/* Additional Info Specs if available */}
            <div className="row g-2 mb-4 p-3 bg-light rounded-3 small">
              {product.sku && (
                <div className="col-6">
                  <span className="text-muted">SKU:</span> <span className="fw-semibold">{product.sku}</span>
                </div>
              )}
              {product.warrantyInformation && (
                <div className="col-6">
                  <span className="text-muted">Warranty:</span> <span className="fw-semibold">{product.warrantyInformation}</span>
                </div>
              )}
              {product.shippingInformation && (
                <div className="col-6">
                  <span className="text-muted">Shipping:</span> <span className="fw-semibold">{product.shippingInformation}</span>
                </div>
              )}
              {product.returnPolicy && (
                <div className="col-6">
                  <span className="text-muted">Returns:</span> <span className="fw-semibold">{product.returnPolicy}</span>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="mt-auto pt-3 border-top">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="d-flex align-items-center border rounded-3 p-1 bg-white">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border-0"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="px-3 fw-bold">{quantity}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-light border-0"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= (product.stock || 99)}
                    aria-label="Increase quantity"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  className="btn btn-primary px-4 py-2 flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm"
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={product.stock <= 0}
                >
                  <i className="bi bi-cart-plus-fill fs-5"></i>
                  <span className="fw-semibold">Add to Cart</span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  className={`btn p-2 px-3 rounded-3 border ${wishlisted ? 'btn-danger text-white' : 'btn-outline-danger'}`}
                  onClick={() => onToggleWishlist(product)}
                  title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'} fs-5`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
