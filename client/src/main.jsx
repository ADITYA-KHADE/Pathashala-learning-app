import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { FieldProvider } from './contexts/FieldContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FieldProvider>
          <App />
        </FieldProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
