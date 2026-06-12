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

---

## Notes

- `node_modules` has been excluded from submission
- All components use lazy loading via `React.lazy`
- Quantity cannot go below 1 in the cart
- Placing an order clears the cart and redirects to Home after 3 seconds
