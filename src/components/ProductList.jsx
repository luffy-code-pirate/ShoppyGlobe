// ProductList.jsx - Displays the full grid of products on the home page
// It fetches products using our custom hook
// It also filters products based on the search query from Redux

import React from 'react'

// useSelector reads the search query from Redux store
import { useSelector } from 'react-redux'

// Our custom hook that handles fetching products from the API
import { useFetchProducts } from '../hooks/useFetchProducts'

// selectSearchQuery gives us the current text typed in the search bar
import { selectSearchQuery } from '../redux/searchSlice'

// ProductItem is the individual card component for each product
import ProductItem from './ProductItem'

import '../styles/ProductList.css'

export default function ProductList() {

  // Call our custom hook to get products, loading state, and error state
  // The hook handles the fetch, useEffect, and state internally
  const { products, loading, error } = useFetchProducts()

  // Read the current search query from Redux
  // This updates every time the user types in the search bar in Header
  const searchQuery = useSelector(selectSearchQuery)

  // Filter products based on search query
  // We check both title and description so search is more useful
  // toLowerCase makes the search case-insensitive
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ── Step 1: Show spinner while data is loading ──
  // This must be checked FIRST before anything else
  // If we checked filteredProducts first we would briefly show wrong UI
  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner" aria-label="Loading products" />
        <p>Loading products…</p>
      </div>
    )
  }

  // ── Step 2: Show error message if fetch failed ──
  if (error) {
    return (
      <div className="state-container error-state">
        <span className="error-icon">⚠️</span>
        <h2>Could not load products</h2>
        <p>{error}</p>
        <p className="error-hint">
          Check your connection and try refreshing the page.
        </p>
      </div>
    )
  }

  // ── Step 3: Show no results message if search finds nothing ──
  // We also check products.length > 0 to make sure data actually loaded
  // Without this check it would flash this message before loading finishes
  if (products.length > 0 && filteredProducts.length === 0) {
    return (
      <div className="state-container">
        <span style={{ fontSize: '3rem' }}>🔍</span>
        <h2>No products match "{searchQuery}"</h2>
        <p>Try a different search term.</p>
      </div>
    )
  }

  // ── Step 4: Show the product grid ──
  return (
    <section className="product-list-section">

      {/* Show result count only when user has typed something */}
      {searchQuery && (
        <p className="search-results-info">
          {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      )}

      {/* Product grid — each product gets a unique key using its id */}
      {/* The key prop is required by React when rendering lists */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

    </section>
  )
}