// store.js - This is the central Redux store
// It combines all the slices (cart and search) into one store

import { configureStore } from '@reduxjs/toolkit'

// We will create these two files in the next steps
import cartReducer   from './cartSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    cart:   cartReducer,   // handles everything related to cart items
    search: searchReducer, // handles the search query
  },
})