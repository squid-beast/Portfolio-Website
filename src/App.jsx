import { useState, useEffect } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'summary', 'skills', 'work', 'contact']
      const scrollPosition = window.scrollY + 100

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2 sm:space-x-4 lg:space-x-8 py-3 sm:py-4">
            {[
              { id: 'home', label: 'Home' },
              { id: 'summary', label: 'Summary' },
              { id: 'skills', label: 'Skills' },
              { id: 'work', label: 'Work' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none rounded-md min-h-[44px] flex items-center justify-center transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4 sm:mb-6 leading-tight animate-fade-in-up">
            Lohith Kumar Neerukonda
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-black mb-2 sm:mb-3">Languages</h3>
              <p className="text-sm sm:text-base text-gray-700">Java, SQL</p>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-black mb-2 sm:mb-3">Backend & Frameworks</h3>
              <p className="text-sm sm:text-base text-gray-700">Spring Boot, MVC/AOP, Scheduling, JPA</p>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-black mb-2 sm:mb-3">Cloud & DevOps</h3>
              <p className="text-sm sm:text-base text-gray-700">AWS (ECS/ECR, S3, SQS/SNS, API GW, Lambda), Docker, Jenkins/Maven, Azure Key Vault</p>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-black mb-2 sm:mb-3">Messaging & Resilience</h3>
              <p className="text-sm sm:text-base text-gray-700">Kafka, RabbitMQ, JMS, Hystrix, Quartz (retries)</p>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-black mb-2 sm:mb-3">Data & Migrations</h3>
              <p className="text-sm sm:text-base text-gray-700">MySQL, PostgreSQL, SQL Server, Flyway</p>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-black mb-2 sm:mb-3">Testing & Observability</h3>
              <p className="text-sm sm:text-base text-gray-700">JUnit/Mockito, JMeter, Grafana</p>
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
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
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
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
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
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
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

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-6 sm:mb-8">Contact</h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:lohithkumarneerukonda@gmail.com"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 focus:outline-none transition-colors min-h-[44px] inline-flex items-center justify-center text-sm sm:text-base"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/lkneerukonda"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-white focus:outline-none transition-colors min-h-[44px] inline-flex items-center justify-center text-sm sm:text-base"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/squid-beast"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-white focus:outline-none transition-colors min-h-[44px] inline-flex items-center justify-center text-sm sm:text-base"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
