import React from 'react';

function Cart({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onContinueShopping,
  onViewDetails
}) {
  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const orderTotal = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div className="mb-4">
            <span className="badge bg-light p-4 rounded-circle border">
              <i className="bi bi-cart-x text-muted" style={{ fontSize: '3.5rem' }}></i>
            </span>
          </div>
          <h2 className="fw-bold text-dark mb-2">Your cart is empty.</h2>
          <p className="text-secondary mb-4">
            Looks like you haven't added anything to your cart yet. Explore our wide selection of products!
          </p>
          <div>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
              onClick={onContinueShopping}
            >
              <i className="bi bi-bag-plus me-2"></i> Start Shopping
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
          <h1 className="h2 fw-bold text-dark mb-1">Shopping Cart</h1>
          <p className="text-muted small mb-0">
            You have <strong className="text-dark">{totalItems}</strong> {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm rounded-pill px-3"
          onClick={onClearCart}
        >
          <i className="bi bi-trash3 me-1"></i> Clear Cart
        </button>
      </div>

      <div className="row g-4">
        {/* Cart Items List / Table */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light text-secondary small text-uppercase">
                  <tr>
                    <th scope="col" className="ps-4 py-3" style={{ minWidth: '220px' }}>Product</th>
                    <th scope="col" className="py-3 text-center">Price</th>
                    <th scope="col" className="py-3 text-center" style={{ minWidth: '130px' }}>Quantity</th>
                    <th scope="col" className="py-3 text-center">Subtotal</th>
                    <th scope="col" className="pe-4 py-3 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const itemSubtotal = item.price * item.quantity;
                    return (
                      <tr key={item.id} className="border-bottom">
                        {/* Product Info */}
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="rounded-3 bg-light border p-1"
                              style={{ width: '60px', height: '60px', objectFit: 'contain', cursor: 'pointer' }}
                              onClick={() => onViewDetails(item.id)}
                            />
                            <div>
                              <h6
                                className="mb-0 fw-semibold text-dark text-truncate"
                                style={{ maxWidth: '200px', cursor: 'pointer' }}
                                title={item.title}
                                onClick={() => onViewDetails(item.id)}
                              >
                                {item.title}
                              </h6>
                              <span className="badge bg-light text-muted border text-capitalize small">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="text-center py-3 fw-medium">
                          ${item.price.toFixed(2)}
                        </td>

                        {/* Quantity Controls */}
                        <td className="text-center py-3">
                          <div className="d-inline-flex align-items-center border rounded-3 bg-white p-1">
                            <button
                              type="button"
                              className="btn btn-sm btn-light border-0 px-2 py-0"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              title={item.quantity === 1 ? 'Remove from cart' : 'Decrease quantity'}
                              aria-label="Decrease quantity"
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <span className="px-2 fw-bold text-dark small" style={{ minWidth: '24px' }}>
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="btn btn-sm btn-light border-0 px-2 py-0"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              title="Increase quantity"
                              aria-label="Increase quantity"
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td className="text-center py-3 fw-bold text-primary">
                          ${itemSubtotal.toFixed(2)}
                        </td>

                        {/* Remove Action */}
                        <td className="pe-4 py-3 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm border-0 rounded-circle"
                            onClick={() => onRemoveFromCart(item.id)}
                            title="Remove product"
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-light d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none text-secondary d-flex align-items-center gap-1"
                onClick={onContinueShopping}
              >
                <i className="bi bi-arrow-left"></i> Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '80px' }}>
            <h4 className="fw-bold mb-3 text-dark">Order Summary</h4>

            <div className="d-flex justify-content-between mb-2 text-secondary">
              <span>Subtotal ({totalItems} items)</span>
              <span className="fw-semibold text-dark">${subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2 text-secondary">
              <span>Shipping</span>
              <span className="text-success fw-semibold">FREE</span>
            </div>

            <div className="d-flex justify-content-between mb-3 text-secondary">
              <span>Estimated Tax</span>
              <span className="fw-semibold text-dark">$0.00</span>
            </div>

            <hr className="my-3" />

            <div className="d-flex justify-content-between align-items-baseline mb-4">
              <span className="fs-5 fw-bold text-dark">Total</span>
              <span className="fs-4 fw-bold text-primary">${orderTotal.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3"
              onClick={() => alert('Order Placed Successfully! Thank you for shopping with ShopEase.')}
            >
              <i className="bi bi-shield-lock-fill"></i>
              <span>Proceed to Checkout</span>
            </button>

            <div className="text-center small text-muted">
              <i className="bi bi-shield-check text-success me-1"></i> Secure 256-bit SSL encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
