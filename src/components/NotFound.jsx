// NotFound.jsx - The 404 page
// This shows when a user visits a URL that does not exist
// It displays the attempted URL so the user knows what went wrong

import React from 'react'

// Link is used for the go home button
import { Link, useLocation } from 'react-router-dom'

import '../styles/NotFound.css'

export default function NotFound() {

  // useLocation gives us information about the current URL
  // location.pathname is the part of the URL after the domain
  // For example if user visits /random-page then pathname is /random-page
  const location = useLocation()

  return (
    <div className="not-found">
      <div className="not-found-content">

        {/* Large 404 number */}
        <span className="not-found-code">404</span>

        {/* Main heading */}
        <h1 className="not-found-title">Page Not Found</h1>

        {/* Description message */}
        <p className="not-found-message">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        {/* Show the URL the user tried to visit */}
        {/* This is the error detail required by the project */}
        <div className="not-found-detail">
          <strong>Requested URL:</strong>
          <code>{location.pathname}</code>
        </div>

        {/* Action buttons */}
        <div className="not-found-actions">

          {/* Go to home page */}
          <Link to="/" className="btn-primary">
            🏠 Go to Home
          </Link>

          {/* Go back to previous page using browser history */}
          <button
            className="btn-secondary"
            onClick={() => window.history.back()}
          >
            ← Go Back
          </button>

        </div>
      </div>
    </div>
  )
}