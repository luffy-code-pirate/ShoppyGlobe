// CartItem.jsx - Represents a single item row inside the Cart page
// It shows the product image, title, price, quantity controls and remove button
// It receives the cart item as a prop from Cart component

import React from 'react'

// PropTypes for validating the item prop
import PropTypes from 'prop-types'

// useDispatch lets us send actions to Redux
import { useDispatch } from 'react-redux'

// These three actions handle quantity changes and removal
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/cartSlice'

import '../styles/CartItem.css'

// item prop comes from Cart component when it maps over cart items
export default function CartItem({ item }) {

  const dispatch = useDispatch()

  return (
    <li className="cart-item">

      {/* Product thumbnail image */}
      {/* loading="lazy" means image only loads when scrolled into view */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="cart-item-image"
        loading="lazy"
      />

      {/* Product name and unit price */}
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <span className="cart-item-price">${item.price.toFixed(2)} each</span>
      </div>

      {/* Quantity controls — increase and decrease buttons */}
      <div className="quantity-controls">

        {/* Decrease button — disabled when quantity is already 1 */}
        {/* This enforces the rule that quantity cannot go below 1 */}
        <button
          className="qty-btn"
          onClick={() => dispatch(decrementQuantity(item.id))}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>

        {/* Current quantity number */}
        <span className="qty-value">{item.quantity}</span>

        {/* Increase button — no upper limit */}
        <button
          className="qty-btn"
          onClick={() => dispatch(incrementQuantity(item.id))}
          aria-label="Increase quantity"
        >
          +
        </button>

      </div>

      {/* Subtotal for this item — price multiplied by quantity */}
      <span className="cart-item-subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </span>

      {/* Remove button — removes this item completely from cart */}
      <button
        className="remove-btn"
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label={`Remove ${item.title} from cart`}
      >
        🗑
      </button>

    </li>
  )
}

// PropTypes validation — defines the shape of the item prop
CartItem.propTypes = {
  item: PropTypes.shape({
    id:        PropTypes.number.isRequired,
    title:     PropTypes.string.isRequired,
    price:     PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity:  PropTypes.number.isRequired,
  }).isRequired,
}