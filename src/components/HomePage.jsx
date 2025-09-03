import './HomePage.css'
import EngexLogo from '../assets/Engex.jpg'

import { useState, useEffect } from 'react'

// Faculty slideshow images + captions
import Img1 from '../assets/background_image.jpg'
import Img2 from '../assets/B-min-scaled.jpg'
import Img3 from '../assets/Faculty75Lightened-scaled.jpeg'
import Img4 from '../assets/FOEdroneView-scaled.jpg'

const HomePage = () => {
  const slides = [
    { image: Img1, caption: "Innovation powering the future" },
    { image: Img2, caption: "Showcasing cutting-edge projects" },
    { image: Img3, caption: "75 Years of Engineering Excellence" },
    { image: Img4, caption: "Aerial view of our Faculty campus" }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3000) // 3 seconds per slide
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="home-page fade-in">
      <div className="home-container">

        {/* ✅ Top section: left column + right column */}
        <div className="top-section glass-card">

          {/* Left column (logo + faculty info) */}
          <div className="left-column">
            <img src={EngexLogo} alt="EngEx Logo" className="left-logo" />
            <p className="faculty-title">Faculty of Engineering</p>
            <p className="university-title">University of Peradeniya</p>
            <p className="event-date-title">August 26, 2025</p>
            <p className="faculty-description">
              Sri Lanka’s oldest and most prestigious engineering institution — shaping
              generations of innovators, leaders, and visionaries for over 75 years.
            </p>
          </div>

          {/* Right column with slideshow + welcome message */}
          <div className="right-column">
            {/* Slideshow box */}
            <div className="slide-box glass-card">
              <img
                src={slides[currentIndex].image}
                alt={`Faculty slideshow ${currentIndex + 1}`}
                className="slide-image"
              />
              <div className="slide-caption">
                {slides[currentIndex].caption}
              </div>
            </div>

            {/* Welcome message */}
            <div className="welcome-box glass-card">
              <h3 className="welcome-title"> Celebrating 75 Years of Excellence!</h3>
              <p className="welcome-text">
                The <strong>Faculty of Engineering, University of Peradeniya</strong> proudly presents 
                <strong> EngEx2025</strong> – The Diamond Jubilee Exhibition.
              </p>
              <p className="welcome-text">
                Discover groundbreaking <strong>research, innovations</strong>, and 
                <strong> future-shaping projects</strong> as we mark this historic milestone 
                in engineering education and impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
