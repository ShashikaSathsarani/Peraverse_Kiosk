import { useState, useEffect } from 'react'
import './TrendingPage.css'

const TrendingPage = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)

  const trendingExhibits = [
    {
      id: 1,
      title: "AI-Powered Traffic Management System",
      booth: "Booth A12",
      department: "Computer Engineering",
      popularity: 95,
      visitors: 247,
      tags: ["AI", "Smart City", "IoT"]
    },
    {
      id: 2,
      title: "Solar-Powered Water Purification",
      booth: "Booth B08",
      department: "Environmental Engineering",
      popularity: 92,
      visitors: 198,
      tags: ["Renewable Energy", "Water Tech", "Sustainability"]
    },
    {
      id: 3,
      title: "Robotic Surgical Assistant",
      booth: "Booth C15",
      department: "Mechanical Engineering",
      popularity: 89,
      visitors: 176,
      tags: ["Robotics", "Medical Tech", "Precision"]
    },
    {
      id: 4,
      title: "Smart Building Energy Optimizer",
      booth: "Booth D03",
      department: "Electrical Engineering",
      popularity: 87,
      visitors: 165,
      tags: ["Smart Buildings", "Energy", "Automation"]
    },
    {
      id: 5,
      title: "Biodegradable Plastic Alternative",
      booth: "Booth E21",
      department: "Chemical Engineering",
      popularity: 85,
      visitors: 152,
      tags: ["Bio-materials", "Sustainability", "Innovation"]
    },
    {
      id: 6,
      title: "VR-Based Engineering Training",
      booth: "Booth F07",
      department: "Software Engineering",
      popularity: 83,
      visitors: 143,
      tags: ["VR", "Education", "Training"]
    }
  ]

  const announcements = [
    {
      id: 1,
      type: "urgent",
      title: "Workshop Registration Closing Soon",
      message: "AI & Machine Learning Workshop registration closes at 10:15 AM. Limited spots available!",
      time: "Just now"
    },
    {
      id: 2,
      type: "info",
      title: "Free Refreshments Available",
      message: "Complimentary refreshments are now available at the main entrance lobby.",
      time: "5 min ago"
    },
    {
      id: 3,
      type: "update",
      title: "Student Project Competition Update",
      message: "Competition judging has been moved to 3:45 PM in the Main Auditorium.",
      time: "12 min ago"
    },
    {
      id: 4,
      type: "success",
      title: "Network Connectivity Restored",
      message: "WiFi connectivity issues have been resolved. Network name: PeraVerse2025",
      time: "18 min ago"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 5000) // Change announcement every 5 seconds

    return () => clearInterval(interval)
  }, [announcements.length])

  const getAnnouncementIcon = (type) => {
    const icons = {
      urgent: "🚨",
      info: "ℹ️",
      update: "📢",
      success: "✅"
    }
    return icons[type] || "📌"
  }

  const getAnnouncementColor = (type) => {
    const colors = {
      urgent: "rgba(239, 68, 68, 0.8)",
      info: "rgba(59, 130, 246, 0.8)",
      update: "rgba(245, 158, 11, 0.8)",
      success: "rgba(34, 197, 94, 0.8)"
    }
    return colors[type] || "rgba(96, 165, 250, 0.8)"
  }

  return (
    <div className="trending-page fade-in">
      <div className="trending-container">
        {/* Header */}
        <div className="trending-header">
          <h1 className="trending-title">🔥 Trending Now</h1>
        </div>

        {/* Main Content Grid */}
        <div className="trending-grid">
          {/* Trending Exhibits */}
          <div className="trending-exhibits">
            <div className="section-header">
              <h2 className="section-title">Trending Exhibits</h2>
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span>Live Updates</span>
              </div>
            </div>

            <div className="exhibits-grid">
              {trendingExhibits.map((exhibit, index) => (
                <div key={exhibit.id} className="exhibit-card glass-card slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="exhibit-header">
                    <div className="exhibit-rank">#{index + 1}</div>
                    <div className="exhibit-popularity">
                      <div className="popularity-bar">
                        <div 
                          className="popularity-fill" 
                          style={{width: `${exhibit.popularity}%`}}
                        ></div>
                      </div>
                      <span className="popularity-text">{exhibit.popularity}%</span>
                    </div>
                  </div>

                  <div className="exhibit-content">
                    <h3 className="exhibit-title">{exhibit.title}</h3>
                    <p className="exhibit-department">{exhibit.department}</p>
                    <p className="exhibit-booth">📍 {exhibit.booth}</p>
                    
                    <div className="exhibit-stats">
                      <div className="stat-item">
                        <span className="stat-icon">👥</span>
                        <span className="stat-value">{exhibit.visitors}</span>
                        <span className="stat-label">Visitors</span>
                      </div>
                    </div>

                    <div className="exhibit-tags">
                      {exhibit.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="announcements-section">
            <div className="section-header">
              <h2 className="section-title">📢 Live Announcements</h2>
            </div>

            {/* Current Announcement Spotlight */}
            <div className="current-announcement glass-card">
              <div 
                className="announcement-header"
                style={{ backgroundColor: getAnnouncementColor(announcements[currentAnnouncement].type) }}
              >
                <span className="announcement-icon">
                  {getAnnouncementIcon(announcements[currentAnnouncement].type)}
                </span>
                <span className="announcement-time">
                  {announcements[currentAnnouncement].time}
                </span>
              </div>
              <div className="announcement-content">
                <h3 className="announcement-title">
                  {announcements[currentAnnouncement].title}
                </h3>
                <p className="announcement-message">
                  {announcements[currentAnnouncement].message}
                </p>
              </div>
            </div>

            {/* All Announcements List */}
            <div className="announcements-list glass-card">
              <h3 className="list-title">Recent Updates</h3>
              {announcements.map((announcement, index) => (
                <div 
                  key={announcement.id} 
                  className={`announcement-item ${index === currentAnnouncement ? 'active' : ''}`}
                >
                  <div 
                    className="announcement-type"
                    style={{ backgroundColor: getAnnouncementColor(announcement.type) }}
                  >
                    {getAnnouncementIcon(announcement.type)}
                  </div>
                  <div className="announcement-info">
                    <h4 className="announcement-item-title">{announcement.title}</h4>
                    <p className="announcement-time-text">{announcement.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="stats-footer glass-card">
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">247</div>
              <div className="stat-label">Total Visitors</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">42</div>
              <div className="stat-label">Active Exhibits</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">18</div>
              <div className="stat-label">Live Sessions</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">96%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingPage
