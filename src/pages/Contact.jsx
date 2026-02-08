import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const Contact = ({ isDarkMode }) => {
  const [showBrackets, setShowBrackets] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [showContent, setShowContent] = useState(false)
  const hasStarted = useRef(false)
  
  const fullName = 'CONTACT'
  
  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    
    setTimeout(() => {
      setShowBrackets(true)
    }, 300)
    
    setTimeout(() => {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < fullName.length) {
          setDisplayText(fullName.substring(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => setShowContent(true), 400)
        }
      }, 100)
    }, 1000)
  }, [])

  return (
    <section className="flex-1 flex flex-col items-start justify-center px-4 sm:px-12 md:px-20 lg:px-32 min-h-0 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full min-w-0"
      >
        {/* Title with brackets - wide spacing */}
        <div className="text-sm font-normal mb-10 sm:mb-16 tracking-[0.4em] sm:tracking-[0.6em] overflow-x-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: showBrackets ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {'('}
          </motion.span>
          
          <span className="mx-3 sm:mx-4">
            {displayText}
          </span>
          
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: showBrackets ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {')'}
          </motion.span>
        </div>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className={`text-xs leading-relaxed mb-16 tracking-wide ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          INTERESTED IN WORKING TOGETHER? LET'S TALK.
        </motion.p>
        
        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <a
            href="mailto:lohithkumarneerukonda@gmail.com"
            className={`text-xs tracking-wider block transition-all break-all sm:break-normal ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            LOHITHKUMARNEERUKONDA@GMAIL.COM
          </a>
        </motion.div>
        
        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-2 sm:gap-4 flex-wrap"
        >
          <motion.a
            href="https://github.com/squid-beast"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-xs tracking-wider transition-all py-2 min-h-[44px] min-w-[44px] flex items-center ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            ( GITHUB )
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/lknnerukonda/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-xs tracking-wider transition-all py-2 min-h-[44px] min-w-[44px] flex items-center ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            ( LINKEDIN )
          </motion.a>
          <motion.a
            href="https://x.com/startwithleo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-xs tracking-wider transition-all py-2 min-h-[44px] min-w-[44px] flex items-center ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            ( X )
          </motion.a>
          <motion.a
            href="https://drive.google.com/file/d/1YVAyZdpdG5s9Zz46DEMOCh7DR0cKJjU9/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-xs tracking-wider transition-all py-2 min-h-[44px] min-w-[44px] flex items-center ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            ( RESUME )
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
