// LoadingSpinner.jsx - A simple loading indicator
// This is used in two places:
// 1. As the Suspense fallback in App.jsx while lazy components load
// 2. Inside ProductList and ProductDetail while data is being fetched

import React from 'react'

// Import its own CSS file for styling
import '../styles/LoadingSpinner.css'

export default function LoadingSpinner() {
  return (
    // Outer container centers the spinner on the page
    <div className="suspense-loader">

      {/* The spinner div is styled with CSS animation to spin */}
      <div className="spinner" aria-label="Loading…" />

      {/* Simple loading text below the spinner */}
      <p>Loading…</p>

    </div>
  )
}