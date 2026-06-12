# ShoppyGlobe 🛍️

A feature-rich e-commerce application built with React + Vite.

**GitHub Repository:** https://github.com/luffy-code-pirate/ShoppyGlobe

---

## Tech Stack

- **React 18** with functional components and hooks
- **Vite** — fast build tooling
- **Redux Toolkit** — cart state + search filter
- **React Router v6** — `createBrowserRouter` with dynamic routes
- **PropTypes** — prop validation

---

## Features

| Feature | Details |
|---|---|
| Product listing | Fetched from `dummyjson.com/products` via custom hook |
| Product detail | Dynamic route `/product/:id` |
| Shopping cart | Add / remove / adjust quantity (min 1) |
| Search | Redux-powered real-time filter |
| Checkout | Dummy form → order confirmation → redirect |
| 404 page | Custom NotFound with URL display |
| Lazy loading | `React.lazy` + `Suspense` on all pages; `loading="lazy"` on all images |
| Responsive | Works on mobile, tablet, and desktop |
| Error handling | Graceful fallback UI on API failures |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Nav + search + cart badge
│   ├── ProductList.jsx     # Product grid (filtered by Redux search)
│   ├── ProductItem.jsx     # Single product card
│   ├── ProductDetail.jsx   # Full product page (dynamic route)
│   ├── Cart.jsx            # Cart page with summary
│   ├── CartItem.jsx        # Single cart row with qty controls
│   ├── Checkout.jsx        # Form + order placement
│   ├── NotFound.jsx        # 404 page
│   └── LoadingSpinner.jsx  # Suspense fallback
├── hooks/
│   └── useFetchProducts.js # Custom hook for product fetching
├── redux/
│   ├── store.js            # Redux store config
│   ├── cartSlice.js        # Cart actions + reducers + selectors
│   └── searchSlice.js      # Search query state
├── styles/                 # Component-scoped CSS files
├── App.jsx                 # Router setup with createBrowserRouter
└── main.jsx                # Entry point with Redux Provider
```
### Build for Production

```bash
npm run build
npm run preview
```

---

## 📋 Project Requirements Checklist

### Component Structure
- [x] App — main component with routing
- [x] Header — navigation with search and cart badge
- [x] ProductList — product grid with search filter
- [x] ProductItem — single product card with Add to Cart
- [x] ProductDetail — full product page with dynamic route
- [x] Cart — cart page with modify and remove options
- [x] CartItem — single cart row with quantity controls
- [x] NotFound — 404 page with error details and attempted URL
- [x] Checkout — form with order summary and Place Order button

### Props
- [x] Props used to pass data from parent to child components
- [x] PropTypes validation on ProductItem and CartItem

### Data Fetching
- [x] Custom hook useFetchProducts with useEffect for ProductList
- [x] useEffect in ProductDetail to fetch by route parameter
- [x] Error handling UI for failed API requests in both components

### State Management
- [x] Redux Toolkit with cartSlice and searchSlice
- [x] Actions, reducers and selectors for cart management
- [x] Search feature implemented using Redux state

### Event Handling
- [x] Add to Cart button in ProductItem
- [x] Remove button in CartItem
- [x] Quantity adjustment with minimum of 1 enforced
- [x] All cart operations implemented through Redux

### React Routing
- [x] createBrowserRouter used for routing
- [x] Routes for Home, Product Detail, Cart and Checkout
- [x] Dynamic route parameter used for product detail

### React Lists
- [x] Unique key on every product in ProductList
- [x] Unique key on every item in Cart and Checkout

### Performance
- [x] React.lazy and Suspense on all page components
- [x] loading="lazy" on all images throughout the app

### Styling
- [x] CSS applied to all components
- [x] Responsive design for mobile, tablet and desktop


---

## Notes

- `node_modules` has been excluded from submission
- All components use lazy loading via `React.lazy`
- Quantity cannot go below 1 in the cart
- Placing an order clears the cart and redirects to Home after 3 seconds


---

## 👤 Author

**Prahlad Jha**
GitHub — https://github.com/luffy-code-pirate
