import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 border-top">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <h5 className="fw-bold mb-1 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <span className="badge bg-primary p-1 rounded-2">
                <i className="bi bi-bag-check-fill text-white"></i>
              </span>
              Shop<span className="text-primary">Ease</span>
            </h5>
            <p className="text-secondary small mb-0">
              Discover products and shop with ease. Built with React, Vite & Bootstrap.
            </p>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <p className="text-secondary small mb-0">
              &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
            <div className="text-muted small mt-1">
              Data powered by DummyJSON REST API
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
