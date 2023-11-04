import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FireBaseProvider } from './Firebase/Firebase.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <FireBaseProvider>
    <App />
  </FireBaseProvider>
  </>,
)
