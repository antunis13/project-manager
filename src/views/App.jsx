import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from '../reactComponents/ProtectedRoute.jsx'
import Home from './index.jsx'
import Layout from '../reactComponents/Layout.jsx'
import SignInPage from '@/pages/signIn.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout>
          <Home />
        </Layout>
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
