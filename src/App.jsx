import { useState, useEffect, useCallback, useMemo } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Skip Link */}
      <a 
        href="#home" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2 sm:space-x-4 lg:space-x-8 py-3 sm:py-4">
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
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none rounded-md min-h-[44px] flex items-center justify-center transition-colors"
              >
                {label}
              </button>
            ))}
            
            {/* Contact Dropdown */}
            <div className="relative contact-dropdown z-50">
              <button
                onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none rounded-md min-h-[44px] flex items-center justify-center transition-colors gap-1"
              >
                Contact
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
                <div className="absolute top-full right-0 mt-3 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[100]">
                  <div className="py-2">
                    <a
                      href="mailto:lohithkumarneerukonda@gmail.com"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                    <a
                      href="https://www.linkedin.com/in/lknnerukonda/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/squid-beast"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="https://x.com/startwithleo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      X
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-50 animate-gradient"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse-slow" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-4xl mx-auto text-center sm:text-left relative z-10">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-4 animate-fade-in-up">
            Hi there,
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-2 sm:mb-4 leading-tight animate-fade-in-up">
            I'm <span className="font-bold">Lohith Kumar Neerukonda</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-600 mb-6 sm:mb-8 animate-fade-in-up-delay">
            Software Engineer
          </h2>
        </div>
      </section>

      {/* Summary Section */}
      <section id="summary" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-6 sm:mb-8">Summary</h2>
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              I'm a backend engineer focused on clean REST APIs, event-driven patterns, and dependable cloud deployments. 
              Over ~4 years, I've built Spring Boot services, containerized them, and deployed on AWS ECS—prioritizing 
              performance (async + caching), resilience (circuit breakers, retries), and observability (JMeter/Grafana).
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              I like simple architectures teams can maintain and iterate on quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-12">Skills</h2>
          <div className="space-y-8">
            <div className="animate-slide-in-left" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Programming & Core Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Java 8/11/17</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Java EE/J2EE</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">HTML5</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">CSS3</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">JavaScript</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">JSP</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Node.js</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Angular</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Frameworks & Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Spring Boot</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Spring MVC</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Spring REST</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Spring AOP</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Spring Batch</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Spring JMS</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">JPA</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Hibernate</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Spring JDBC</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Mustache</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Cloud & Infrastructure</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS EC2</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS S3</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS ECS</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS ECR</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS SQS</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS SNS</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS Lambda</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AWS Bedrock</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Azure Key Vault</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Docker</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Kubernetes</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Databases & Data Management</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">MySQL</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">PostgreSQL</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">SQL Server</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Oracle</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Flyway</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Messaging & Event-Driven Systems</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Apache Kafka</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">RabbitMQ</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">ActiveMQ</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">JMS</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">DevOps, CI/CD & Monitoring</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Maven</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Jenkins</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Bitbucket</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">GitHub</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">DataDog</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Grafana</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">JMeter</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Sonar</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.7s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Testing & Quality Assurance</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">JUnit</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Mockito</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Hamcrest</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Checkstyle</span>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: '0.8s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Architecture & Best Practices</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Microservices</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">RESTful APIs</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Hystrix Circuit Breaker</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Asynchronous Processing</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Caching</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Twilio</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">SendGrid</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '0.9s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Design & Collaboration Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">UML</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Lucidchart</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">VISIO</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">IntelliJ</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Eclipse</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">VS Code</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Cursor</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Slf4j</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Log4j2</span>
              </div>
            </div>

            <div className="animate-slide-in-right" style={{animationDelay: '1.0s'}}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gray-300 mr-3"></div>
                <h3 className="font-semibold text-lg text-black">Methodologies & Processes</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Agile/Scrum</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Waterfall</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Sprint Planning</span>
                <span className="skill-tag px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Retrospectives</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-12">Work</h2>
          <div className="space-y-8">
            {/* Project 1 - AI Real-Estate Automation */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover-lift animate-scale-in" style={{animationDelay: '0.1s'}}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-black">AI Real-Estate Automation</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Recent</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Bedrock-powered tags/captions → automated property descriptions.</p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <li>• Designed REST APIs; S3 ingest; async image pipeline (~30% faster).</li>
                <li>• Docker→ECS; Flyway migrations; measured with JMeter/Grafana.</li>
              </ul>
              <p className="text-xs sm:text-sm text-gray-500">
                <span className="font-medium">Stack:</span> Java, Spring Boot, AWS S3/Bedrock, Docker, ECS, MySQL
              </p>
            </div>

            {/* Project 2 - Device Confidence & Risk */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover-lift animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-black">Device Confidence & Risk</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Security</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Security rules and risk scoring with resilient patterns.</p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <li>• Drools rules hot-reloaded via scheduler; Hystrix circuit breaker.</li>
                <li>• Kafka events; parallel calls + caching.</li>
              </ul>
              <p className="text-xs sm:text-sm text-gray-500">
                <span className="font-medium">Stack:</span> Java, Spring, Drools, Kafka, Docker, ECS
              </p>
            </div>

            {/* Project 3 - Notification Service */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover-lift animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-black">Notification Service</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Communication</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Unified email/SMS/push with templates & retries.</p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <li>• Twilio/SendGrid with Mustache; Quartz retry; async + caching.</li>
                <li>• Auditable delivery with user preferences.</li>
              </ul>
              <p className="text-xs sm:text-sm text-gray-500">
                <span className="font-medium">Stack:</span> Java, Spring, Twilio, SendGrid, Quartz, MySQL, Docker
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-12">Projects</h2>
          <div className="space-y-8">
            {/* Project 1 - Replace with your actual GitHub project */}
            <div className="border-l-4 border-gray-300 pl-6 py-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-black">Project Name</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Type</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Brief description of your project and what it does.</p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Java</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Spring Boot</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">React</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  View Code →
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Live Demo →
                </a>
              </div>
            </div>

            {/* Project 2 - Replace with your actual GitHub project */}
            <div className="border-l-4 border-gray-300 pl-6 py-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-black">Project Name</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Type</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Brief description of your project and what it does.</p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Java</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Docker</span>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">AWS</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  View Code →
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Live Demo →
                </a>
              </div>
            </div>

            {/* Project 3 - Replace with your actual GitHub project */}
            <div className="border-l-4 border-gray-300 pl-6 py-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-black">Project Name</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Type</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Brief description of your project and what it does.</p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Java</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Kafka</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">MySQL</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/squid-beast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  View Code →
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Live Demo →
        </a>
      </div>
            </div>
          </div>
          
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Lohith Kumar. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
  )
}

export default App
