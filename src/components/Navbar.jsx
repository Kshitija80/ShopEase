import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar({ currentView, onNavigate, cartCount, wishlistCount }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { user, logout } = useContext(AuthContext);

  const handleToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleLinkClick = (view) => {
    setIsNavCollapsed(true);
    onNavigate(view);
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-2">
      <div className="container">
        {/* Brand */}
        <a
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-white text-decoration-none"
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
        >
          <span className="badge bg-primary p-2 rounded-3">
            <i className="bi bi-bag-check-fill text-white"></i>
          </span>
          <span>Shop<span className="text-primary">Ease</span></span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={handleToggle}
          aria-controls="shopEaseNavbar"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="shopEaseNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <a
                className={`nav-link px-3 ${currentView === 'home' ? 'active text-primary fw-bold' : 'text-light'}`}
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('home');
                }}
              >
                <i className="bi bi-house-door me-1"></i> Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link px-3 position-relative ${currentView === 'wishlist' ? 'active text-primary fw-bold' : 'text-light'}`}
                href="#/wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('wishlist');
                }}
              >
                <i className="bi bi-heart me-1"></i> Wishlist
                {wishlistCount > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1">{wishlistCount}</span>
                )}
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link px-3 position-relative ${currentView === 'cart' ? 'active text-primary fw-bold' : 'text-light'}`}
                href="#/cart"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('cart');
                }}
              >
                <i className="bi bi-cart3 me-1"></i> Cart
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-primary ms-1">{cartCount}</span>
                )}
              </a>
            </li>

            {/* Authentication Links */}
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  id="userMenu"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i> {user.username}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-1"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className={`nav-link px-3 ${currentView === 'login' ? 'active text-primary fw-bold' : 'text-light'}`}
                    href="#/login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('login');
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link px-3 ${currentView === 'register' ? 'active text-primary fw-bold' : 'text-light'}`}
                    href="#/register"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('register');
                    }}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
