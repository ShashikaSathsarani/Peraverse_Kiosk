import { useState, useEffect } from "react";
import "./AboutPage.css";
import logo from "../assets/engex.png";

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
      name: "Chemical and Process Engineering",
      description: "Process Engineering, Materials Science, Sustainability",
      projects: 12,
      color: "#ef4444"
    },
    {
      name: "Manufacturing and Inductrial Engineering",
      description: "Production Systems, Automation, Quality Control, and Industrial Processe",
      projects: 11,
      color: "#06b6d4"
    },
    {
      name: "Engineering Management",
      description: "Project Leadership, Operations Optimization, Technology Management, and Business Strategy",
      projects: 11,
      color: "#d406a7ff"
    },
    {
      name: "Engineering Mathematics",
      description: "Computational Methods, Mathematical Modeling, Data Analysis, and Algorithm Developmen",
      projects: 11,
      color: "#d3d15eff"
    }


  ]

  const highlights = [
    { icon: "🏆", text: "Award Competitions" },
    { icon: "🎯", text: "Interactive Demos" },
    { icon: "🔬", text: "Research Presentations" },
    { icon: "🤖", text: "Technology Showcases" },
    { icon: "💼", text: "Industry Partnerships" },
    { icon: "🌱", text: "Sustainability Focus" }
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
        {/* Header Section */}
        <div className="about-header">
          <div className="header-content">
            <div className="logo-container">
              <img src={logo} alt="EngEx 2025 Logo" className="header-logo" />
            </div>
            <div className="header-text">
              <h1 className="about-title">
                <span className="title-icon"></span>
                About EngEx 2025
              </h1>
              <p className="about-subtitle">
                The Biggest Engineering Exhibition Of The Year
              </p>
            </div>
          </div>
          <div className="header-divider"></div>
        </div>

        {/* Event Overview - Full Width */}
        <div className="glass-card">
          <h2 className="section-title">
           
            Event Overview
          </h2>
          
          <div className="event-overview-content">
            <div className="event-description">
              <p>
                EngEx2025 is a celebration of the legacy, creativity, and innovation of one of Sri Lanka’s premier engineering faculties. 
                For decades, we have nurtured generations of engineers who drive national growth and contribute to solving global challenges. 
                This exhibition brings together our past achievements and future aspirations through cutting-edge research, 
                student projects, and strong industry collaborations.
              </p>
              <p>
                At the heart of this exhibition is our theme: “Engineering for Life”—a belief that engineering is not just about technology, 
                but about improving lives, shaping communities, and building a sustainable future.
                Engineering for Life. Engineering for the Future.
              </p>
            </div>

            {/* Highlights Grid - Fixed Layout */}
            <div className="highlights-main-grid">
              {highlights.map((item, index) => (
                <div key={index} className="highlight-item">
                  <span className="highlight-icon">{item.icon}</span>
                  <span className="highlight-text">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Dynamic Stats Display - Separate Section */}
            <div className="stats-display-container">
              <div className="dynamic-stats-card">
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
        </div>

        {/* Engineering Departments - Full Width */}
        <div className="glass-card">
          <h2 className="section-title">
            <span className="section-icon">🏛️</span>
            Engineering Departments
          </h2>
          
          <div className="departments-grid">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <div className="department-header">
                  <div 
                    className="department-indicator"
                    style={{ backgroundColor: dept.color }}
                  />
                  <div className="department-info">
                    <h3 className="department-name">{dept.name}</h3>
                    <span className="department-projects">{dept.projects} projects</span>
                  </div>
                </div>
                <p className="department-description">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="quick-stats-grid">
          {eventStats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon-small">{stat.icon}</div>
              <div className="stat-value-small">{stat.value}</div>
              <div className="stat-label-small">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* University Information */}
        
      </div>
    </div>
  )
}

export default AboutPage