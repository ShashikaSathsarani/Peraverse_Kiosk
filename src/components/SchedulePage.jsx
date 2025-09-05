import { useState, useEffect } from 'react'
import { getAllEvents, formatEventForDisplay } from '../eventService'
import './SchedulePage.css'

const SchedulePage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState(0)
  
  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await getAllEvents()
        
        if (result.success) {
          // Format events for display
          const formattedEvents = result.data.map(formatEventForDisplay)
          setEvents(formattedEvents)
        } else {
          setError(result.error || 'Failed to fetch events')
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvents()
  }, [])

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
      event.type.toLowerCase().includes(query)
    )
  })

  // Update search results count when filtered events change
  useEffect(() => {
    setSearchResults(filteredEvents.length)
  }, [filteredEvents.length])

  // Function to get status color by status string
  // Function to get color for different event statuses
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
                placeholder="Search by title, location..."
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
