
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';

const CART_STORAGE_KEY = 'shopease_cart';
const WISHLIST_STORAGE_KEY = 'shopease_wishlist';

function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Global Products & Categories State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Cart State (initialized from LocalStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  // Wishlist State (initialized from LocalStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
      return [];
    }
  });

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Fetch Products & Categories
  useEffect(() => {
    let ignore = false;
    async function fetchCatalog() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=0'),
          fetch('https://dummyjson.com/products/categories'),
        ]);
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        if (!ignore) {
          setProducts(productsData.products || []);
          setCategories(categoriesData || []);
          setIsLoadingProducts(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error fetching catalog', err);
          setProductsError('Unable to load products. Please try again.');
          setIsLoadingProducts(false);
        }
      }
    }
    fetchCatalog();
    return () => { ignore = true; };
  }, [retryCount]);

  const handleRetryCatalog = () => {
    setIsLoadingProducts(true);
    setProductsError(null);
    setRetryCount(c => c + 1);
  };

  // Hash‑based navigation listener (including login/register)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      if (hash === '#/' || hash === '#' || hash === '') {
        setCurrentView('home');
        setSelectedProductId(null);
      } else if (hash === '#/cart') {
        setCurrentView('cart');
        setSelectedProductId(null);
      } else if (hash === '#/wishlist') {
        setCurrentView('wishlist');
        setSelectedProductId(null);
      } else if (hash === '#/login') {
        setCurrentView('login');
        setSelectedProductId(null);
      } else if (hash === '#/register') {
        setCurrentView('register');
        setSelectedProductId(null);
      } else if (hash.startsWith('#/product/')) {
        const id = hash.replace('#/product/', '');
        if (id) {
          setSelectedProductId(id);
          setCurrentView('details');
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, productId = null) => {
    if (view === 'home') {
      window.location.hash = '#/';
    } else if (view === 'cart') {
      window.location.hash = '#/cart';
    } else if (view === 'wishlist') {
      window.location.hash = '#/wishlist';
    } else if (view === 'login') {
      window.location.hash = '#/login';
    } else if (view === 'register') {
      window.location.hash = '#/register';
    } else if (view === 'details' && productId) {
      window.location.hash = `#/product/${productId}`;
    }
    // state updates will be handled by the hash listener
  };

  // Cart Operations (unchanged)
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.title}" to cart!`, 'success');
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Removed item from cart.', 'info');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
      showToast('Cart cleared.', 'info');
    }
  };

  // Wishlist Operations
  const handleToggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.title}" from wishlist.`, 'info');
        return prev.filter(item => item.id !== product.id);
      }
      showToast(`Added "${product.title}" to wishlist!`, 'success');
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    showToast('Removed item from wishlist.', 'info');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar currentView={currentView} onNavigate={navigateTo} cartCount={totalCartCount} wishlistCount={wishlist.length} />
      <main className="flex-grow-1">
        {currentView === 'home' && (
          <Home
            products={products}
            categories={categories}
            isLoading={isLoadingProducts}
            error={productsError}
            onRetry={handleRetryCatalog}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onViewDetails={id => navigateTo('details', id)}
          />
        )}
        {currentView === 'details' && (
          <ProductDetails
            productId={selectedProductId}
            onBack={() => navigateTo('home')}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={id => wishlist.some(item => item.id === id)}
          />
        )}
        {currentView === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onContinueShopping={() => navigateTo('home')}
            onViewDetails={id => navigateTo('details', id)}
          />
        )}
        {currentView === 'wishlist' && (
          <Wishlist
            wishlist={wishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            onContinueShopping={() => navigateTo('home')}
            onViewDetails={id => navigateTo('details', id)}
          />
        )}
        {currentView === 'login' && (
          <Login onLoginSuccess={() => navigateTo('home')} />
        )}
        {currentView === 'register' && (
          <Register onRegisterSuccess={() => navigateTo('home')} />
        )}
      </main>
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <Footer />
    </div>
  );
}

export default App;
