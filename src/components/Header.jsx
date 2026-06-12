// Header.jsx - The navigation bar shown at the top of every page
// It contains the logo, search bar, and cart icon with item count badge

import React from 'react'

// Link is used for navigation without page refresh
// useNavigate lets us programmatically navigate to a route
import { Link, useNavigate } from 'react-router-dom'

// useSelector reads data from Redux store
// useDispatch lets us send actions to Redux store
import { useSelector, useDispatch } from 'react-redux'

// selectCartCount tells us how many items are in the cart
import { selectCartCount } from '../redux/cartSlice'

// setSearchQuery updates the search text in Redux
// selectSearchQuery reads the current search text from Redux
import { setSearchQuery, selectSearchQuery } from '../redux/searchSlice'

import '../styles/Header.css'

export default function Header() {

  // Read the total cart item count from Redux store
  // This number shows in the badge on the cart icon
  const cartCount   = useSelector(selectCartCount)

  // Read the current search query from Redux store
  // We use this to keep the input in sync with Redux state
  const searchQuery = useSelector(selectSearchQuery)

  // useDispatch gives us the dispatch function
  // We use it to send actions to Redux
  const dispatch = useDispatch()

  // useNavigate gives us the navigate function
  // We use it to send the user to home page when they search
  const navigate = useNavigate()

  // handleSearch - runs every time the user types in the search box
  // It dispatches the new search text to Redux
  // It also navigates to home page so the filtered results are visible
  function handleSearch(e) {
    dispatch(setSearchQuery(e.target.value))
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo — clicking it goes back to home page */}
        <Link to="/" className="logo">
          <span className="logo-globe">🛍️</span>
          <span className="logo-text">ShoppyGlobe</span>
        </Link>

        {/* Search bar — value is controlled by Redux state */}
        {/* onChange dispatches new query to Redux on every keystroke */}
        <div className="search-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Search products…"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search products"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Navigation links */}
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>

          {/* Cart link shows a badge with item count when cart is not empty */}
          <Link to="/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>

            {/* Only show the badge if there are items in the cart */}
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  )
}