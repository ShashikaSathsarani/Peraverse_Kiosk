import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [selectedSection, setSelectedSection] = useState('emergency');

  const emergencyContacts = [
    {
      title: "Emergency Hotline",
      type: "EMERGENCY",
      number: "119",
      description: "National Emergency Services",
      availability: "24/7"
    },
    {
      title: "University Security",
      type: "SECURITY", 
      number: "+94 81 239 4914",
      description: "Campus Security Control Room",
      availability: "24/7"
    },
    {
      title: "Police Emergency",
      type: "POLICE",
      number: "118",
      description: "Sri Lanka Police Emergency",
      availability: "24/7"
    },
    {
      title: "Fire Department",
      type: "FIRE",
      number: "110",
      description: "Fire & Rescue Services",
      availability: "24/7"
    },
    {
      title: "Ambulance Service",
      type: "MEDICAL",
      number: "110",
      description: "Emergency Medical Services",
      availability: "24/7"
    }
  ];

  const medicalCenters = [
    {
      name: "University Medical Center",
      address: "Faculty of Medicine, University of Peradeniya",
      phone: "+94 81 239 2361",
      hours: "8:00 AM - 5:00 PM"
    },
    {
      name: "Peradeniya Teaching Hospital",
      address: "Peradeniya, Kandy",
      phone: "+94 81 238 8000",
      hours: "24/7"
    },
    {
      name: "Kandy General Hospital",
      address: "Kandy City Center",
      phone: "+94 81 222 2261",
      hours: "24/7"
    }
  ];

  const phoneBooths = [
    "Engineering Faculty - Main Entrance",
    "Library Building - Ground Floor",
    "Student Center - Near Cafeteria",
    "Administrative Building - Reception",
    "Hostel Complex - Common Area"
  ];

  const eventInfo = [
    {
      title: "Event Coordinator",
      contact: "+94 81 239 3000",
      email: "coordinator@peraverse.lk"
    },
    {
      title: "Technical Support",
      contact: "+94 81 239 3001",
      email: "tech@peraverse.lk"
    },
    {
      title: "Registration Desk",
      contact: "+94 81 239 3002",
      email: "registration@peraverse.lk"
    }
  ];

  // Function to handle navigation to map page
  const handleViewOnMap = () => {
    // This would typically use React Router or your navigation method
    // For now, we'll use a simple alert to demonstrate
    alert("Navigating to Interactive Map Page with Phone Booth Locations");
    // In a real implementation, you would use:
    // navigate('/map-page?show=phone-booths');
    // or
    // window.location.href = '/map-page?show=phone-booths';
  };

  const renderEmergencyContacts = () => (
    <div className="emergency-grid">
      {emergencyContacts.map((contact, index) => (
        <div key={index} className="emergency-card">
          <div className="emergency-header">
            <h3>{contact.title}</h3>
            <span className={`emergency-badge ${contact.type.toLowerCase()}`}>
              {contact.type}
            </span>
          </div>
          <div className="emergency-number">
            <span className="phone-icon">📞</span>
            <span className="number">{contact.number}</span>
          </div>
          <p className="emergency-description">{contact.description}</p>
          <div className="availability">
            <span className="clock-icon">🕐</span>
            <span>{contact.availability}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMedicalCenters = () => (
    <div className="medical-grid">
      {medicalCenters.map((center, index) => (
        <div key={index} className="medical-card">
          <h3>{center.name}</h3>
          <div className="medical-info">
            <div className="info-row">
              <span className="icon">📍</span>
              <span>{center.address}</span>
            </div>
            <div className="info-row">
              <span className="icon">📞</span>
              <span>{center.phone}</span>
            </div>
            <div className="info-row">
              <span className="icon">🕐</span>
              <span>{center.hours}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPhoneBooths = () => (
    <div className="phone-booth-section">
      <div className="phone-booth-grid">
        {phoneBooths.map((location, index) => (
          <div key={index} className="phone-booth-card">
            <div className="booth-icon-container">
              <span className="booth-icon">📞</span>
            </div>
            <p>{location}</p>
          </div>
        ))}
      </div>
      <div className="map-button-container">
        <button className="map-button" onClick={handleViewOnMap}>
          <span className="map-icon">🗺️</span>
          View on Interactive Map
        </button>
      </div>
    </div>
  );

  const renderEventInfo = () => (
    <div className="event-info-grid">
      {eventInfo.map((info, index) => (
        <div key={index} className="event-info-card">
          <h3>{info.title}</h3>
          <div className="contact-details">
            <div className="contact-row">
              <span className="icon">📞</span>
              <span>{info.contact}</span>
            </div>
            <div className="contact-row">
              <span className="icon">📧</span>
              <span>{info.email}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderImportantInfo = () => (
    <div className="important-info">
      <div className="info-card">
        <div className="info-card-header">
          <span className="info-icon">🚨</span>
          <h3>Emergency Procedures</h3>
        </div>
        <ul>
          <li>In case of fire, evacuate immediately and call 110</li>
          <li>For medical emergencies, call 119 or nearest medical center</li>
          <li>Report security issues to University Security immediately</li>
          <li>Assembly point: Main parking area near Engineering Faculty</li>
        </ul>
      </div>
      <div className="info-card">
        <div className="info-card-header">
          <span className="info-icon">📋</span>
          <h3>Event Guidelines</h3>
        </div>
        <ul>
          <li>Please keep your registration badge visible at all times</li>
          <li>Follow all safety protocols and guidelines</li>
          <li>Report any suspicious activity to security</li>
          <li>Emergency exits are clearly marked throughout the venue</li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(selectedSection) {
      case 'emergency':
        return renderEmergencyContacts();
      case 'medical':
        return renderMedicalCenters();
      case 'phones':
        return renderPhoneBooths();
      case 'event':
        return renderEventInfo();
      case 'important':
        return renderImportantInfo();
      default:
        return renderEmergencyContacts();
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <div className="header-icon-container">
            <span className="header-main-icon">📞</span>
          </div>
          <h1>Emergency & Contact Information</h1>
          <p className="header-subtitle">Faculty of Engineering • University of Peradeniya</p>
        </div>

        <div className="section-buttons">
          <button 
            className={`section-btn ${selectedSection === 'emergency' ? 'active' : ''}`}
            onClick={() => setSelectedSection('emergency')}
          >
            <span className="btn-icon">🚨</span>
            Emergency Contacts
          </button>
          <button 
            className={`section-btn ${selectedSection === 'medical' ? 'active' : ''}`}
            onClick={() => setSelectedSection('medical')}
          >
            <span className="btn-icon">🏥</span>
            Medical Centers
          </button>
          <button 
            className={`section-btn ${selectedSection === 'phones' ? 'active' : ''}`}
            onClick={() => setSelectedSection('phones')}
          >
            <span className="btn-icon">📞</span>
            Phone Booths
          </button>
          <button 
            className={`section-btn ${selectedSection === 'event' ? 'active' : ''}`}
            onClick={() => setSelectedSection('event')}
          >
            <span className="btn-icon">ℹ️</span>
            Event Info
          </button>
          <button 
            className={`section-btn ${selectedSection === 'important' ? 'active' : ''}`}
            onClick={() => setSelectedSection('important')}
          >
            <span className="btn-icon">📋</span>
            Important Info
          </button>
        </div>

        <div className="section-content">
          <div className="section-header">
            <span className="section-icon">
              {selectedSection === 'emergency' && '🚨'}
              {selectedSection === 'medical' && '🏥'}
              {selectedSection === 'phones' && '📞'}
              {selectedSection === 'event' && 'ℹ️'}
              {selectedSection === 'important' && '📋'}
            </span>
            <h2>
              {selectedSection === 'emergency' && 'Emergency Contacts'}
              {selectedSection === 'medical' && 'Medical Centers'}
              {selectedSection === 'phones' && 'Phone Booth Locations'}
              {selectedSection === 'event' && 'Event Information'}
              {selectedSection === 'important' && 'Important Information'}
            </h2>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;