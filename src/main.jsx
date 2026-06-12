// main.jsx - This is the entry point of the entire application
// React starts here and mounts everything into the index.html div#root

import React    from 'react'
import ReactDOM from 'react-dom/client'

// Provider makes the Redux store available to every component in the app
// Without this, no component can use useSelector or useDispatch
import { Provider } from 'react-redux'
import { store }    from './redux/store'

// App is the root component that contains all routes and components
import App from './App'

// Global styles — applied to the entire app
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps catch bugs during development
  // It renders components twice in dev mode to detect side effects
  <React.StrictMode>

    {/* Wrap the entire app with Provider so Redux store is accessible everywhere */}
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
)