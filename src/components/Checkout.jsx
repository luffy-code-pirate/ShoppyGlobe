// Checkout.jsx - The checkout page
// Has a form to collect user details and a summary of cart items
// When order is placed it clears the cart and redirects to home

import React, { useState } from 'react'

// useSelector reads cart data from Redux
// useDispatch lets us send actions to Redux
import { useSelector, useDispatch } from 'react-redux'

// useNavigate lets us redirect to home after order is placed
import { useNavigate } from 'react-router-dom'

// selectCartItems gives us the array of cart items
// selectCartTotal gives us the total price
// clearCart empties the cart after order is placed
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from '../redux/cartSlice'

import '../styles/Checkout.css'

export default function Checkout() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Read cart items and total from Redux
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  // orderPlaced tracks whether the user has clicked Place Order
  // When true we show the success screen instead of the form
  const [orderPlaced, setOrderPlaced] = useState(false)

  // form state holds all the input field values
  // Each field matches the name attribute of its input element
  const [form, setForm] = useState({
    name:    '',
    email:   '',
    address: '',
    city:    '',
    zip:     '',
    card:    '',
  })

  // handleChange - runs every time user types in any input field
  // e.target.name tells us which field changed
  // e.target.value is the new value
  // We spread the previous form state and only update the changed field
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // handlePlaceOrder - runs when user submits the form
  // e.preventDefault stops the browser from refreshing the page
  // We set orderPlaced to true to show the success screen
  // We dispatch clearCart to empty the cart in Redux
  // We use setTimeout to wait 3 seconds then redirect to home
  function handlePlaceOrder(e) {
    e.preventDefault()
    setOrderPlaced(true)
    dispatch(clearCart())
    setTimeout(() => navigate('/'), 3000)
  }

  // ── Empty cart state ──
  // If cart is empty and no order was placed, show message
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="state-container">
        <span style={{ fontSize: '3rem' }}>🛒</span>
        <h2>Your cart is empty</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Go Shopping
        </button>
      </div>
    )
  }

  // ── Order success screen ──
  // Shows after user clicks Place Order
  // Progress bar animates for 3 seconds then redirects to home
  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-icon">✅</div>
        <h1>Order Placed!</h1>
        <p>Thank you for your purchase.</p>
        <p>Redirecting you to the home page…</p>

        {/* Animated progress bar showing the 3 second redirect countdown */}
        <div className="redirect-bar">
          <div className="redirect-progress" />
        </div>

      </div>
    )
  }

  // ── Main checkout page ──
  return (
    <div className="checkout-page">

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">

        {/* ── Left side: Checkout form ── */}
        {/* onSubmit handles form submission — not onClick on the button */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>

          <h2>Delivery Details</h2>

          {/* Full name input */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>

          {/* Email input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </div>

          {/* Street address input */}
          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main Street"
              required
            />
          </div>

          {/* City and ZIP code side by side */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="Mumbai"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">PIN / ZIP</label>
              <input
                id="zip"
                name="zip"
                type="text"
                value={form.zip}
                onChange={handleChange}
                placeholder="400001"
                required
              />
            </div>
          </div>

          <h2>Payment</h2>

          {/* Card number input — dummy, not real payment */}
          <div className="form-group">
            <label htmlFor="card">Card Number (dummy)</label>
            <input
              id="card"
              name="card"
              type="text"
              value={form.card}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
          </div>

          {/* Place Order button — submits the form */}
          <button type="submit" className="btn-primary btn-place-order">
            Place Order — ${total.toFixed(2)}
          </button>

        </form>

        {/* ── Right side: Cart summary ── */}
        <aside className="checkout-summary">

          <h2>Your Order ({items.length} items)</h2>

          {/* List of items in cart — each gets unique key */}
          <ul className="checkout-item-list">
            {items.map(item => (
              <li key={item.id} className="checkout-item">

                {/* Item thumbnail */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                />

                {/* Item name and quantity */}
                <div className="checkout-item-info">
                  <span className="checkout-item-name">{item.title}</span>
                  <span className="checkout-item-qty">Qty: {item.quantity}</span>
                </div>

                {/* Item subtotal */}
                <span className="checkout-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

              </li>
            ))}
          </ul>

          {/* Total price at the bottom */}
          <div className="checkout-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

        </aside>
      </div>
    </div>
  )
}