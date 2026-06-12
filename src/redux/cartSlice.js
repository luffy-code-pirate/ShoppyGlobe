// cartSlice.js - Manages all cart state using Redux Toolkit
// A slice contains the state, reducers (actions), and selectors together

import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',

  // This is the starting state when the app first loads
  initialState: {
    items: [], // each item will look like: { id, title, price, thumbnail, quantity }
  },

  reducers: {

    // addToCart - called when user clicks "Add to Cart" on any product
    // If product already exists in cart, just increase its quantity
    // If product is new, add it to the array with quantity = 1
    addToCart(state, action) {
      const product  = action.payload
      const existing = state.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },

    // removeFromCart - called when user clicks the remove/delete button
    // Filters out the item with the matching id
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // incrementQuantity - called when user clicks the + button in cart
    // Finds the item by id and adds 1 to its quantity
    incrementQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.quantity += 1
    },

    // decrementQuantity - called when user clicks the - button in cart
    // Finds the item by id and subtracts 1 from quantity
    // BUT only if quantity is greater than 1 — minimum is always 1
    decrementQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
    },

    // clearCart - called after the user places an order
    // Empties the entire cart at once
    clearCart(state) {
      state.items = []
    },
  },
})

// Export all actions so components can use them with dispatch()
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions

// ── Selectors ──────────────────────────────────────────────
// Selectors are functions that read specific data from the Redux state
// Components use these with useSelector()

// Returns the full array of cart items
export const selectCartItems = state => state.cart.items

// Returns the total number of individual units in the cart
// e.g. 2 shirts + 3 shoes = 5
export const selectCartCount = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

// Returns the total price of everything in the cart
// e.g. shirt $10 x2 + shoes $20 x1 = $40
export const selectCartTotal = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default cartSlice.reducer