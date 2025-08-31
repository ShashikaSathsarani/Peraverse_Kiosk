import { useState } from 'react'
import './SchedulePage.css'

const SchedulePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const scheduleData = [
    {
      time: "1:00PM",
      title: "AI and Machine Learning Workshop",
      venue: "Computer Lab 1",
      type: "workshop",
      duration: "1:00PM - 3:30PM",
      status: "ongoing"
    },
    {
      time: "1:00PM", 
      title: "AI and Machine Learning Workshop",
      venue: "Computer Lab 1",
      type: "workshop",
      duration: "1:00PM - 3:30PM",
      status: "ongoing"
    },
    {
      time: "1:00PM",
      title: "AI and Machine Learning Workshop", 
      venue: "Computer Lab 1",
      type: "workshop",
      duration: "1:00PM - 3:30PM",
      status: "ongoing"
    },
    {
      time: "1:00PM",
      title: "AI and Machine Learning Workshop",
      venue: "Computer Lab 1", 
      type: "workshop",
      duration: "1:00PM - 3:30PM",
      status: "ongoing"
    }
  ]

  const filteredEvents = scheduleData.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status) => {
    const colors = {
      ongoing: "#22c55e",
      upcoming: "#3b82f6", 
      completed: "#6b7280"
    }
    return colors[status] || "#6b7280"
  }

  return (
    <div className="schedule-page fade-in">
      <div className="schedule-container">
        {/* Header */}
        <div className="schedule-header">
          <h1 className="schedule-title">Event Schedule</h1>
          
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Events List - Row by Row */}
        <div className="events-list">
          {filteredEvents.map((event, index) => (
            <div key={index} className="event-row glass-card slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              {/* Status Badge */}
              <div className="event-status-badge" style={{ backgroundColor: getStatusColor(event.status) }}>
                <span className="status-text">ONGOING</span>
              </div>
              
              {/* Event Content */}
              <div className="event-content">
                <div className="event-main-info">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-duration">Duration: {event.duration}</p>
                </div>
                
                <div className="event-details">
                  <div className="event-location">
                    <span className="location-label">Location</span>
                    <span className="location-value">{event.venue}</span>
                  </div>
                  
                  <div className="event-time">
                    <span className="time-label">Start Time</span>
                    <span className="time-value">{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
