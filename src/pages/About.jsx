import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const About = ({ isDarkMode }) => {
  const [showBrackets, setShowBrackets] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [showBio, setShowBio] = useState(false)
  const hasStarted = useRef(false)
  
  const fullName = 'LOHITH KUMAR'
  
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
          setTimeout(() => setShowBio(true), 400)
        }
      }, 100)
    }, 1000)
  }, [])

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-12 md:px-20 lg:px-32 min-h-0 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full min-w-0"
      >
        {/* Name with brackets - wide letter spacing */}
        <div className="text-sm font-normal mb-10 sm:mb-16 tracking-[0.4em] sm:tracking-[0.6em] overflow-x-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: showBrackets ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {'['}
          </motion.span>
          
          <span className="mx-3 sm:mx-4">
            {displayText}
          </span>
          
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: showBrackets ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {']'}
          </motion.span>
        </div>
        
        {/* Bio text - left aligned, flowing paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showBio ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className={`text-xs leading-loose tracking-wide max-w-sm break-words ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          SOFTWARE ENGINEER SPECIALIZING IN BUILDING FINTECH PLATFORMS, SAAS APPLICATIONS AND AI-POWERED TOOLS. ALL ARCHITECTED WITH MICROSERVICES AND DEPLOYED ON CLOUD INFRASTRUCTURE. FAST, SCALABLE, AND READY TO SHIP. LET'S BUILD SOMETHING GREAT TOGETHER.
        </motion.p>
      </motion.div>
    </section>
  )
}

export default About
