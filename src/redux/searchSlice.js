// searchSlice.js - Manages the search query state
// When the user types in the search bar, this slice stores that text
// ProductList then reads it and filters products accordingly

import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',

  // Starting state — empty string means no search active
  initialState: {
    query: '',
  },

  reducers: {

    // setSearchQuery - called every time the user types in the search bar
    // Updates the query with whatever the user typed
    setSearchQuery(state, action) {
      state.query = action.payload
    },

    // clearSearch - called when search is reset
    // Sets query back to empty string
    clearSearch(state) {
      state.query = ''
    },
  },
})

// Export actions so Header component can dispatch them
export const { setSearchQuery, clearSearch } = searchSlice.actions

// Selector - reads the current search query from state
// Used in Header to keep input in sync and in ProductList to filter
export const selectSearchQuery = state => state.search.query

export default searchSlice.reducer