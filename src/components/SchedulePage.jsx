import { useState, useEffect } from 'react'
import { getAllEvents, formatEventForDisplay } from '../eventService'
import './SchedulePage.css'

/**
 * SchedulePage Component
 * 
 * Main component for displaying and managing the event schedule.
 * Features:
 * - Real-time event status updates
 * - Search functionality across event titles and venues
 * - Dynamic status badges with color coding
 * - Responsive event listing with animations
 */
const SchedulePage = () => {
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  // Search and filtering state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(0)
  
  // Event data state
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Real-time updates state
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // ========================================
  // REAL-TIME CLOCK MANAGEMENT
  // ========================================
  
  /**
   * Updates current time every minute for real-time status calculations
   * This ensures event statuses (upcoming/ongoing/completed) stay accurate
   */
  useEffect(() => {
    // Set initial time immediately
    setCurrentTime(new Date())
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // 60 seconds = 1 minute
    
    // Cleanup timer on component unmount
    return () => clearInterval(timer)
  }, [])
  
  // ========================================
  // EVENT STATUS CALCULATION FUNCTIONS
  // ========================================
  
  /**
   * Calculates real-time event status based on current time
   * @param {Object} event - Event object with startDateTime and endDateTime
   * @returns {string} - 'completed', 'ongoing', 'upcoming', or 'unknown'
   */
  const getEventStatus = (event) => {
    const now = currentTime
    
    // Use pre-calculated DateTime objects from eventService if available
    if (event.startDateTime && event.endDateTime) {
      const eventStartDateTime = new Date(event.startDateTime)
      const eventEndDateTime = new Date(event.endDateTime)
      
      // Event has ended
      if (now >= eventEndDateTime) {
        return 'completed'
      } 
      // Event is currently happening
      else if (now >= eventStartDateTime && now < eventEndDateTime) {
        return 'ongoing'
      } 
      // Event hasn't started yet
      else if (now < eventStartDateTime) {
        return 'upcoming'
      }
    }
    
    // Fallback to pre-calculated status from eventService
    return event.status || 'unknown'
  }
  
  /**
   * Calculates human-readable time information for events
   * @param {Object} event - Event object
   * @returns {string} - Time info like "Starts in 2h 30m" or "Ends in 15 minutes"
   */
  const getTimeInfo = (event) => {
    const now = currentTime
    const status = getEventStatus(event)
    
    if (event.startDateTime && event.endDateTime) {
      const eventStartDateTime = new Date(event.startDateTime)
      const eventEndDateTime = new Date(event.endDateTime)
      
      // For upcoming events - show time until start
      if (status === 'upcoming') {
        const diffMs = eventStartDateTime - now
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
        
        if (diffMs <= 0) {
          return 'Starting now!'
        } else if (diffHours > 24) {
          const days = Math.floor(diffHours / 24)
          return `Starts in ${days} day${days > 1 ? 's' : ''}`
        } else if (diffHours > 0) {
          return `Starts in ${diffHours}h ${diffMinutes}m`
        } else if (diffMinutes > 0) {
          return `Starts in ${diffMinutes} minutes`
        } else {
          return 'Starting now!'
        }
      } 
      // For ongoing events - show time until end
      else if (status === 'ongoing') {
        const endDiffMs = eventEndDateTime - now
        const endMinutes = Math.floor(endDiffMs / (1000 * 60))
        
        if (endDiffMs <= 0) {
          return 'Just ended'
        } else if (endMinutes > 60) {
          const endHours = Math.floor(endMinutes / 60)
          return `Ends in ${endHours}h ${endMinutes % 60}m`
        } else if (endMinutes > 0) {
          return `Ends in ${endMinutes} minutes`
        } else {
          return 'Ending now!'
        }
      } 
      // For completed events - show time since end
      else if (status === 'completed') {
        const completedMs = now - eventEndDateTime
        const completedHours = Math.floor(completedMs / (1000 * 60 * 60))
        
        if (completedHours > 24) {
          const days = Math.floor(completedHours / 24)
          return `Ended ${days} day${days > 1 ? 's' : ''} ago`
        } else if (completedHours > 0) {
          return `Ended ${completedHours}h ago`
        } else {
          return 'Just ended'
        }
      }
    }
    
    // Fallback to pre-calculated timeInfo from eventService
    return event.timeInfo || ''
  }
  
  // ========================================
  // UI ENHANCEMENT FUNCTIONS
  // ========================================
  
  /**
   * Creates enhanced status text with time information
   * @param {Object} event - Event object
   * @returns {string} - Enhanced status like "ONGOING • Ends in 30 minutes"
   */
  const getEnhancedStatusText = (event) => {
    const status = getEventStatus(event)
    const timeInfo = getTimeInfo(event)
    
    // Map status to display text
    const baseStatus = {
      'ongoing': 'ONGOING',
      'upcoming': 'UPCOMING',
      'completed': 'COMPLETED'
    }[status] || 'UNKNOWN'
    
    // Combine status with time info if available
    return timeInfo ? `${baseStatus} • ${timeInfo}` : baseStatus
  }
  
  /**
   * Determines status badge color based on event urgency
   * @param {Object} event - Event object
   * @returns {string} - Hex color code for status badge
   */
  const getEnhancedStatusColor = (event) => {
    const status = getEventStatus(event)
    const timeInfo = getTimeInfo(event)
    
    switch(status) {
      case 'ongoing':
        // Red if ending soon (≤15 minutes), green otherwise
        if (timeInfo && (timeInfo.includes('minutes') || timeInfo.includes('Ending now'))) {
          const minutes = parseInt(timeInfo.match(/\d+/)?.[0] || '0')
          if (minutes <= 15) {
            return "#ef4444" // Red - urgent, ending soon
          }
        }
        return "#22c55e" // Green - ongoing, plenty of time
        
      case 'upcoming':
        // Orange if starting very soon, blue otherwise
        if (timeInfo && (timeInfo.includes('minutes') || timeInfo.includes('Starting now'))) {
          return "#f59e0b" // Orange - starting very soon
        }
        return "#3b82f6" // Blue - upcoming
        
      case 'completed':
        return "#6b7280" // Gray - completed
        
      default:
        return "#6b7280" // Default gray for unknown status
    }
  }
  
  // ========================================
  // DATA FETCHING
  // ========================================
  
  /**
   * Fetches events from the database on component mount
   * Handles loading states and error management
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch events from eventService
        const result = await getAllEvents()
        
        if (result.success) {
          // Format events for display with calculated status and time info
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
  }, []) // Empty dependency array - run once on mount
  
  // ========================================
  // SEARCH AND FILTERING
  // ========================================
  
  /**
   * Filters events based on search query
   * Searches in event title and venue fields
   */
  const filteredEvents = events.filter(event => {
    if (!searchQuery.trim()) return true // Show all if no search query
    
    const query = searchQuery.toLowerCase().trim()
    
    return (
      // Search in event title
      event.title.toLowerCase().includes(query) ||
      // Search in venue/location
      event.venue.toLowerCase().includes(query)
    )
  })
  
  /**
   * Updates search results count when filtered events change
   */
  useEffect(() => {
    setSearchResults(filteredEvents.length)
  }, [filteredEvents.length])
  
  /**
   * Forces re-render when hour changes to update event statuses
   * This ensures status calculations stay fresh throughout the day
   */
  useEffect(() => {
    if (events.length > 0) {
      // Trigger re-render by creating new array reference
      setEvents(prevEvents => [...prevEvents])
    }
  }, [currentTime.getHours()]) // Dependency on hour ensures hourly updates
  
  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
  /**
   * Highlights search terms in text with HTML spans
   * @param {string} text - Text to search in
   * @param {string} searchTerm - Term to highlight
   * @returns {JSX.Element|string} - Text with highlighted search terms
   */
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) return text
    
    // Create regex with escaped special characters
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    // Map parts to JSX elements with highlighting
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="search-highlight">{part}</span> : 
        part
    )
  }
  
  /**
   * Clears the search query and resets search state
   */
  const clearSearch = () => {
    setSearchQuery('')
  }
  
  // ========================================
  // RENDER COMPONENT
  // ========================================
  
  return (
    <div className="schedule-page fade-in">
      <div className="schedule-container">
        
        {/* ===== PAGE HEADER SECTION ===== */}
        <div className="schedule-header">
          <h1 className="schedule-title">Event Schedule</h1>
          
          {/* Debug: Current Time Display
          <div style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>
            Current Time: {currentTime.toLocaleString()}
          </div> */}
          
          {/* ===== SEARCH FUNCTIONALITY ===== */}
          <div className="search-container">
            {/* Search Input with Clear Button */}
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {/* Clear Search Button (only shown when there's a query) */}
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
            
            {/* Search Results Information */}
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

        {/* ===== EVENTS DISPLAY SECTION ===== */}
        <div className="events-list">
          {/* Loading State */}
          {loading ? (
            <div className="loading-message">
              <p>Loading events...</p>
            </div>
          ) 
          /* Error State */
          : error ? (
            <div className="error-message">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">
                Retry
              </button>
            </div>
          ) 
          /* Events List */
          : filteredEvents.length > 0 ? (
            // Map through filtered events and render each one
            filteredEvents.map((event, index) => (
              <div 
                key={event.id || index} 
                className="event-row glass-card slide-in" 
                style={{animationDelay: `${index * 0.1}s`}} // Staggered animation
              >
                {/* ===== EVENT STATUS BADGE ===== */}
                <div 
                  className="event-status-badge" 
                  style={{ backgroundColor: getEnhancedStatusColor(event) }}
                >
                  <span className="status-text">
                    {getEnhancedStatusText(event)}
                  </span>
                </div>
                
                {/* ===== EVENT INFORMATION ===== */}
                <div className="event-content">
                  {/* Main Event Info (Title and Duration) */}
                  <div className="event-main-info">
                    <h3 className="event-title">
                      {highlightSearchTerm(event.title, searchQuery)}
                    </h3>
                    <p className="event-duration">
                      Duration: {highlightSearchTerm(event.duration, searchQuery)}
                    </p>
                  </div>
                  
                  {/* Event Details (Location and Time) */}
                  <div className="event-details">
                    {/* Location Information */}
                    <div className="event-location">
                      <span className="location-label">Location</span>
                      <span className="location-value">
                        {highlightSearchTerm(event.venue, searchQuery)}
                      </span>
                    </div>
                    
                    {/* Start Time Information */}
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
          ) 
          /* No Events State */
          : (
            <div className="no-events">
              {searchQuery ? (
                // No search results
                <div>
                  <p>No events found matching "{searchQuery}"</p>
                  <button onClick={clearSearch} className="clear-search-btn-large">
                    Show All Events
                  </button>
                </div>
              ) : (
                // No events at all
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
