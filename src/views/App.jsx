import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from '../reactComponents/ProtectedRoute.jsx'
import Home from './index.jsx'
import SignInPage from '@/pages/signIn.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signIn',
    element: <SignInPage />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
