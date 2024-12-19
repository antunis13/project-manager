import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Home from './index.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}
export default App