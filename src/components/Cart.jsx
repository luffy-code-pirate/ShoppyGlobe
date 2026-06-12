// Cart.jsx - The shopping cart page
// Shows all items the user has added to the cart
// Has an order summary panel with total price and checkout button

import React from 'react'

// Link is used for the checkout and continue shopping buttons
import { Link } from 'react-router-dom'

// useSelector reads cart data from Redux store
import { useSelector } from 'react-redux'

// selectCartItems gives us the array of cart items
// selectCartTotal gives us the total price of all items
import { selectCartItems, selectCartTotal } from '../redux/cartSlice'

// CartItem is the individual row component for each cart item
import CartItem from './CartItem'

import '../styles/Cart.css'

export default function Cart() {

  // Read cart items and total price from Redux store
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  // ── Empty cart state ──
  // If there are no items show a friendly message with a link to shop
  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Browse our products and add something you like!</p>
        <Link to="/" className="btn-primary">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">

      <h1 className="cart-title">Shopping Cart</h1>

      {/* Show how many items are in the cart */}
      <p className="cart-subtitle">
        {items.length} item{items.length !== 1 ? 's' : ''}
      </p>

      <div className="cart-layout">

        {/* ── Left side: List of cart items ── */}
        {/* Each CartItem gets a unique key using the product id */}
        {/* The key prop is required by React for all list items */}
        <ul className="cart-list">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        {/* ── Right side: Order summary panel ── */}
        <aside className="cart-summary">
          <h2>Order Summary</h2>

          {/* Subtotal row */}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Shipping row — always free */}
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-tag">FREE</span>
          </div>

          {/* Total row — same as subtotal since shipping is free */}
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Button to go to checkout page */}
          <Link to="/checkout" className="btn-primary btn-checkout">
            Proceed to Checkout
          </Link>

          {/* Link to go back to shopping */}
          <Link to="/" className="continue-link">
            ← Continue Shopping
          </Link>

        </aside>
      </div>
    </div>
  )
}