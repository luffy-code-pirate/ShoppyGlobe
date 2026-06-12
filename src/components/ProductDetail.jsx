// ProductDetail.jsx - Shows full details of a single product
// The product id comes from the URL using useParams
// It fetches the product data when the component mounts using useEffect

import React, { useState, useEffect } from 'react'

// useParams reads the dynamic :id from the URL
// useNavigate lets us go back or redirect programmatically
import { useParams, useNavigate } from 'react-router-dom'

// useDispatch and useSelector for Redux cart operations
import { useDispatch, useSelector } from 'react-redux'

// addToCart adds this product to cart
// selectCartItems lets us check if product is already in cart
import { addToCart, selectCartItems } from '../redux/cartSlice'

import '../styles/ProductDetail.css'

export default function ProductDetail() {

  // Get the product id from the URL
  // For example if URL is /product/5 then id will be "5"
  const { id }   = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Read cart items to check if this product is already added
  const cartItems = useSelector(selectCartItems)

  // State for the fetched product data
  const [product,   setProduct]   = useState(null)

  // State for loading and error
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  // State to track which image is currently shown in the gallery
  const [activeImg, setActiveImg] = useState(0)

  // useEffect fetches the product whenever the id in the URL changes
  // The [id] dependency array means it re-runs if user navigates
  // to a different product detail page
  useEffect(() => {

    // AbortController cancels the fetch if user leaves the page
    const controller = new AbortController()

    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)

        // Fetch single product by its id from the API
        const res = await fetch(
          `https://dummyjson.com/products/${id}`,
          { signal: controller.signal }
        )

        // If product not found or server error, throw an error
        if (!res.ok) throw new Error(`Product not found (status ${res.status})`)

        const data = await res.json()

        // Store the fetched product in state
        setProduct(data)

      } catch (err) {
        // Ignore abort errors — they happen when user leaves page
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch product details.')
        }
      } finally {
        // Always set loading to false when done — success or fail
        setLoading(false)
      }
    }

    fetchProduct()

    // Cleanup — cancel the fetch if component unmounts
    return () => controller.abort()

  }, [id])

  // Check if this product is already in the cart
  const inCart = cartItems.some(item => item.id === product?.id)

  // handleAddToCart - dispatches addToCart action with product details
  function handleAddToCart() {
    if (!product) return
    dispatch(addToCart({
      id:        product.id,
      title:     product.title,
      price:     product.price,
      thumbnail: product.thumbnail,
    }))
  }

  // ── Step 1: Show spinner while loading ──
  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner" />
        <p>Loading product details…</p>
      </div>
    )
  }

  // ── Step 2: Show error if fetch failed ──
  if (error) {
    return (
      <div className="state-container error-state">
        <span className="error-icon">⚠️</span>
        <h2>Failed to load product</h2>
        <p>{error}</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          ← Back to Products
        </button>
      </div>
    )
  }

  // Use product images array if available, otherwise use thumbnail
  const images = product.images?.length ? product.images : [product.thumbnail]

  // ── Step 3: Show full product detail ──
  return (
    <div className="product-detail">

      {/* Back button — goes to previous page in browser history */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-layout">

        {/* ── Left side: Image gallery ── */}
        <div className="detail-gallery">

          {/* Main large image — changes when thumbnail is clicked */}
          <img
            src={images[activeImg]}
            alt={product.title}
            className="detail-main-image"
            loading="lazy"
          />

          {/* Thumbnail strip — only shows if there are multiple images */}
          {images.length > 1 && (
            <div className="thumbnail-strip">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title} view ${idx + 1}`}
                  className={`thumb ${idx === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(idx)}
                  loading="lazy"
                />
              ))}
            </div>
          )}

        </div>

        {/* ── Right side: Product information ── */}
        <div className="detail-info">

          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <span className="detail-brand">by {product.brand}</span>

          {/* Star rating */}
          <div className="detail-rating">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
            <span> {product.rating} / 5</span>
          </div>

          {/* Full product description */}
          <p className="detail-description">{product.description}</p>

          {/* Stock and discount info */}
          <div className="detail-meta">
            <span className="detail-stock">
              {product.stock > 0
                ? `✓ ${product.stock} in stock`
                : '✗ Out of stock'}
            </span>
            <span className="detail-discount">
              {product.discountPercentage}% off
            </span>
          </div>

          {/* Price and Add to Cart button */}
          <div className="detail-price-row">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <button
              className={`btn-primary ${inCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {inCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}