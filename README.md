# 🛒 ShopEase – Responsive E-Commerce Web Application

ShopEase is a responsive e-commerce web application built using **React.js, JavaScript, HTML5, CSS3, and Bootstrap**. It provides a simple and user-friendly shopping experience with product browsing, searching, filtering, sorting, product details, cart management, and wishlist functionality.

## 🌐 Live Demo

🔗 **[ShopEase – Live Website](https://shopease-seven-silk.vercel.app/)**

## 📌 Features

- 🏠 Responsive and user-friendly home page
- 🔍 Product search functionality
- 🗂️ Product category filtering
- ↕️ Product sorting
- 📦 Product details page
- 🛒 Add to cart and manage cart items
- ❤️ Wishlist functionality
- 💾 LocalStorage for cart and wishlist persistence
- 🔗 REST API integration for product data
- 📱 Responsive design for desktop, tablet, and mobile devices
- ♻️ Reusable React components

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Bootstrap

### Data & Storage

- REST API
- LocalStorage

### Development Tools

- Vite
- Visual Studio Code
- Git & GitHub
- Vercel

## 📂 Project Structure

```text
ShopEase/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

> The exact folder structure may vary depending on the implementation.

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/ShopEase.git
```

### 2. Navigate to the project directory

```bash
cd ShopEase
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will run locally at:

```text
http://localhost:5173
```

## 🚀 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## ☁️ Deployment

The application is deployed using **Vercel**.

### Live URL

🔗 https://shopease-seven-silk.vercel.app/

The project can also be connected to GitHub so that new changes pushed to the repository can be automatically deployed through Vercel.

## 🛒 Main Functionalities

### Product Search

Users can search for products using keywords to quickly find the products they are interested in.

### Category Filtering

Products can be filtered according to their categories, making it easier to browse the available products.

### Product Sorting

Users can sort products according to the available sorting options.

### Product Details

Users can view detailed information about an individual product before adding it to the cart.

### Shopping Cart

Users can:

- Add products to the cart
- Increase or decrease product quantity
- Remove products
- View the total cart value

### Wishlist

Users can add products to their wishlist and manage their saved products.

### LocalStorage

LocalStorage is used to preserve cart and wishlist information even after refreshing or reopening the browser.

## 📱 Responsive Design

ShopEase is designed to work across different screen sizes, including:

- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

## 🔌 API Integration

ShopEase uses a REST API to retrieve product information dynamically instead of storing all product data directly inside the application.

The fetched data is displayed through reusable React components.

## 🎯 Project Objectives

The main objectives of ShopEase are:

1. To develop a responsive e-commerce web application.
2. To understand React.js component-based development.
3. To implement product search, filtering, and sorting.
4. To implement cart and wishlist management.
5. To understand REST API integration.
6. To use browser LocalStorage for data persistence.
7. To deploy a React application using Vercel.
8. To gain practical experience with Git and GitHub.

## 🔮 Future Enhancements

The following features can be added in future versions:

- 🔐 User authentication and registration
- 💳 Online payment integration
- 📦 Order management and order history
- 👤 User profile
- ⭐ Product reviews and ratings
- 🛍️ Admin dashboard
- 📊 Sales analytics
- 🔔 Order notifications
- 🗄️ Backend database integration
