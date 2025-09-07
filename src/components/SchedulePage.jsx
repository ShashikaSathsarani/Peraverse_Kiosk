import { useState, useEffect } from 'react'
import './SchedulePage.css'

const SchedulePage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState(0)
  
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('http://localhost:5000/events')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Format events for display
        const formattedEvents = data.map(formatEventForDisplay)
        setEvents(formattedEvents)
        
      } catch (err) {
        setError(err.message || 'Failed to fetch events')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvents()
  }, [])

  // Format event data from API response to match component expectations
  const formatEventForDisplay = (event) => {
    const now = new Date()
    const eventDate = new Date(`${event.date}T${event.start_time}`)
    const eventEndDate = new Date(`${event.date}T${event.end_time}`)
    
    // Determine event status
    let status = 'upcoming'
    if (now >= eventDate && now <= eventEndDate) {
      status = 'ongoing'
    } else if (now > eventEndDate) {
      status = 'completed'
    }
    
    // Format time display
    const formatTime = (timeString) => {
      const time = new Date(`2000-01-01T${timeString}`)
      return time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
    
    // Calculate duration
    const startTime = new Date(`2000-01-01T${event.start_time}`)
    const endTime = new Date(`2000-01-01T${event.end_time}`)
    const durationMs = endTime - startTime
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60))
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    
    let durationText = ''
    if (durationHours > 0) {
      durationText += `${durationHours}h `
    }
    if (durationMinutes > 0) {
      durationText += `${durationMinutes}m`
    }
    
    return {
      id: event.event_id,
      title: event.event_title,
      venue: event.department_subzone_name || 'TBA',
      time: formatTime(event.start_time),
      duration: durationText || '1h',
      status: status,
      type: event.category || 'General',
      description: event.description || '',
      date: event.date,
      start_time: event.start_time,
      end_time: event.end_time,
      admin_name: event.admin_name
    }
  }

  // Enhanced filter function - searches in multiple fields
  const filteredEvents = events.filter(event => {
    if (!searchQuery.trim()) return true
    
    const query = searchQuery.toLowerCase().trim()
    
    return (
      // Search in title
      event.title.toLowerCase().includes(query) ||
      // Search in venue/location
      event.venue.toLowerCase().includes(query) ||
      // Search in time
      event.time.toLowerCase().includes(query) ||
      // Search in duration
      event.duration.toLowerCase().includes(query) ||
      // Search in status
      event.status.toLowerCase().includes(query) ||
      // Search in event type
      event.type.toLowerCase().includes(query) ||
      // Search in description
      event.description.toLowerCase().includes(query) ||
      // Search in admin name
      event.admin_name.toLowerCase().includes(query)
    )
  })

  // Update search results count when filtered events change
  useEffect(() => {
    setSearchResults(filteredEvents.length)
  }, [filteredEvents.length])

  // Function to get status color by status string
  const getStatusColor = (status) => {
    switch(status) {
      case 'ongoing': return "#22c55e"   // Green for ongoing events
      case 'upcoming': return "#3b82f6"  // Blue for upcoming events
      case 'completed': return "#6b7280" // Gray for completed events
      default: return "#6b7280"          // Default gray
    }
  }
  
  // Function to get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'ongoing': return "ONGOING"
      case 'upcoming': return "UPCOMING"
      case 'completed': return "COMPLETED"
      default: return "UNKNOWN"
    }
  }

  // Function to highlight search terms in text
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) return text
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="search-highlight">{part}</span> : 
        part
    )
  }

  // Clear search function
  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="schedule-page fade-in">
      <div className="schedule-container">
        
        {/* Page Header Section */}
        <div className="schedule-header">
          <h1 className="schedule-title">Event Schedule</h1>
          
          {/* Enhanced Search Input */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, location, admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="clear-search-btn"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Search Results Info */}
            {searchQuery && (
              <div className="search-info">
                {searchResults > 0 ? (
                  <span className="search-results">
                    Found {searchResults} event{searchResults !== 1 ? 's' : ''} matching "{searchQuery}"
                  </span>
                ) : (
                  <span className="no-search-results">
                    No events found matching "{searchQuery}"
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Events Display Section */}
        <div className="events-list">
          {loading ? (
            <div className="loading-message">
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">
                Retry
              </button>
            </div>
          ) : filteredEvents.length > 0 ? (
            // Map through filtered events and display each one
            filteredEvents.map((event, index) => (
              <div 
                key={event.id || index} 
                className="event-row glass-card slide-in" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Status Badge (Green/Blue/Gray circle) */}
                <div 
                  className="event-status-badge" 
                  style={{ backgroundColor: getStatusColor(event.status) }}
                >
                  <span className="status-text">
                    {getStatusText(event.status)}
                  </span>
                </div>
                
                {/* Event Information */}
                <div className="event-content">
                  {/* Main event info (title and duration) */}
                  <div className="event-main-info">
                    <h3 className="event-title">
                      {highlightSearchTerm(event.title, searchQuery)}
                    </h3>
                    <p className="event-duration">
                      Duration: {highlightSearchTerm(event.duration, searchQuery)}
                    </p>
                    {event.description && (
                      <p className="event-description">
                        {highlightSearchTerm(event.description, searchQuery)}
                      </p>
                    )}
                  </div>
                  
                  {/* Event details (location and time) */}
                  <div className="event-details">
                    <div className="event-location">
                      <span className="location-label">Location</span>
                      <span className="location-value">
                        {highlightSearchTerm(event.venue, searchQuery)}
                      </span>
                    </div>
                    
                    <div className="event-time">
                      <span className="time-label">Start Time</span>
                      <span className="time-value">
                        {highlightSearchTerm(event.time, searchQuery)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show message when no events match the search
            <div className="no-events">
              {searchQuery ? (
                <div>
                  <p>No events found matching "{searchQuery}"</p>
                  <button onClick={clearSearch} className="clear-search-btn-large">
                    Show All Events
                  </button>
                </div>
              ) : (
                <p>No events available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
