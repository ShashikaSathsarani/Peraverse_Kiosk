import { useState, useEffect } from 'react'
import { getAllEvents, getEventsWithinHour, formatEventForDisplay } from '../eventService'
import './SchedulePage.css'

const SchedulePage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [currentEvents, setCurrentEvents] = useState([]) // Events within an hour
  const [allEvents, setAllEvents] = useState([]) // All events for search
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState(0)
  
  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch both current events and all events
        const [currentResult, allResult] = await Promise.all([
          getEventsWithinHour(),
          getAllEvents()
        ])
        
        if (currentResult.success && allResult.success) {
          // Format events for display
          const formattedCurrentEvents = currentResult.data.map(formatEventForDisplay)
          const formattedAllEvents = allResult.data.map(formatEventForDisplay)
          
          setCurrentEvents(formattedCurrentEvents)
          setAllEvents(formattedAllEvents)
        } else {
          setError(currentResult.error || allResult.error || 'Failed to fetch events')
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvents()
    
    // Set up interval to refresh events every minute
    const interval = setInterval(fetchEvents, 60000) // Refresh every minute
    
    return () => clearInterval(interval)
  }, [])

  // Enhanced filter function - searches in all events when there's a query
  const getDisplayEvents = () => {
    if (!searchQuery.trim()) {
      // No search query - show only current/upcoming events
      return currentEvents
    }
    
    // Search query exists - search through all events
    const query = searchQuery.toLowerCase().trim()
    
    return allEvents.filter(event => (
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
    ))
  }

  const displayEvents = getDisplayEvents()

  // Update search results count when display events change
  useEffect(() => {
    setSearchResults(displayEvents.length)
  }, [displayEvents.length])

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
          <h1 className="schedule-title">
            {searchQuery ? 'Event Search Results' : 'Current & Upcoming Events'}
          </h1>
          {/* <p className="schedule-subtitle">
            {searchQuery 
              ? `Searching all events for "${searchQuery}"`
              : 'Events happening now or starting within the next hour'
            }
          </p> */}
          
          {/* Enhanced Search Input */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search all events by title, location..."
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
          ) : displayEvents.length > 0 ? (
            // Map through display events and show each one
            displayEvents.map((event, index) => (
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
            // Show appropriate message based on search state
            <div className="no-events">
              {searchQuery ? (
                <div>
                  <p>No events found matching "{searchQuery}"</p>
                  <button onClick={clearSearch} className="clear-search-btn-large">
                    Show Current Events
                  </button>
                </div>
              ) : (
                <div>
                  <p>No events are currently happening or starting within the next hour.</p>
                  <p className="next-events-hint">Use the search bar to find other events!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
