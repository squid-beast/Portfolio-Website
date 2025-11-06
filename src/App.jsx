import { useState, useEffect, useCallback } from 'react'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])
  
  // Job data
  const jobs = [
    {
      title: "Java Developer",
      company: "Anywhere Real Estate Inc.",
      from: "June 2024",
      to: null,
      location: "Remote"
    },
    {
      title: "Systems Engineer",
      company: "Shell / Greenlots",
      from: "May 2023",
      to: "January 2024",
      location: "Remote"
    },
    {
      title: "Systems Engineer",
      company: "Infosys",
      from: "July 2022",
      to: "December 2022",
      location: "Hyderabad, India"
    },
    {
      title: "Systems Engineer",
      company: "Infosys",
      from: "January 2022",
      to: "June 2022",
      location: "Hyderabad, India"
    }
  ]

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'projects', 'resume']
      const scrollPosition = window.scrollY + 200
      
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
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      
      {/* Header Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? 'bg-black/95' : 'bg-white/95'
      } backdrop-blur-sm`}>
        <div className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="px-6 sm:px-8 py-5 flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="text-base font-semibold">
              Lohith <span className="text-purple-500">Kumar</span>
            </a>
            
            {/* Right Side - Navigation + Social + Dark Mode */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-12">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-12">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-sm transition-all ${
                  activeSection === 'home'
                    ? isDarkMode ? 'text-white' : 'text-black'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`text-sm transition-all ${
                  activeSection === 'experience'
                    ? isDarkMode ? 'text-white' : 'text-black'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`text-sm transition-all ${
                  activeSection === 'projects'
                    ? isDarkMode ? 'text-white' : 'text-black'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('resume')}
                className={`text-sm transition-all ${
                  activeSection === 'resume'
                    ? isDarkMode ? 'text-white' : 'text-black'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Resume
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://x.com/startwithleo"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              <a
                href="https://linkedin.com/in/lkneerukonda"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center max-w-5xl mx-auto animate-fade-in-up w-full">
          <p className={`text-xs sm:text-sm md:text-base mb-3 sm:mb-4 tracking-wider uppercase ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Welcome to the <span className="text-purple-500">web portfolio</span> of
          </p>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 px-2">
            Lohith <span className="text-purple-500">Kumar</span>
          </h1>
          
          <p className={`text-xs sm:text-sm tracking-widest uppercase mb-6 sm:mb-8 md:mb-12 px-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Scroll down to learn more about my skills & experiences
          </p>
          
          {/* Tech Stack Logos - Infinite Scroll */}
          <div className="relative w-full overflow-hidden mb-8 sm:mb-12">
            <div className="flex animate-scroll-infinite">
              {/* First set */}
              <div className="flex items-center gap-6 sm:gap-8 md:gap-12 px-3 sm:px-4 md:px-6 shrink-0">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="Spring Boot" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" alt="Kafka" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" alt="Azure" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-6 sm:gap-8 md:gap-12 px-3 sm:px-4 md:px-6 shrink-0">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="Spring Boot" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" alt="Kafka" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" alt="Azure" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto px-4">
            <a
              href="mailto:lohithkumarneerukonda@gmail.com"
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium text-center ${
                isDarkMode 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Contact Me
            </a>
            <a
              href="https://github.com/squid-beast"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all text-xs sm:text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 border-2 border-purple-600 text-center"
            >
              Github
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-purple-500">
            Experience
          </h2>
          <p className={`text-center text-xs sm:text-sm tracking-widest uppercase mb-16 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The positions I have worked in my career so far
          </p>
          
          {/* All Jobs Displayed */}
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className={`rounded-lg overflow-hidden ${
                isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
              }`}>
                {/* macOS Window Header */}
                <div className={`flex items-center gap-2 px-4 py-3 border-b ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
                }`}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className={`text-xs ml-4 font-mono ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>job{index + 1}.java</span>
                </div>
                
                {/* Code Block Content */}
                <div className={`p-6 sm:p-8 font-mono text-sm ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                }`}>
                  <div className="flex gap-4">
                    <div className={`text-right select-none ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {[1,2,3,4,5,6,7].map(n => <div key={n}>{n}</div>)}
                    </div>
                    <div className="flex-1">
                      <div><span className="text-purple-500">public class</span> <span className="text-blue-400">Job</span> {'{'}</div>
                      <div className="pl-4"><span className="text-purple-500">private</span> <span className="text-blue-400">String</span> title = <span className="text-yellow-400">"{job.title}"</span>;</div>
                      <div className="pl-4"><span className="text-purple-500">private</span> <span className="text-blue-400">String</span> company = <span className="text-yellow-400">"{job.company}"</span>;</div>
                      <div className="pl-4"><span className="text-purple-500">private</span> <span className="text-blue-400">String</span> from = <span className="text-yellow-400">"{job.from}"</span>;</div>
                      <div className="pl-4"><span className="text-purple-500">private</span> <span className="text-blue-400">String</span> to = <span className="text-yellow-400">{job.to ? `"${job.to}"` : '"Present"'}</span>;</div>
                      <div className="pl-4"><span className="text-purple-500">private</span> <span className="text-blue-400">String</span> location = <span className="text-yellow-400">"{job.location}"</span>;</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-purple-500">
            Featured Projects
          </h2>
          <p className={`text-center text-xs sm:text-sm tracking-widest uppercase mb-16 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Here are some of the most recent projects I have been working on
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1 */}
            <a 
              href="https://github.com/squid-beast/Community-Management"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg p-6 group hover:scale-105 transition-all duration-300 cursor-pointer ${
                isDarkMode ? 'bg-gray-900 border border-gray-800 hover:border-purple-500' : 'bg-gray-50 border border-gray-200 hover:border-purple-500'
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Community App (iOS)</h3>
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <p className="text-xs mb-3 text-purple-500">Java</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  A neighborhood community platform that connects people with local events, services, and announcements in their area.
                </p>
              </div>
              <div className="flex justify-end">
                <svg className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>

            {/* Project 2 */}
            <a 
              href="https://github.com/squid-beast/CopilotBot"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg p-6 group hover:scale-105 transition-all duration-300 cursor-pointer ${
                isDarkMode ? 'bg-gray-900 border border-gray-800 hover:border-purple-500' : 'bg-gray-50 border border-gray-200 hover:border-purple-500'
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Copilot Bot</h3>
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <p className="text-xs mb-3 text-purple-500">Java</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  An intelligent automation agent that helps streamline development workflows and boost productivity.
                </p>
              </div>
              <div className="flex justify-end">
                <svg className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className={`min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-purple-500">
            Resume
          </h2>
          <p className={`text-xs sm:text-sm tracking-widest uppercase mb-12 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Learn more about my experience by downloading my resume
          </p>
          
          {/* Resume Preview */}
          <div className={`rounded-lg overflow-hidden max-w-2xl mx-auto mb-8 ${
            isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
          }`}>
            {/* Browser-like header */}
            <div className={`flex items-center gap-2 px-4 py-3 border-b ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
            }`}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className={`flex-1 text-center text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                resume.pdf
              </div>
              <a 
                href="/resume.pdf" 
                download="Lohith_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
            
            {/* Resume preview content */}
            <div className="p-12 text-left">
              <h3 className="text-2xl font-bold mb-8">Lohith Kumar Neerukonda</h3>
              <div className={`space-y-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700 rounded w-4/5"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm ${
        isDarkMode ? 'bg-black text-gray-500' : 'bg-gray-50 text-gray-600'
      }`}>
        <p className="mb-2">With Love, Lohith Kumar</p>
      </footer>
    </div>
  )
}

export default App
