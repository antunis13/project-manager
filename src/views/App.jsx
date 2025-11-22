import { BrowserRouter as Router, Routes, Route } from 'react-router'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'

import Home from './index.jsx'
import SignInPage from '@/pages/SignIn.jsx'

const App = () => {
  return (
    <Router>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignInPage />} />
      </Routes>
    </Router>
  )
}
export default App
