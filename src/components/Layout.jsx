import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Layout = ({ children, isDarkMode, toggleDarkMode }) => {
  const location = useLocation()

  const centerNavItems = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
  ]

  const isContactPage = location.pathname === '/contact'

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-mono ${
      isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-900'
    }`}>
      {/* Header Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
        {/* Desktop Nav - Three Column */}
        <div className="hidden sm:grid grid-cols-3 px-6 py-4 items-start">
          {/* Logo - Left */}
          <Link
            to="/"
            className="text-xs tracking-widest uppercase"
          >
            LOHITH KUMAR
          </Link>
          
          {/* Center Navigation - Stacked */}
          <div className="flex flex-col items-center gap-0.5">
            {centerNavItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs transition-colors ${
                    isActive
                      ? `tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-black'}`
                      : `tracking-wider ${isDarkMode ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-gray-900'}`
                  }`}
                >
                  {isActive 
                    ? <span>{'('}<span className="mx-6">{item.label}</span>{')'}</span>
                    : `( ${item.label} )`
                  }
                </Link>
              )
            })}
          </div>
          
          {/* Contact - Right */}
          <Link
            to="/contact"
            className={`text-xs tracking-wider transition-colors text-right ${
              isContactPage
                ? isDarkMode ? 'text-white' : 'text-black'
                : isDarkMode ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            ( CONTACT )
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="sm:hidden px-3 py-3 flex justify-between items-center gap-2 min-h-[44px]">
          <Link
            to="/"
            className="text-xs tracking-widest uppercase shrink-0 min-h-[44px] min-w-[44px] flex items-center"
          >
            <span className="truncate max-w-[140px] sm:max-w-none">LOHITH KUMAR</span>
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            {[...centerNavItems, { path: '/contact', label: 'CONTACT' }].map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[10px] sm:text-xs tracking-wider transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center py-2 ${
                    isActive
                      ? isDarkMode ? 'text-white' : 'text-black'
                      : isDarkMode ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-24 sm:pt-20">
        {children}
      </main>

      {/* Footer - hidden on Home (Home renders its own full footer) */}
      {location.pathname !== '/' && (
        <footer className={`px-4 sm:px-6 py-4 ${
          isDarkMode ? 'text-gray-600' : 'text-gray-500'
        }`}>
          <div className="flex justify-between items-center text-xs tracking-wider">
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-2"
            >
              ( • {isDarkMode ? 'DARK' : 'LIGHT'} )
            </motion.button>
            <div>
              {new Date().getFullYear()} ©
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Layout
