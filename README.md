# ShopEase – Responsive E-Commerce Web Application

**ShopEase** is a modern, responsive e-commerce web application built using **React.js**, **Vite**, and **Bootstrap 5**. The application fetches live product catalogs from the **DummyJSON Products API** and provides an intuitive, high-performance shopping experience complete with dynamic search, category filtering, price/name sorting, detailed product specification pages, cart management with quantity controls, wishlist tracking, and complete client-side persistence using **Browser LocalStorage**.

Designed and structured for a student portfolio and placement resume, ShopEase demonstrates clean modular architecture, modern React functional components and hooks (`useState`, `useEffect`, `useMemo`), responsive design principles, and robust error/loading handling.

---

## Live Demo

[Live Demo](ADD_VERCEL_URL_HERE)

## GitHub Repository

[GitHub Repository](ADD_GITHUB_URL_HERE)

---

## Features

- **Product Listing**: Fetches and renders live product data from DummyJSON REST API in a responsive grid.
- **Product Search**: Real-time instant search by product title using JavaScript array methods (`filter()`, `toLowerCase()`, `includes()`) with clear controls and an empty results state.
- **Category Filtering**: Dynamic category dropdown fetched from the REST API (`All Categories` + category list) to filter products seamlessly.
- **Product Sorting**: Sort catalog by default, Price: Low to High, Price: High to Low, and Name: A to Z without mutating the original state array.
- **Product Details**: Dedicated product overview page displaying high-resolution gallery thumbnails, title, brand, category, description, price with discounts, star rating, stock availability, specifications (SKU, warranty, shipping, return policy), and instant "Back to Products" navigation.
- **Cart Management (CRUD)**:
  - Add items to cart from the catalog grid or product details view.
  - Increase and decrease product quantities with instant subtotal and total price updates.
  - Automatic removal when quantity drops to zero, plus dedicated item deletion.
  - Order summary breakdown with subtotal, free shipping, tax, and order total.
  - Informative empty cart state with a quick call-to-action button.
- **Wishlist**:
  - Save favorite products with duplicate prevention.
  - Interactive heart button toggling on cards and product details.
  - Dedicated Wishlist view to review saved items and move them directly to the cart.
  - Real-time wishlist item badge in the navigation bar.
- **LocalStorage Persistence**:
  - Cart persisted under `shopease_cart`.
  - Wishlist persisted under `shopease_wishlist`.
  - Data remains intact across browser reloads and sessions.
- **REST API Integration**: Seamless consumption of DummyJSON endpoints with loading spinners and friendly error recovery states.
- **Responsive Design**: Fully responsive layout tailored for Desktop (4 columns), Tablet (2–3 columns), and Mobile (1 column) screens with a collapsible mobile navigation menu.

---

## Technologies Used

- **React.js (v19)**: Component-based UI library utilizing functional components and hooks.
- **JavaScript (ES6+)**: Modern JavaScript features including destructuring, spread operators, promises, async/await, and array methods.
- **HTML5**: Semantic web structure, accessible landmarks, and form elements.
- **CSS3**: Custom card hover effects, smooth transitions, badges, and layout styling.
- **Bootstrap (v5.3) & Bootstrap Icons**: Responsive grid system, navbar collapse behavior, utility classes, and iconography.
- **REST API**: Live asynchronous HTTP data fetching from DummyJSON.
- **Browser LocalStorage**: Client-side storage for maintaining cart and wishlist state across sessions.
- **Vite**: Ultra-fast next-generation frontend development server and bundler.
- **Git**: Version control system for tracking code changes.
- **GitHub**: Remote repository hosting and collaboration.
- **Vercel**: Recommended cloud deployment platform for static React/Vite builds.

---

## Installation and Setup

To run ShopEase locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (bundled with Node.js)

### Steps

1. **Clone the repository:**
   ```bash
   git clone ADD_GITHUB_URL_HERE
   cd Shopease
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

---

## Production Build

To generate an optimized, minified production build:

```bash
npm run build
```

To locally preview the generated production build:

```bash
npm run preview
```

---

## Project Structure

```
Shopease/
├── index.html                   # HTML5 entry template with viewport configuration and title
├── package.json                 # Project dependencies, scripts, and metadata
├── vite.config.js               # Vite bundler configuration
│
└── src/
    ├── main.jsx                 # Application entry point mounting React root & Bootstrap
    ├── App.jsx                  # Root component with state management, routing, & LocalStorage
    ├── index.css                # Custom styles, transitions, card hover effects, & variables
    │
    ├── components/
    │   ├── Navbar.jsx           # Responsive Bootstrap navbar with brand, links & badge counts
    │   ├── ProductCard.jsx      # Card displaying image, rating, category, title, price, actions
    │   ├── SearchBar.jsx        # Real-time search input with clear trigger
    │   ├── CategoryFilter.jsx   # Category selection dropdown populated from API
    │   ├── SortDropdown.jsx     # Sort dropdown for price and name ordering
    │   ├── LoadingSpinner.jsx   # Accessible loading spinner with custom messaging
    │   ├── Toast.jsx            # Non-intrusive action feedback alerts
    │   └── Footer.jsx           # Clean footer with branding and project credits
    │
    └── pages/
        ├── Home.jsx             # Hero banner, search/filter/sort toolbar, and product grid
        ├── ProductDetails.jsx   # Single product view with specs, gallery, and quantity stepper
        ├── Cart.jsx             # Cart table, quantity controls, subtotal/total calculations
        └── Wishlist.jsx         # Saved items catalog with move-to-cart actions
```

---

## API

This project uses the public [DummyJSON Products API](https://dummyjson.com/):

- **Products Catalog**: `https://dummyjson.com/products?limit=0`
- **Product Categories**: `https://dummyjson.com/products/categories`
- **Product Details by ID**: `https://dummyjson.com/products/{id}`

---

## Key Learning Outcomes

1. **React State Management**: Effectively combining `useState` and `useEffect` to manage application state and side effects.
2. **REST API Integration**: Executing asynchronous API calls using `fetch`, handling loading spinners, error alerts, and response parsing.
3. **Derived State & Array Methods**: Utilizing `filter()`, `map()`, `reduce()`, and `sort()` to manipulate data streams without mutating the original state.
4. **Browser LocalStorage**: Reading and writing JSON state objects to persist data through page reloads and browser sessions.
5. **Component Reusability & Props**: Building modular, self-contained UI components that communicate via typed props and event callbacks.
6. **Responsive Web Design**: Implementing fluid Bootstrap grid layouts (`col-12`, `col-sm-6`, `col-md-4`, `col-lg-3`) that adapt smoothly across mobile, tablet, and desktop viewports.
7. **Production Optimization**: Configuring Vite builds for fast bundle chunking and minification ready for deployment on platforms like Vercel.

---

## Future Enhancements

The following features can be added in subsequent iterations:

- User authentication (Sign Up / Sign In / JWT auth)
- Cloud database integration (e.g., Firebase, Supabase, MongoDB)
- Checkout integration and payment gateway (Stripe, Razorpay, or PayPal)
- Order history and past purchases tracking
- User profiles and shipping address management
- Dedicated backend API service (Node.js/Express)
