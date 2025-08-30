import './SchedulePage.css'

const SchedulePage = () => {
  const scheduleData = [
    {
      time: "09:00 AM",
      title: "Opening Ceremony",
      venue: "Main Auditorium",
      type: "ceremony"
    },
    {
      time: "09:30 AM",
      title: "Keynote Speech: Future of Engineering",
      venue: "Main Auditorium",
      type: "keynote"
    },
    {
      time: "10:30 AM",
      title: "AI & Machine Learning Workshop",
      venue: "Computer Lab 1",
      type: "workshop"
    },
    {
      time: "10:30 AM",
      title: "Robotics Exhibition",
      venue: "Engineering Hall",
      type: "exhibition"
    },
    {
      time: "11:30 AM",
      title: "Sustainable Energy Panel",
      venue: "Conference Room A",
      type: "panel"
    },
    {
      time: "12:00 PM",
      title: "Networking Lunch",
      venue: "Cafeteria",
      type: "break"
    },
    {
      time: "01:00 PM",
      title: "Innovation Showcase",
      venue: "Exhibition Hall",
      type: "exhibition"
    },
    {
      time: "02:00 PM",
      title: "3D Printing Workshop",
      venue: "Maker Space",
      type: "workshop"
    },
    
  ]

  const getTypeIcon = (type) => {
    const icons = {
      ceremony: "🎉",
      keynote: "🎤",
      workshop: "🛠️",
      exhibition: "🏛️",
      panel: "💬",
      break: "☕",
      demo: "💻",
      competition: "🏆",
      session: "👥"
    }
    return icons[type] || "📅"
  }

  const getTypeColor = (type) => {
    const colors = {
      ceremony: "rgba(239, 68, 68, 0.8)",
      keynote: "rgba(168, 85, 247, 0.8)",
      workshop: "rgba(34, 197, 94, 0.8)",
      exhibition: "rgba(59, 130, 246, 0.8)",
      panel: "rgba(245, 158, 11, 0.8)",
      break: "rgba(156, 163, 175, 0.8)",
      demo: "rgba(20, 184, 166, 0.8)",
      competition: "rgba(244, 63, 94, 0.8)",
      session: "rgba(139, 92, 246, 0.8)"
    }
    return colors[type] || "rgba(96, 165, 250, 0.8)"
  }

  return (
    <div className="schedule-page fade-in">
      <div className="schedule-container">
        <div className="schedule-header">
          <h1 className="schedule-title">📅 Event Schedule</h1>
        </div>

        <div className="schedule-grid">
          {scheduleData.map((event, index) => (
            <div key={index} className="schedule-item glass-card slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="event-time">
                <span className="time-text">{event.time}</span>
              </div>
              
              <div className="event-content">
                <div className="event-header">
                  <div 
                    className="event-type-indicator"
                    style={{ backgroundColor: getTypeColor(event.type) }}
                  >
                    <span className="type-icon">{getTypeIcon(event.type)}</span>
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-venue">📍 {event.venue}</p>
                  </div>
                </div>
              </div>

              <div className="event-status">
                {(() => {
                  const now = new Date()
                  const currentTime = now.getHours() * 60 + now.getMinutes()
                  const [eventHour, eventMinute] = event.time.includes('PM') && !event.time.includes('12:') 
                    ? [parseInt(event.time.split(':')[0]) + 12, parseInt(event.time.split(':')[1])]
                    : [parseInt(event.time.split(':')[0]), parseInt(event.time.split(':')[1])]
                  const eventTime = eventHour * 60 + eventMinute

                  if (currentTime < eventTime) {
                    return <span className="status upcoming">Upcoming</span>
                  } else if (currentTime >= eventTime && currentTime <= eventTime + 60) {
                    return <span className="status live">Live Now</span>
                  } else {
                    return <span className="status completed">Completed</span>
                  }
                })()}
              </div>
            </div>
          ))}
        </div>

        <div className="schedule-footer glass-card">
          <div className="legend">
            <h3>Event Types</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-icon">🎉</span>
                <span>Ceremony</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon">🛠️</span>
                <span>Workshop</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon">🏛️</span>
                <span>Exhibition</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon">🏆</span>
                <span>Competition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
