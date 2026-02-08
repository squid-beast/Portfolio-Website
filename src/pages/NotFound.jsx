import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const NotFound = ({ isDarkMode }) => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 min-h-0 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl min-w-0"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sm font-normal mb-12 tracking-[0.4em]"
        >
          ( 4 0 4 )
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-xs leading-relaxed mb-12 tracking-wide ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          PAGE NOT FOUND
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            to="/"
            className={`text-xs tracking-wider transition-all min-h-[44px] min-w-[44px] inline-flex items-center justify-center ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            ( BACK TO HOME )
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default NotFound
