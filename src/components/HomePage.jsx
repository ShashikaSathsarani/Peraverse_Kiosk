import './HomePage.css'
import EngexLogo from '../assets/Engex.jpg'

const HomePage = () => {
  return (
    <div className="home-page fade-in">
      <div className="home-container">
        {/* ✅ Top Section with Logo + Info */}
        <div className="top-section glass-card">
          <div className="logo-side">
            <img src={EngexLogo} alt="EngEx Logo" className="pera-logo" />
          </div>
          <div className="text-side">
            <p className="subtitle">Faculty of Engineering</p>
            <p className="university">University of Peradeniya</p>
            <div className="date-time">
              <p className="event-date">August 26, 2025</p>
            </div>
          </div>
        </div>

        {/* ✅ Description Section */}
        <div className="description-section glass-card">
          <h2 className="description-title">EngEx Exhibition 2025</h2>
          <p className="description-text">
            The <strong>Peraverse Exhibition 2025</strong> is a celebration of
            innovation and engineering excellence, proudly hosted by the Faculty
            of Engineering, University of Peradeniya. This grand event coincides
            with the <strong>75th Anniversary</strong> of the Faculty, the
            nation’s oldest and most prestigious engineering institution. It
            showcases groundbreaking research, creative student projects, and
            visionary solutions shaping the future of engineering in Sri Lanka
            and beyond.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
