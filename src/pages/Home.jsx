import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const projects = [
  {
    name: 'VERDICT AI',
    date: '2026-02-06',
    description: 'AN INTERNAL TOOL I BUILT TO REVIEW CONTRACTS IN A STRUCTURED, TRACEABLE WAY.',
    image: '/projects/verdict-ai.png',
  },
  {
    name: 'RECEIVLY',
    date: 'COMING SOON',
    description: 'MICRO AND SMALL BUSINESSES WASTE ADMINISTRATIVE TIME ON MANUAL INVOICING BECAUSE ENTERPRISE ERP SYSTEMS ARE COSTLY, COMPLEX, AND HARD TO ADOPT.',
    image: null,
  },
]

const Home = ({ isDarkMode, toggleDarkMode }) => {
  const [showContent, setShowContent] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState('slides')
  
  const arcColor = isDarkMode ? '#333' : '#d1d5db'
  const current = projects[currentIndex]
  
  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 400)
    return () => clearTimeout(t)
  }, [])

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % projects.length)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)

  return (
    <section className="flex-1 flex flex-col items-center px-3 sm:px-6 overflow-x-hidden overflow-y-auto min-h-0">
      {/* Listing View - Project list (only when VIEW LISTING is active) */}
      <AnimatePresence>
        {viewMode === 'listing' && showContent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mb-4 sm:mb-6"
          >
            <div className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-3 px-2 sm:px-4">
              {projects.map((project, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`flex items-center gap-2 sm:gap-3 text-xs tracking-wider transition-colors text-left py-3 min-h-[44px] ${
                    i === currentIndex
                      ? isDarkMode ? 'text-white' : 'text-black'
                      : isDarkMode ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  <span>( {i + 1} )</span>
                  <span className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span>{project.name}</span>
                    <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>
                      {project.date}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central slider: arcs + image + project details (no "PROJECTS" heading) */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0">
        <div
          className="relative w-full max-w-5xl flex flex-col items-center justify-center px-4 sm:px-12 md:px-16 lg:px-24"
          style={{ minHeight: viewMode === 'listing' ? '38vh' : '52vh' }}
        >
          {/* Left arcs: sit in left zone, more space from card */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-40 sm:h-56 md:h-72 lg:h-80 w-12 sm:w-20 md:w-24 lg:w-28"
            viewBox="0 0 200 400"
            fill="none"
            preserveAspectRatio="xMaxYMid meet"
          >
            <path d="M 160 20 C 20 20, 20 380, 160 380" stroke={arcColor} strokeWidth="1" />
          </motion.svg>

          {projects.length > 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              onClick={goPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
              className={`absolute left-8 sm:left-14 md:left-20 z-20 text-xs tracking-wider transition-colors min-h-[44px] min-w-[44px] items-center justify-center ${
                isDarkMode ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-gray-900'
              } hidden sm:flex`}
            >
              {'<'}
            </motion.button>
          )}

          {/* Right arcs: sit in right zone, more space from card */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-40 sm:h-56 md:h-72 lg:h-80 w-12 sm:w-20 md:w-24 lg:w-28"
            viewBox="0 0 200 400"
            fill="none"
            preserveAspectRatio="xMinYMid meet"
          >
            <path d="M 40 20 C 180 20, 180 380, 40 380" stroke={arcColor} strokeWidth="1" />
          </motion.svg>

          {projects.length > 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              onClick={goNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
              className={`absolute right-8 sm:right-14 md:right-20 z-20 text-xs tracking-wider transition-colors min-h-[44px] min-w-[44px] items-center justify-center ${
                isDarkMode ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-gray-900'
              } hidden sm:flex`}
            >
              {'>'}
            </motion.button>
          )}

          {/* Project card: centered with larger space from arcs */}
          <div className="relative z-10 w-full max-w-xl mx-auto min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.85 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image: full screenshot, no crop. Placeholder: same-height box */}
                <div className={`border overflow-hidden ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} ${current.image ? '' : 'aspect-[16/10]'}`}>
                  {current.image ? (
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full block"
                    />
                  ) : (
                    <div
                      className={`w-full h-full min-h-[10rem] flex items-center justify-center text-xs tracking-widest aspect-[16/10] ${
                        isDarkMode ? 'text-gray-700' : 'text-gray-300'
                      }`}
                    >
                      —
                    </div>
                  )}
                </div>
                {/* Info block: same padding and alignment for every project */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-[auto_1fr] sm:gap-6 gap-3 items-start">
                  <div className="min-w-0">
                    <p className={`text-xs tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-800'
                    }`}>
                      {current.name}
                    </p>
                    <p className={`text-xs tracking-wider mt-0.5 ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {current.date}
                    </p>
                  </div>
                  <p className={`text-xs tracking-wide leading-relaxed sm:text-right min-h-[2.75rem] max-w-full sm:max-w-sm break-words ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Single footer row: ( • DARK ) | ( 1 ) ( ) ( ) ... | ( = VIEW LISTING ) | 2026 © */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full px-3 sm:px-6 py-4 flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-0 items-stretch sm:items-center text-xs tracking-wider min-w-0 ${
          isDarkMode ? 'text-gray-600' : 'text-gray-500'
        }`}
      >
        <div className="flex justify-between sm:justify-start items-center">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            ( • {isDarkMode ? 'DARK' : 'LIGHT'} )
          </motion.button>
          <div className="flex items-center gap-1 sm:hidden">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-colors py-2 px-1 min-h-[44px] min-w-[36px] flex items-center justify-center ${
                  i === currentIndex
                    ? isDarkMode ? 'text-white' : 'text-black'
                    : isDarkMode ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                {i === currentIndex ? `( ${i + 1} )` : '( )'}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-center gap-1 sm:gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-colors py-2 px-1 min-h-[44px] min-w-[36px] flex items-center justify-center ${
                i === currentIndex
                  ? isDarkMode ? 'text-white' : 'text-black'
                  : isDarkMode ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              {i === currentIndex ? `( ${i + 1} )` : '( )'}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 min-w-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setViewMode(viewMode === 'slides' ? 'listing' : 'slides')}
            className={`transition-colors py-2 min-h-[44px] flex items-center justify-center shrink-0 ${
              isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-900'
            }`}
          >
            ( = {viewMode === 'slides' ? 'VIEW LISTING' : 'VIEW SLIDES'} )
          </motion.button>
          <span className="shrink-0">{new Date().getFullYear()} ©</span>
        </div>
      </motion.footer>
    </section>
  )
}

export default Home
