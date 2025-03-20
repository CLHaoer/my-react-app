import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  // </StrictMode>
)
