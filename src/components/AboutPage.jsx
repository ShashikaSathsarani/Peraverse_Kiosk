import { useState, useEffect } from 'react'
import './AboutPage.css'

const AboutPage = () => {
  const [currentStat, setCurrentStat] = useState(0)

  const eventStats = [
    { label: "Engineering Departments", value: "8", icon: "🏛️" },
    { label: "Student Projects", value: "120+", icon: "🚀" },
    { label: "Industry Partners", value: "45", icon: "🤝" },
    { label: "Innovation Exhibits", value: "75", icon: "💡" },
    { label: "Research Papers", value: "200+", icon: "📄" },
    { label: "Guest Speakers", value: "25", icon: "🎤" }
  ]

  const departments = [
    {
      name: "Computer Engineering",
      description: "Artificial Intelligence, Software Development, Cybersecurity",
      projects: 18,
      color: "#3b82f6"
    },
    {
      name: "Electrical Engineering", 
      description: "Power Systems, Renewable Energy, Smart Grids",
      projects: 16,
      color: "#f59e0b"
    },
    {
      name: "Mechanical Engineering",
      description: "Robotics, Manufacturing, Automotive Technology",
      projects: 15,
      color: "#10b981"
    },
    {
      name: "Civil Engineering",
      description: "Infrastructure, Construction, Environmental Engineering",
      projects: 14,
      color: "#8b5cf6"
    },
    {
      name: "Chemical Engineering",
      description: "Process Engineering, Materials Science, Sustainability",
      projects: 12,
      color: "#ef4444"
    },
    {
      name: "Biomedical Engineering",
      description: "Medical Devices, Healthcare Technology, Diagnostics",
      projects: 11,
      color: "#06b6d4"
    },
    {
      name: "Materials Engineering",
      description: "Advanced Materials, Nanotechnology, Composites",
      projects: 10,
      color: "#84cc16"
    },
    {
      name: "Environmental Engineering",
      description: "Water Treatment, Waste Management, Climate Solutions",
      projects: 9,
      color: "#f97316"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % eventStats.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [eventStats.length])

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h1 className="about-title">
            <span className="title-icon">🎓</span>
            About PeraVerse 2025
          </h1>
          <p className="about-subtitle">
            Faculty of Engineering • University of Peradeniya
          </p>
        </div>

        {/* Main Content */}
        <div className="about-content">
          {/* Left Column - Event Info */}
          <div className="event-info-section">
            <div className="glass-card">
              <h2 className="section-title">Event Overview</h2>
              <div className="event-description">
                <p>
                  PeraVerse 2025 is the premier engineering exhibition showcasing innovative 
                  solutions and cutting-edge research from the Faculty of Engineering, 
                  University of Peradeniya. This annual event brings together students, 
                  faculty, industry professionals, and the community to explore the latest 
                  developments in engineering and technology.
                </p>
                <p>
                  Our theme this year focuses on "Engineering for a Sustainable Future," 
                  highlighting projects and research that address global challenges in 
                  sustainability, technology, and human welfare.
                </p>
              </div>

              {/* Event Highlights */}
              <div className="event-highlights">
                <h3 className="highlights-title">Event Highlights</h3>
                <div className="highlights-grid">
                  <div className="highlight-item">
                    <span className="highlight-icon">🏆</span>
                    <span className="highlight-text">Award Competitions</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🎯</span>
                    <span className="highlight-text">Interactive Demos</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🔬</span>
                    <span className="highlight-text">Research Presentations</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🤖</span>
                    <span className="highlight-text">Technology Showcases</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">💼</span>
                    <span className="highlight-text">Industry Partnerships</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🌱</span>
                    <span className="highlight-text">Sustainability Focus</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Stats */}
              <div className="dynamic-stats">
                <div className="stat-display">
                  <div className="stat-icon">{eventStats[currentStat].icon}</div>
                  <div className="stat-details">
                    <div className="stat-value">{eventStats[currentStat].value}</div>
                    <div className="stat-label">{eventStats[currentStat].label}</div>
                  </div>
                </div>
                <div className="stat-indicators">
                  {eventStats.map((_, index) => (
                    <div
                      key={index}
                      className={`stat-indicator ${index === currentStat ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Departments */}
          <div className="departments-section">
            <div className="glass-card">
              <h2 className="section-title">Engineering Departments</h2>
              <div className="departments-grid">
                {departments.map((dept, index) => (
                  <div key={index} className="department-card">
                    <div className="department-header">
                      <div 
                        className="department-indicator"
                        style={{ backgroundColor: dept.color }}
                      />
                      <h3 className="department-name">{dept.name}</h3>
                      <span className="department-projects">{dept.projects} projects</span>
                    </div>
                    <p className="department-description">{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="footer-stats">
          <div className="stats-grid">
            {eventStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon-small">{stat.icon}</div>
                <div className="stat-value-small">{stat.value}</div>
                <div className="stat-label-small">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* University Info */}
        <div className="university-info">
          <div className="glass-card">
            <div className="university-content">
              <div className="university-text">
                <h3 className="university-title">University of Peradeniya</h3>
                <p className="university-description">
                  Established in 1942, the University of Peradeniya is one of Sri Lanka's 
                  most prestigious universities. The Faculty of Engineering, founded in 1961, 
                  has been at the forefront of engineering education and research in the region, 
                  producing graduates who have made significant contributions to industry, 
                  academia, and society.
                </p>
              </div>
              <div className="university-logo">
                <span className="logo-placeholder">🎓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AboutPage
