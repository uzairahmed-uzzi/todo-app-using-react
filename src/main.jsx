import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FireBaseProvider } from './Firebase/Firebase.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/Routers/Routers.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <FireBaseProvider>
    <RouterProvider router={router}/>
  </FireBaseProvider>
  </>,
)
