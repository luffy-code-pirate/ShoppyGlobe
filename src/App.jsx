// App.jsx - The root component of the application
// This file sets up all the routes using createBrowserRouter
// It also handles lazy loading of all page components

import React, { lazy, Suspense } from 'react'

// createBrowserRouter - modern way to set up routing in React Router v6
// RouterProvider - renders the router we create
// Outlet - renders the current child route inside RootLayout
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

// Header and LoadingSpinner are NOT lazy loaded
// because they are always visible on every page
import Header        from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'

// All page components are lazy loaded
// This means their code is only downloaded when the user visits that page
// This makes the initial page load much faster (code splitting)
const ProductList   = lazy(() => import('./components/ProductList'))
const ProductDetail = lazy(() => import('./components/ProductDetail'))
const Cart          = lazy(() => import('./components/Cart'))
const Checkout      = lazy(() => import('./components/Checkout'))
const NotFound      = lazy(() => import('./components/NotFound'))

// RootLayout - this wraps every single page in the app
// Header always shows at the top
// Outlet renders whatever the current page component is
// Suspense shows the LoadingSpinner while a lazy component is loading
function RootLayout() {
  return (
    <>
      {/* Navigation bar — always visible on every page */}
      <Header />

      {/* Main content area — changes based on current route */}
      <main className="main-content">

        {/* Suspense catches lazy loaded components while they load */}
        <Suspense fallback={<LoadingSpinner />}>
          {/* Outlet renders the matched child route component */}
          <Outlet />
        </Suspense>

      </main>
    </>
  )
}

// createBrowserRouter sets up all the routes for the app
// Each route maps a URL path to a component
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,  // every page is wrapped in RootLayout

    // errorElement shows when a route throws an error
    errorElement: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),

    // children are the individual pages nested inside RootLayout
    children: [
      {
        index: true,           // index means this is the default route for '/'
        element: <ProductList />
      },
      {
        path: 'product/:id',   // :id is a dynamic parameter — changes per product
        element: <ProductDetail />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: '*',             // * matches any unknown URL — shows 404 page
        element: <NotFound />
      },
    ],
  },
])

// App just renders the router — everything else flows from the router
export default function App() {
  return <RouterProvider router={router} />
}