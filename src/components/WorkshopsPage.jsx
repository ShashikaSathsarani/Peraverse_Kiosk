import { useState, useEffect } from 'react'
import './WorkshopsPage.css'

const WorkshopsPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  const workshops = [
    {
      id: 1,
      title: "AI & Machine Learning Fundamentals",
      instructor: "Dr. Samantha De Silva",
      time: "09:00 - 11:00",
      room: "Conference Hall A",
      duration: "2 hours",
      capacity: 50,
      registered: 42,
      difficulty: "Beginner",
      topics: ["Introduction to AI", "ML Algorithms", "Python Basics"],
      description: "Learn the fundamentals of artificial intelligence and machine learning."
    },
    {
      id: 2,
      title: "Sustainable Engineering Solutions",
      instructor: "Prof. Rajesh Kumar",
      time: "11:30 - 13:30",
      room: "Workshop Lab B",
      duration: "2 hours",
      capacity: 30,
      registered: 28,
      difficulty: "Intermediate",
      topics: ["Green Technology", "Renewable Energy", "Environmental Impact"],
      description: "Explore innovative approaches to sustainable engineering."
    },
    {
      id: 3,
      title: "Robotics & Automation",
      instructor: "Dr. Priya Mendis",
      time: "14:00 - 16:00",
      room: "Robotics Lab C",
      duration: "2 hours",
      capacity: 25,
      registered: 25,
      difficulty: "Advanced",
      topics: ["Robot Programming", "Sensor Integration", "Automation Systems"],
      description: "Hands-on experience with robotic systems and automation."
    },
    {
      id: 4,
      title: "IoT & Smart Cities",
      instructor: "Dr. Chamara Fernando",
      time: "19:00 - 21:00",
      room: "Smart Lab E",
      duration: "2 hours",
      capacity: 40,
      registered: 35,
      difficulty: "Intermediate",
      topics: ["IoT Devices", "Smart Infrastructure", "Data Analytics"],
      description: "Discover how IoT technology is transforming urban environments."
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getCurrentStatus = (timeSlot) => {
    const now = currentTime
    const [startTime, endTime] = timeSlot.split(' - ')
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    
    const currentHour = now.getHours()
    const currentMin = now.getMinutes()
    
    const currentMinutes = currentHour * 60 + currentMin
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    
    if (currentMinutes < startMinutes) {
      return 'upcoming'
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return 'ongoing'
    } else {
      return 'completed'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981'
      case 'Intermediate': return '#f59e0b'
      case 'Advanced': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#3b82f6'
      case 'ongoing': return '#10b981'
      case 'completed': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Upcoming'
      case 'ongoing': return 'Live Now'
      case 'completed': return 'Completed'
      default: return 'Unknown'
    }
  }

  return (
    <div className="workshops-page">
      <div className="workshops-container">
        {/* Header */}
        <div className="workshops-header">
          <h1 className="workshops-title">🛠️ Today's Workshops</h1>
        </div>

        {/* Workshops Grid */}
        <div className="workshops-grid">
          {workshops.map((workshop) => {
            const status = getCurrentStatus(workshop.time)
            const fillPercentage = (workshop.registered / workshop.capacity) * 100
            
            return (
              <div key={workshop.id} className={`workshop-card glass-card ${status}`}>
                {/* Status Badge */}
                <div className="workshop-status" style={{ backgroundColor: getStatusColor(status) }}>
                  <span className="status-text">{getStatusText(status)}</span>
                </div>

                {/* Workshop Header */}
                <div className="workshop-header">
                  <h3 className="workshop-title">{workshop.title}</h3>
                  <div className="workshop-meta">
                    <span className="workshop-time">⏰ {workshop.time}</span>
                    <span className="workshop-room">📍 {workshop.room}</span>
                  </div>
                </div>

                {/* Workshop Details */}
                <div className="workshop-details">
                  <div className="instructor-info">
                    <span className="instructor-label">Instructor:</span>
                    <span className="instructor-name">{workshop.instructor}</span>
                  </div>
                  
                  <div className="workshop-stats">
                    <div className="stat-item">
                      <span className="stat-label">Duration:</span>
                      <span className="stat-value">{workshop.duration}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Difficulty:</span>
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(workshop.difficulty) }}
                      >
                        {workshop.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Registration Status */}
                  <div className="registration-status">
                    <div className="registration-header">
                      <span className="registration-text">
                        {workshop.registered} / {workshop.capacity} registered
                      </span>
                      <span className="registration-percentage">
                        {Math.round(fillPercentage)}%
                      </span>
                    </div>
                    <div className="registration-bar">
                      <div 
                        className="registration-fill"
                        style={{ 
                          width: `${fillPercentage}%`,
                          backgroundColor: fillPercentage >= 90 ? '#ef4444' : fillPercentage >= 70 ? '#f59e0b' : '#10b981'
                        }}
                      />
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="workshop-topics">
                    <span className="topics-label">Topics:</span>
                    <div className="topics-list">
                      {workshop.topics.map((topic, index) => (
                        <span key={index} className="topic-tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="workshop-description">{workshop.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Footer */}
        <div className="workshops-summary">
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-number">{workshops.length}</span>
              <span className="summary-label">Total Workshops</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">
                {workshops.filter(w => getCurrentStatus(w.time) === 'ongoing').length}
              </span>
              <span className="summary-label">Currently Live</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">
                {workshops.reduce((sum, w) => sum + w.registered, 0)}
              </span>
              <span className="summary-label">Total Participants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkshopsPage
