// ProductItem.jsx - Represents a single product card in the product grid
// It shows the product image, title, rating, price and Add to Cart button
// It receives the product data as a prop from ProductList

import React from 'react'

// PropTypes is used to validate the props passed to this component
import PropTypes from 'prop-types'

// Link is used to navigate to the product detail page on click
import { Link } from 'react-router-dom'

// useDispatch lets us send actions to Redux
// useSelector lets us read data from Redux
import { useDispatch, useSelector } from 'react-redux'

// addToCart action adds this product to the cart in Redux
// selectCartItems lets us check if this product is already in the cart
import { addToCart, selectCartItems } from '../redux/cartSlice'

import '../styles/ProductItem.css'

// product prop comes from ProductList when it maps over the products array
export default function ProductItem({ product }) {

  const dispatch  = useDispatch()

  // Read all current cart items from Redux
  const cartItems = useSelector(selectCartItems)

  // Check if this specific product is already in the cart
  // We use this to change the button text and color
  const inCart = cartItems.some(item => item.id === product.id)

  // handleAddToCart - runs when user clicks the Add to Cart button
  // We only send the fields we need — not the entire product object
  function handleAddToCart() {
    dispatch(addToCart({
      id:        product.id,
      title:     product.title,
      price:     product.price,
      thumbnail: product.thumbnail,
    }))
  }

  return (
    <article className="product-card">

      {/* Clicking the image navigates to the product detail page */}
      <Link to={`/product/${product.id}`} className="product-image-link">
        {/* loading="lazy" means the image only loads when it scrolls into view */}
        {/* decoding="async" means image decoding does not block the browser */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-thumbnail"
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div className="product-info">

        {/* Category label at the top of the card */}
        <span className="product-category">{product.category}</span>

        {/* Clicking the title also navigates to product detail page */}
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>

        {/* Star rating — filled stars based on rounded rating value */}
        <div className="product-rating">
          {'★'.repeat(Math.round(product.rating))}
          {'☆'.repeat(5 - Math.round(product.rating))}
          <span className="rating-value"> {product.rating}</span>
        </div>

        <div className="product-footer">

          {/* Price display */}
          <span className="product-price">${product.price.toFixed(2)}</span>

          {/* Add to Cart button */}
          {/* If product is already in cart, button turns green and shows checkmark */}
          <button
            className={`btn-add-cart ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            {inCart ? '✓ In Cart' : '+ Add to Cart'}
          </button>

        </div>
      </div>

    </article>
  )
}

// PropTypes validation — defines what props this component expects
// This helps catch bugs when wrong data is passed to the component
ProductItem.propTypes = {
  product: PropTypes.shape({
    id:          PropTypes.number.isRequired,
    title:       PropTypes.string.isRequired,
    price:       PropTypes.number.isRequired,
    thumbnail:   PropTypes.string.isRequired,
    category:    PropTypes.string,
    rating:      PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
}