import { useState, useEffect, useCallback, useMemo } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const sections = ['home', 'summary', 'skills', 'work', 'projects']

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
      const sections = ['home', 'summary', 'skills', 'work', 'projects']
      const scrollPosition = window.scrollY + 100

          // Close contact dropdown when scrolling
          if (isContactDropdownOpen) {
            setIsContactDropdownOpen(false)
          }

      // Hide header when scrolled past the hero section
      const homeSection = document.getElementById('home')
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight
        const isPastHero = window.scrollY > homeSectionBottom - 200
        setIsHeaderVisible(!isPastHero)
      }

      // Update active section
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
          }
          ticking = false
        })
        ticking = true
      }
    }

    const handleClickOutside = (event) => {
      if (isContactDropdownOpen && !event.target.closest('.contact-dropdown')) {
        setIsContactDropdownOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isContactDropdownOpen])

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Auto-close contact dropdown when navigating to different sections
      setIsContactDropdownOpen(false)
    }
  }, [])

  const goToNextSection = useCallback(() => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex < sections.length - 1) {
      // Trigger airplane animation
      setIsAnimating(true)
      
      // Start scroll after a short delay to show animation
      setTimeout(() => {
        const nextSection = sections[currentIndex + 1]
        scrollToSection(nextSection)
      }, 200)
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 800)
    }
  }, [activeSection, sections, scrollToSection])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Skip Link */}
      <a 
        href="#home" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isDarkMode ? 'bg-gray-900/90 border-gray-600' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Left side - Navigation items */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {useMemo(() => [
                { id: 'home', label: 'Home' },
                { id: 'summary', label: 'Summary' },
                { id: 'skills', label: 'Skills' },
                { id: 'work', label: 'Work' },
                { id: 'projects', label: 'Projects' }
              ], []).map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg min-h-[44px] flex items-center justify-center transition-all duration-200 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            {/* Right side - Contact and Dark Mode */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Contact Dropdown */}
              <div className="relative contact-dropdown z-50">
                <button
                  onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg min-h-[44px] flex items-center justify-center transition-all duration-200 gap-1 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  <span className="hidden sm:inline">Contact</span>
                  <span className="sm:hidden">Contact</span>
                  <svg 
                    className={`w-3 h-3 transition-transform duration-200 ${isContactDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isContactDropdownOpen && (
                  <div className={`absolute top-full right-0 mt-2 w-40 rounded-md shadow-lg z-[100] ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-600' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className="py-1">
                      <a
                        href="mailto:lohithkumarneerukonda@gmail.com"
                        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors min-h-[40px] ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </a>
                      <a
                        href="https://www.linkedin.com/in/lknnerukonda/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors min-h-[40px] ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/squid-beast"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors min-h-[40px] ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                      <a
                        href="https://x.com/startwithleo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors min-h-[40px] ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        X
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`px-2 sm:px-3 py-2 text-sm font-medium focus:outline-none rounded-lg min-h-[44px] flex items-center justify-center transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className={`absolute inset-0 opacity-50 animate-gradient ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}></div>
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float ${
          isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
        }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float ${
          isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
        }`} style={{animationDelay: '1.5s'}}></div>
        <div className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse-slow ${
          isDarkMode ? 'bg-green-900' : 'bg-green-100'
        }`} style={{animationDelay: '3s'}}></div>
        
        {/* Background Animations */}
        {isDarkMode ? (
          <>
            {/* Dark Mode: Cute Moons and Stars */}
            {/* Twinkling Stars */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(80)].map((_, i) => (
                <div
                  key={`star-${i}`}
                  className="absolute bg-white rounded-full animate-twinkle"
                  style={{
                    width: `${1 + Math.random() * 2}px`,
                    height: `${1 + Math.random() * 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1.5 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Cute Moons */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`moon-${i}`}
                  className="absolute animate-float-gentle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${4 + Math.random() * 2}s`
                  }}
                >
                  <div className="w-8 h-8 bg-yellow-200 rounded-full relative">
                    <div className="absolute w-6 h-6 bg-gray-900 rounded-full top-1 left-1"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sparkling Stars */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="absolute animate-sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Light Mode: Previous Floating Circles */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse-slow" style={{animationDelay: '3s'}}></div>
          </>
        )}
        
        <div className="max-w-4xl mx-auto text-center sm:text-left relative z-10">
          <p className={`text-lg sm:text-xl md:text-2xl mb-4 animate-fade-in-up ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Hi there,
          </p>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-4 leading-tight animate-fade-in-up ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            I'm <span className="font-bold">Lohith Kumar Neerukonda</span>
          </h1>
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 animate-fade-in-up-delay ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Software Engineer
          </h2>
    
        </div>
      </section>

      {/* Summary Section */}
      <section id="summary" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Background animations */}
        {isDarkMode ? (
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(25)].map((_, i) => (
              <div
                key={`summary-star-${i}`}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: `${0.5 + Math.random() * 1.5}px`,
                  height: `${0.5 + Math.random() * 1.5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
          </div>
        )}
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>Summary</h2>
          <div className="max-w-3xl">
            <p className={`text-base sm:text-lg leading-relaxed mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <strong>Results-driven Software Engineer</strong> with ~4 years of experience designing, developing, and deploying <strong>enterprise-grade microservices</strong> and <strong>cloud-native applications</strong>. Skilled in building scalable systems using <strong>Java, Spring Boot, and distributed architectures</strong>, with hands-on expertise in <strong>AWS (S3, ECS, Lambda, SQS, Bedrock)</strong>, Microsoft Azure, and containerization with <strong>Docker</strong>.
            </p>
            <p className={`text-base sm:text-lg leading-relaxed mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Adept at the <strong>full software development lifecycle,</strong> from requirements gathering and architecture to deployment, monitoring, and optimization. Known for improving <strong>system performance through caching, asynchronous processing, and CI/CD automation</strong>.
            </p>
            <p className={`text-base sm:text-lg leading-relaxed mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Experienced in <strong>event-driven design (Kafka, JMS, RabbitMQ, ActiveMQ)</strong> and implementing <strong>fault-tolerant patterns</strong> like Circuit Breaker (Hystrix). Strong foundation in <strong>databases (MySQL, PostgreSQL, SQL Server, Oracle)</strong> and <strong>testing frameworks (JUnit, Mockito, JMeter)</strong>.
            </p>
            <p className={`text-base sm:text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Passionate about <strong>delivering reliable, high-performing systems</strong> while collaborating in Agile environments, ensuring business-critical applications are scalable, secure, and maintainable.
            </p>
          </div>
          
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Background animations */}
        {isDarkMode ? (
          <>
            {/* Stars */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={`skill-star-${i}`}
                  className="absolute bg-white rounded-full animate-twinkle"
                  style={{
                    width: `${0.5 + Math.random() * 1}px`,
                    height: `${0.5 + Math.random() * 1}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
            {/* Small moons */}
            <div className="absolute inset-0 overflow-hidden opacity-40">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`skill-moon-${i}`}
                  className="absolute animate-float-gentle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${5 + Math.random() * 2}s`
                  }}
                >
                  <div className="w-6 h-6 bg-yellow-200 rounded-full relative">
                    <div className="absolute w-4 h-4 bg-gray-900 rounded-full top-0.5 left-0.5"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 overflow-hidden opacity-8">
            <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float"></div>
            <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2.5s'}}></div>
          </div>
        )}
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>Skills</h2>
          <div className="space-y-8">
            <div className="animate-slide-in-left" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Programming & Core Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Java 8/11/17</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Java EE/J2EE</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>HTML5</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>CSS3</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>JavaScript</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>JSP</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Node.js</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Angular</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Frameworks & Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Spring Boot</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Spring MVC</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Spring REST</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Spring AOP</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Spring Batch</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Spring JMS</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>JPA</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Hibernate</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Spring JDBC</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Mustache</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Cloud & Infrastructure</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS EC2</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS S3</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS ECS</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS ECR</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS SQS</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS SNS</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS Lambda</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>AWS Bedrock</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Azure Key Vault</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Docker</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Kubernetes</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Databases & Data Management</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>MySQL</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>PostgreSQL</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>SQL Server</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Oracle</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Flyway</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Messaging & Event-Driven Systems</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Apache Kafka</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>RabbitMQ</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>ActiveMQ</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>JMS</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>DevOps, CI/CD & Monitoring</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Maven</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Jenkins</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Bitbucket</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>GitHub</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>DataDog</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Grafana</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>JMeter</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Sonar</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.7s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Testing & Quality Assurance</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>JUnit</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Mockito</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Hamcrest</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Checkstyle</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.8s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Architecture & Best Practices</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Microservices</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>RESTful APIs</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Hystrix Circuit Breaker</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Asynchronous Processing</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Caching</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Twilio</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>SendGrid</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.9s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Design & Collaboration Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>UML</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Lucidchart</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>VISIO</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>IntelliJ</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Eclipse</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>VS Code</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Cursor</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Slf4j</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Log4j2</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '1.0s'}}>
              <div className="flex items-center mb-4">
                <div className={`w-1 h-6 mr-3 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <h3 className={`font-semibold text-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Methodologies & Processes</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Agile/Scrum</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Waterfall</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Sprint Planning</span>
                <span className={`skill-tag px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>Retrospectives</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Background animations */}
        {isDarkMode ? (
          <div className="absolute inset-0 overflow-hidden opacity-15">
            {[...Array(30)].map((_, i) => (
              <div
                key={`work-star-${i}`}
                className="absolute bg-yellow-300 rounded-full animate-sparkle"
                style={{
                  width: `${1 + Math.random() * 1}px`,
                  height: `${1 + Math.random() * 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden opacity-8">
            <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float" style={{animationDelay: '3s'}}></div>
          </div>
        )}
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>Work</h2>
          <div className="space-y-8">
            {/* Anywhere Real Estate Inc. */}
            <div className={`rounded-xl p-4 sm:p-6 hover-lift animate-scale-in shadow-sm ${
              isDarkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'
            }`} style={{animationDelay: '0.1s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Java Developer</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Anywhere Real Estate Inc. (Remote)</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Jun 2024 – Present</p>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Built AI-powered REST services using AWS Bedrock to automate property listing workflows and developed a service that analyzes property images, generating tags and captions automatically.
              </p>
              <ul className={`text-xs sm:text-sm space-y-1 sm:space-y-2 mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>• Automated property description creation, reducing manual work for coordinators</li>
                <li>• Improved performance by 30% with Spring async processing and parallel execution</li>
                <li>• Deployed microservices with Docker + AWS ECS, ensuring scalability and reliability</li>
                <li>• Conducted performance testing (JMeter, Grafana) to validate throughput and optimize service delivery</li>
              </ul>
              <p className={`text-xs sm:text-sm mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Impact:</span> Helped real estate coordinators save time and improve efficiency by automating repetitive listing tasks with AI-driven services.
              </p>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Stack:</span> Java, Spring Boot, AWS Bedrock, AWS S3, Docker, ECS, JMeter, Grafana
              </p>
            </div>

            {/* Shell / Greenlots */}
            <div className={`rounded-xl p-4 sm:p-6 hover-lift animate-scale-in shadow-sm ${
              isDarkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'
            }`} style={{animationDelay: '0.2s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Systems Engineer</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Shell / Greenlots (Remote)</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>May 2023 – Jan 2024</p>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Designed a Notification Service integrating Twilio (SMS) and SendGrid (Email) for reliable message delivery with dynamic, personalized messages using Mustache templates.
              </p>
              <ul className={`text-xs sm:text-sm space-y-1 sm:space-y-2 mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>• Added push notifications and user preference management for better engagement</li>
                <li>• Built retry mechanisms with Quartz Scheduler, ensuring failed notifications were resent</li>
                <li>• Enhanced system performance with caching and asynchronous processing</li>
                <li>• Automated builds and deployments using Docker CI/CD pipelines</li>
              </ul>
              <p className={`text-xs sm:text-sm mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Impact:</span> Improved customer communication and engagement, ensuring timely, reliable, and personalized notifications across multiple channels.
              </p>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Stack:</span> Java, Spring Boot, Twilio, SendGrid, Mustache, Quartz, Docker, CI/CD
              </p>
            </div>

            {/* Infosys - Device Confidence */}
            <div className={`rounded-xl p-4 sm:p-6 hover-lift animate-scale-in shadow-sm ${
              isDarkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'
            }`} style={{animationDelay: '0.3s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Systems Engineer</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Infosys (Hyderabad, India)</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Jul 2022 – Dec 2022</p>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Developed a Device Confidence API to secure high-risk transactions by validating devices and customer data, converting business rules into Drools with automated reloading.
              </p>
              <ul className={`text-xs sm:text-sm space-y-1 sm:space-y-2 mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>• Converted business rules into Drools and automated reloading every 4 hours with Spring Scheduler</li>
                <li>• Used Hystrix Circuit Breaker to ensure system stability during external service failures</li>
                <li>• Deployed services on AWS ECS with Docker</li>
                <li>• Published device confidence scores to Kafka, feeding into risk assessment services</li>
              </ul>
              <p className={`text-xs sm:text-sm mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Impact:</span> Strengthened transaction security and reduced fraud risk by adding an extra layer of device trust validation.
              </p>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Stack:</span> Java, Spring Boot, Drools, Hystrix, Kafka, AWS ECS, Docker
              </p>
            </div>

            {/* Infosys - PathFinder Service */}
            <div className={`rounded-xl p-4 sm:p-6 hover-lift animate-scale-in shadow-sm ${
              isDarkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'
            }`} style={{animationDelay: '0.4s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Systems Engineer</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Infosys (Hyderabad, India)</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Jan 2022 – Jun 2022</p>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Built the PathFinder Service API to optimize customer navigation after authentication and developed a Risk Assessment Service that calculated risk scores based on IP, browser, and login patterns.
              </p>
              <ul className={`text-xs sm:text-sm space-y-1 sm:space-y-2 mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>• Developed a Risk Assessment Service that calculated risk scores (IP, browser, login patterns) and returned statuses like ACCEPT, CHALLENGE, or BLOCK</li>
                <li>• Enhanced performance through parallel REST calls and caching</li>
                <li>• Published metrics and performance dashboards with JMeter + Grafana</li>
              </ul>
              <p className={`text-xs sm:text-sm mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Impact:</span> Improved both customer experience (faster navigation) and security controls (better risk detection).
              </p>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="font-medium">Stack:</span> Java, Spring Boot, REST APIs, JMeter, Grafana, Caching
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Background animations */}
        {isDarkMode ? (
          <>
            {/* Sparkling stars */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`project-star-${i}`}
                  className="absolute bg-yellow-300 rounded-full animate-sparkle"
                  style={{
                    width: `${1 + Math.random() * 1}px`,
                    height: `${1 + Math.random() * 1}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            {/* Small moons */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`project-moon-${i}`}
                  className="absolute animate-float-gentle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${4 + Math.random() * 3}s`
                  }}
                >
                  <div className="w-5 h-5 bg-yellow-200 rounded-full relative">
                    <div className="absolute w-3 h-3 bg-gray-900 rounded-full top-0.5 left-0.5"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 overflow-hidden opacity-8">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float" style={{animationDelay: '3.5s'}}></div>
          </div>
        )}
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>Projects</h2>
          <div className="space-y-8">
            {/* Kafka Messaging Service */}
            <div className={`border-l-4 border-blue-400 pl-6 py-4 hover-lift animate-scale-in rounded-r-xl shadow-sm ml-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`} style={{animationDelay: '0.1s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Kafka Messaging Service</h3>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A microservices-oriented messaging platform enabling asynchronous communication through producer-consumer patterns with topic creation, message publishing, and error handling.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>Apache Kafka</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>Spring Boot</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>Event-Driven</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast/Kafka-Messaging-Service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  View Code →
                </a>
              </div>
            </div>

            {/* Community App (iOS) */}
            <div className={`border-l-4 border-green-400 pl-6 py-4 hover-lift animate-scale-in rounded-r-xl shadow-sm ml-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`} style={{animationDelay: '0.2s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Community App (iOS)</h3>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                An iOS application for club and community management with real-time messaging, instant notifications, and member engagement features.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>iOS</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800'
                }`}>Swift</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>Push Notifications</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast/Community-Management"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  View Code →
                </a>
              </div>
            </div>

            {/* Asset Management System */}
            <div className={`border-l-4 border-purple-400 pl-6 py-4 hover-lift animate-scale-in rounded-r-xl shadow-sm ml-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`} style={{animationDelay: '0.3s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Asset Management System</h3>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A company asset tracking solution with approval workflows, real-time status updates, notification alerts, and complete audit history for accountability.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>Java</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>Spring Boot</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>MySQL</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                }`}>Workflow</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast/Asset-Management"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  View Code →
                </a>
              </div>
            </div>

            {/* Copilot Bot */}
            <div className={`border-l-4 border-orange-400 pl-6 py-4 hover-lift animate-scale-in rounded-r-xl shadow-sm ml-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`} style={{animationDelay: '0.4s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Copilot Bot (Automation Agent)</h3>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A custom Copilot Studio agent that integrates with REST APIs to process user queries dynamically, providing intelligent, context-aware responses.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>Copilot Studio</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>REST APIs</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>Automation</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast/CopilotBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  View Code →
                </a>
              </div>
            </div>

            {/* Patient Service */}
            <div className={`border-l-4 border-red-400 pl-6 py-4 hover-lift animate-scale-in rounded-r-xl shadow-sm ml-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`} style={{animationDelay: '0.5s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Patient Service (Asynchronous Processing)</h3>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A microservice for retrieving sensitive patient details asynchronously from external services, ensuring high performance while maintaining security and compliance.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>Java</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>Spring Boot</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>Async Processing</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>Security</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast/Patient-Service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  View Code →
                </a>
              </div>
            </div>

            {/* AWS S3 and SQS Integration */}
            <div className={`border-l-4 border-cyan-400 pl-6 py-4 hover-lift animate-scale-in rounded-r-xl shadow-sm ml-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`} style={{animationDelay: '0.6s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>AWS S3 and SQS Integration</h3>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A cloud-native Spring Boot application integrating Amazon S3 for scalable file storage and Amazon SQS for asynchronous message queuing, demonstrating expertise in cloud storage management and event-driven messaging.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>AWS S3</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>AWS SQS</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800'
                }`}>Spring Boot</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>Microservices</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast/AWS-S3-SQS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  View Code →
                </a>
              </div>
            </div>

            {/* Java Programming Fundamentals */}
            <div className={`border-l-4 border-indigo-400 pl-6 py-4 hover-lift animate-scale-in rounded-r-xl shadow-sm ml-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`} style={{animationDelay: '0.7s'}}>
              <div className="mb-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Java Programming Fundamentals</h3>
              </div>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A comprehensive collection demonstrating core Java concepts including OOP principles, multi-threading, exception handling, and modern Stream API usage.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>Java SE</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>OOP</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>Multi-threading</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                }`}>Stream API</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast/Core-Java-Examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  View Code →
        </a>
      </div>
            </div>
          </div>
          
        </div>
      </section>


      {/* Footer */}
      <footer className={`border-t py-4 ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © {new Date().getFullYear()} Lohith Kumar. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Next Button */}
      {activeSection !== 'projects' && (
        <button
          onClick={goToNextSection}
          className={`fixed left-1/2 bottom-8 z-50 group w-12 h-12 backdrop-blur-md border rounded-full shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105 floating-next ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-600 hover:bg-white hover:border-white' 
              : 'bg-white/90 border-gray-200 hover:bg-black hover:border-black'
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <svg 
              className={`w-5 h-5 transition-all duration-500 group-hover:translate-y-0.5 ${isAnimating ? 'airplane-animation' : ''} ${
                isDarkMode 
                  ? 'text-gray-500 group-hover:text-black' 
                  : 'text-gray-400 group-hover:text-white'
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>
      )}
      </div>
  )
}

export default App
