import { useState, useEffect } from 'react'
import './HomePage.css'

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Placeholder images - these should be replaced with actual event images
  const slides = [
    {
      image: '/api/placeholder/800/400',
      title: 'Faculty of Engineering',
      subtitle: 'University of Peradeniya'
    },
    {
      image: '/api/placeholder/800/400',
      title: 'Innovation Hub',
      subtitle: 'Cutting-edge Research'
    },
    {
      image: '/api/placeholder/800/400',
      title: 'Student Excellence',
      subtitle: 'Future Engineers'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="home-page fade-in">
      <div className="home-container">
        {/* Main Title Section */}
        <div className="title-section glass-card">
          <h1 className="main-title">
            <span className="title-pera">Pera</span>
            <span className="title-verse">Verse</span>
          </h1>
          <p className="subtitle">Faculty of Engineering</p>
          <p className="university">University of Peradeniya</p>
          <div className="date-time">
            <p className="event-date">August 26, 2025</p>
            <p className="current-time">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Image Slideshow */}
        <div className="slideshow-container glass-card">
          <div className="slideshow-wrapper">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="slide-image-placeholder">
                  <div className="placeholder-content">
                    <h3>{slide.title}</h3>
                    <p>{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slide Indicators */}
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="welcome-section glass-card">
          <h2 className="welcome-title">Welcome to PeraVerse</h2>
          <p className="welcome-text">
            Explore the future of engineering and innovation at the Faculty of Engineering, 
            University of Peradeniya. Discover cutting-edge research, innovative projects, 
            and the next generation of engineering excellence.
          </p>
          <div className="feature-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">🚀</div>
              <span>Innovation</span>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🔬</div>
              <span>Research</span>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🎓</div>
              <span>Excellence</span>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🌟</div>
              <span>Future</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
