import { useState, useEffect, useRef, useCallback } from 'react'
import HomePage from './components/HomePage'
import SchedulePage from './components/SchedulePage'
import AboutPage from './components/AboutPage'
import MapPage from './components/MapPage'
import ContactPage from './components/ContactPage'
import NotificationsPage from './components/NotificationsPage'
import IntroVideo from './components/IntroVideo'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [showIntroVideo, setShowIntroVideo] = useState(true)
  const inactivityTimerRef = useRef(null)
  const pages = [HomePage, SchedulePage, AboutPage, MapPage, ContactPage, NotificationsPage]

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
    
    const addEventListeners = () => {
      events.forEach(event => {
        document.addEventListener(event, handleUserActivity, true)
      })
    }

    const removeEventListeners = () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true)
      })
    }

    if (!showIntroVideo) {
      addEventListeners()
      handleUserActivity() // Start the timer immediately
    } else {
      removeEventListeners()
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }

    return () => {
      removeEventListeners()
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [showIntroVideo, handleUserActivity])

  const CurrentComponent = pages[currentPage]

  // Show intro video if showIntroVideo is true
  if (showIntroVideo) {
    return <IntroVideo onVideoClick={handleIntroVideoClick} />
  }

  return (
    <div className="app">
      {/* ===== NAVIGATION COMPONENT ===== */}
      <Navigation 
        currentPage={currentPage}
        onPageClick={handlePageClick}
        pages={pages}
      />

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="content-wrapper">
        <div className="page-container">
          <CurrentComponent />
        </div>
        
        {/* ===== FOOTER COMPONENT ===== */}
        <Footer />
      </div>
    </div>
  )
}

export default App
