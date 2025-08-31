import { useState, useEffect, useRef, useCallback } from 'react'
import HomePage from './components/HomePage'
import SchedulePage from './components/SchedulePage'
import TrendingPage from './components/TrendingPage'
import AboutPage from './components/AboutPage'
import MapPage from './components/MapPage'
import IntroVideo from './components/IntroVideo'
import logo from './assets/university-of-peradeniya-logo-png_seeklogo-480462-removebg-preview.png'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showIntroVideo, setShowIntroVideo] = useState(true)
  const inactivityTimerRef = useRef(null)
  const pages = [HomePage, SchedulePage, TrendingPage, AboutPage, MapPage]

  // Handle user activity to reset inactivity timer
  const handleUserActivity = useCallback(() => {
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    
    // Set new timer for 20 seconds
    if (!showIntroVideo) {
      inactivityTimerRef.current = setTimeout(() => {
        setShowIntroVideo(true)
        setCurrentPage(0) // Reset to home page
      }, 20000) // 20 seconds
    }
  }, [showIntroVideo])

  // Handle intro video click
  const handleIntroVideoClick = () => {
    setShowIntroVideo(false)
    setCurrentPage(0) // Start with home page
    handleUserActivity() // Start inactivity timer
  }

  // Handle page navigation
  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex)
    handleUserActivity() // Reset inactivity timer
  }

  // Set up global activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    const resetTimer = () => {
      if (!showIntroVideo) {
        handleUserActivity()
      }
    }

    // Handle special key combination to manually trigger intro video (for testing)
    const handleKeyPress = (e) => {
      // Press 'i' key to manually show intro video (for testing purposes)
      if (e.key === 'i' && e.ctrlKey) {
        setShowIntroVideo(true)
        setCurrentPage(0)
      }
    }

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true)
    })
    document.addEventListener('keydown', handleKeyPress)

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true)
      })
      document.removeEventListener('keydown', handleKeyPress)
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [showIntroVideo, handleUserActivity])

  // Time update effect
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update time every second

    return () => clearInterval(timeInterval)
  }, [])

  const CurrentComponent = pages[currentPage]

  // Show intro video if showIntroVideo is true
  if (showIntroVideo) {
    return <IntroVideo onVideoClick={handleIntroVideoClick} />
  }

  return (
    <div className="app">
      {/* Sidebar Navigation */}
      <div className="sidebar-nav">
        {/* Logo at top of sidebar */}
        <div className="sidebar-logo">
          <img src={logo} alt="University of Peradeniya Logo" />
        </div>
        
        <div className="nav-pages">
          {pages.map((page, index) => {
            const pageNames = ['Home', 'Schedule', 'Trending', 'About', 'Map'];
            // const pageIcons = ['🏠', '📅', '🔥', 'ℹ️', '🗺️'];
            return (
              <div
                key={index}
                className={`nav-item ${index === currentPage ? 'active' : ''}`}
                onClick={() => handlePageClick(index)}
                style={{ cursor: 'pointer' }}
              >
                {/* <span className="nav-item-icon">{pageIcons[index]}</span> */}
                <span className="nav-item-name">{pageNames[index]}</span>
              </div>
            );
          })}
        </div>
        
        {/* Date and Time */}
        <div className="nav-datetime">
          <div className="time-display">
            <span className="time-icon">🕐</span>
            <span className="time-text">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div className="date-display">
            <span className="date-icon">📅</span>
            <span className="date-text">{currentTime.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content-wrapper">
        <div className="page-container">
          <CurrentComponent />
        </div>
        
        {/* Footer */}
        <div className="app-footer">
          <div className="footer-content">
            <p>© 2025 Faculty of Engineering, University of Peradeniya</p>
            <p>PeraVerse Digital Kiosk System</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
