import { useState, useEffect } from 'react'
import './ExhibitionsPage.css'

const ExhibitionsPage = () => {
  const [currentExhibit, setCurrentExhibit] = useState(0)

  const exhibitions = [
    {
      id: 1,
      title: "Smart City Solutions",
      department: "Computer Engineering",
      booth: "Hall A - Booth 01-05",
      description: "Innovative IoT and AI solutions for urban challenges including traffic management, smart lighting, and environmental monitoring.",
      highlights: ["AI Traffic Control", "Smart Parking System", "Environmental Sensors", "Real-time Analytics"],
      visitors: 320,
      rating: 4.8
    },
    {
      id: 2,
      title: "Renewable Energy Systems",
      department: "Electrical Engineering",
      booth: "Hall B - Booth 06-10",
      description: "Cutting-edge solar, wind, and hybrid energy solutions with efficient storage and distribution systems.",
      highlights: ["Solar Panel Innovations", "Wind Energy Optimization", "Energy Storage", "Smart Grid Technology"],
      visitors: 285,
      rating: 4.7
    },
    {
      id: 3,
      title: "Biomedical Engineering",
      department: "Mechanical Engineering",
      booth: "Hall C - Booth 11-15",
      description: "Advanced medical devices, prosthetics, and diagnostic equipment designed to improve healthcare outcomes.",
      highlights: ["3D Printed Prosthetics", "Diagnostic Devices", "Surgical Robots", "Medical Imaging"],
      visitors: 240,
      rating: 4.9
    },
    {
      id: 4,
      title: "Sustainable Materials",
      department: "Chemical Engineering",
      booth: "Hall D - Booth 16-20",
      description: "Eco-friendly materials and processes for construction, packaging, and manufacturing industries.",
      highlights: ["Bio-degradable Plastics", "Green Concrete", "Recycled Materials", "Clean Production"],
      visitors: 195,
      rating: 4.6
    },
    {
      id: 5,
      title: "Autonomous Systems",
      department: "Mechatronic Engineering",
      booth: "Hall E - Booth 21-25",
      description: "Self-driving vehicles, drones, and robotic systems for various industrial and civilian applications.",
      highlights: ["Autonomous Vehicles", "Delivery Drones", "Industrial Robots", "Navigation Systems"],
      visitors: 310,
      rating: 4.8
    },
    {
      id: 6,
      title: "Environmental Engineering",
      department: "Civil Engineering",
      booth: "Hall F - Booth 26-30",
      description: "Water treatment, waste management, and environmental restoration technologies for a sustainable future.",
      highlights: ["Water Purification", "Waste-to-Energy", "Air Quality Monitoring", "Soil Remediation"],
      visitors: 220,
      rating: 4.5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExhibit((prev) => (prev + 1) % exhibitions.length)
    }, 8000) // Change exhibition every 8 seconds

    return () => clearInterval(interval)
  }, [exhibitions.length])

  const currentExhibition = exhibitions[currentExhibit]

  return (
    <div className="exhibitions-page">
      <div className="exhibitions-container">
        {/* Header */}
        <div className="exhibitions-header">
          <div className="header-content">
            <h1 className="exhibitions-title">
              <span className="title-icon">🏛️</span>
              Featured Exhibitions
            </h1>
            <p className="page-subtitle">Faculty of Engineering • University of Peradeniya</p>
          </div>
          <div className="exhibition-counter">
            {currentExhibit + 1} of {exhibitions.length}
          </div>
        </div>

        {/* Main Exhibition Display */}
        <div className="main-exhibition-display">
          <div className="exhibition-main-card glass-card">
            <div className="exhibition-header">
              <div className="exhibition-badge">
                <span className="badge-text">{currentExhibition.department}</span>
              </div>
              <div className="exhibition-stats">
                <div className="stat-item">
                  <span className="stat-icon">👥</span>
                  <span className="stat-value">{currentExhibition.visitors}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-value">{currentExhibition.rating}</span>
                </div>
              </div>
            </div>

            <div className="exhibition-content">
              <h2 className="exhibition-title">{currentExhibition.title}</h2>
              <p className="exhibition-location">📍 {currentExhibition.booth}</p>
              <p className="exhibition-description">{currentExhibition.description}</p>
              
              <div className="exhibition-highlights">
                <h3 className="highlights-title">Key Highlights:</h3>
                <div className="highlights-grid">
                  {currentExhibition.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <span className="highlight-dot">•</span>
                      <span className="highlight-text">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel - Other Exhibitions */}
          <div className="exhibitions-sidebar">
            <h3 className="sidebar-title">All Exhibitions</h3>
            <div className="exhibitions-list">
              {exhibitions.map((exhibition, index) => (
                <div
                  key={exhibition.id}
                  className={`exhibition-item ${index === currentExhibit ? 'active' : ''}`}
                >
                  <div className="item-header">
                    <h4 className="item-title">{exhibition.title}</h4>
                    <span className="item-booth">{exhibition.booth.split(' - ')[1]}</span>
                  </div>
                  <p className="item-department">{exhibition.department}</p>
                  <div className="item-stats">
                    <span className="item-visitors">👥 {exhibition.visitors}</span>
                    <span className="item-rating">⭐ {exhibition.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="exhibition-indicators">
          {exhibitions.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentExhibit ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExhibitionsPage
