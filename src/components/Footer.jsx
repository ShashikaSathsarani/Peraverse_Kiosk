import './Footer.css'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-left">
            <h3 className="footer-title">University of Peradeniya</h3>
            <p className="footer-description">
              Leading the way in engineering education and innovation in Sri Lanka since 1961. Join us in 
              exploring the frontiers of technology and engineering excellence.
            </p>
          </div>
          <div className="footer-right">
            <img src={logo} alt="University of Peradeniya Logo" className="footer-logo" />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 Faculty of Engineering</span>
          <span>•</span>
          <span>University of Peradeniya</span>
          <span>•</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
