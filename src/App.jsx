import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#000000'
      document.body.style.color = '#e5e5e5'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#1a1a1a'
    }
  }, [isDarkMode])

  return (
    <BrowserRouter>
      <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
        <AnimatedRoutes isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </Layout>
    </BrowserRouter>
  )
}

const AnimatedRoutes = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <About isDarkMode={isDarkMode} />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <Contact isDarkMode={isDarkMode} />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <NotFound isDarkMode={isDarkMode} />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default App
