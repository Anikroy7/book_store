import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AllBooksProvider from './context/allBooks.provider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AllBooksProvider>
      <RouterProvider router={router} />
    </AllBooksProvider>
  </StrictMode>,
)
