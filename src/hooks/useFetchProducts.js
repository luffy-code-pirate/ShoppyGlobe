// useFetchProducts.js - Custom hook for fetching the product list
// This hook is used by ProductList component
// It handles loading, error, and success states all in one place

import { useState, useEffect } from 'react'

export function useFetchProducts(url = 'https://dummyjson.com/products?limit=30') {

  // We use ONE state object instead of three separate states
  // This is important — if we used separate states like setLoading(false)
  // and setProducts(data) separately, React might render between them
  // and briefly show wrong UI (the bug we fixed earlier)
  const [state, setState] = useState({
    products: [],   // will hold the array of products from the API
    loading:  true, // starts as true because fetch begins immediately
    error:    null, // will hold error message if fetch fails
  })

  // useEffect runs after the component mounts
  // The [url] dependency means it re-runs if the url ever changes
  useEffect(() => {

    // Reset back to loading state whenever this effect runs
    setState({ products: [], loading: true, error: null })

    // AbortController lets us cancel the fetch request
    // This is important for cleanup — if the component unmounts
    // before the fetch finishes, we cancel it to avoid memory leaks
    const controller = new AbortController()

    // We define the fetch function as async inside useEffect
    // because useEffect itself cannot be async
    async function fetchProducts() {
      try {

        // Pass the signal to fetch so it can be cancelled
        const res = await fetch(url, { signal: controller.signal })

        // If the server returned an error status (like 404 or 500)
        // fetch does not throw automatically, so we throw manually
        if (!res.ok) throw new Error(`HTTP error — status: ${res.status}`)

        // Parse the JSON response
        const data = await res.json()

        // Update state in ONE call — loading becomes false and
        // products arrive at the exact same time (no flash of wrong UI)
        setState({ products: data.products ?? [], loading: false, error: null })

      } catch (err) {

        // Ignore AbortError — that just means the component unmounted
        // which is expected behaviour, not a real error
        if (err.name !== 'AbortError') {
          setState({
            products: [],
            loading:  false,
            error:    err.message || 'Failed to fetch products.',
          })
        }
      }
    }

    // Call the function
    fetchProducts()

    // Cleanup function — runs when component unmounts
    // Cancels the fetch request if it is still in progress
    return () => controller.abort()

  }, [url])

  // Return the state object — components destructure what they need
  // const { products, loading, error } = useFetchProducts()
  return state
}