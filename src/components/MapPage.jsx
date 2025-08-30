import React, { useState, useRef } from 'react';
import './MapPage.css';
import mapImage from '../assets/map.jpg';

const MapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [showRoutePath, setShowRoutePath] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef(null);

  // Define gate entrance and main road waypoints for path routing
  const gateEntrance = { x: 50.745, y: 92.674 }; // Main gate entrance coordinates
  const mainRoadWaypoints = [
    { x: 50.745, y: 92.674 }, // Gate entrance
    { x: 47.6862, y: 91.3429 }, // Road turn 1
    { x: 46.6666, y: 50.8324 }, // Road turn 2
    { x: 45.8039, y: 29.4117 }, // Central junction
    { x: 42.0392, y: 22.3085 }, // Faculty area junction
  ];

  // Function to generate path waypoints from gate to destination
  const generatePathToLocation = (destination) => {
    const path = [...mainRoadWaypoints];
    
    // Add specific routing based on destination area
    if (destination.coordinates.x < 40) {
      // Left side buildings - route through left path
      path.push({ x: 35, y: 45 });
      path.push({ x: destination.coordinates.x + 5, y: destination.coordinates.y + 5 });
    } else if (destination.coordinates.x > 60) {
      // Right side buildings - route through right path
      path.push({ x: 65, y: 45 });
      path.push({ x: destination.coordinates.x - 5, y: destination.coordinates.y + 5 });
    } else {
      // Central buildings - direct route
      path.push({ x: destination.coordinates.x, y: destination.coordinates.y + 10 });
    }
    
    // Final destination
    path.push(destination.coordinates);
    return path;
  };

  // Campus locations data for Faculty of Engineering, University of Peradeniya
  // Coordinates based on the official campus map layout
  const campusLocations = [
    {
      id: 1,
      name: "Department of Chemical and Process Engineering",
      category: "academic",
      coordinates: { x: 33.8, y:  15.2}, // Building 1 - ADJUST THESE NUMBERS
      description: "Chemical and Process Engineering department with specialized laboratories",
      facilities: ["Process Labs", "Chemical Analysis", "Faculty Offices", "Research Labs"],
      icon: "🏫",
      keywords: ["chemical", "process", "chemistry", "lab", "analysis", "research", "department", "academic"]
    },
    {
      id: 2,
      name: "Department Engineering Mathematics/Computer Center",
      category: "academic", 
      coordinates: { x: 31.4509, y: 21.5316 }, // Building 2
      description: "Engineering Mathematics Department and Computer Center",
      facilities: ["Computer Labs", "Mathematics Labs", "Faculty Offices", "Server Room"],
      icon: "💻",
      keywords: ["math", "mathematics", "computer", "programming", "calculation", "server", "it", "technology"]
    },
    {
      id: 3,
      name: "Drawing Office 1",
      category: "academic",
      coordinates: { x: 31.1372, y: 26.526 }, // Building 3
      description: "Technical drawing and drafting office",
      facilities: ["Drawing Tables", "CAD Workstations", "Plotting Equipment", "Design Tools"],
      icon: "📋",
      keywords: ["drawing", "drafting", "cad", "design", "blueprint", "technical", "plan", "autocad"]
    },
    {
      id: 4,
      name: "Professor E.O.E. Pereira Theatre",
      category: "venue",
      coordinates: { x: 29.8823, y: 34.9611 }, // Building 4
      description: "Main auditorium for events, conferences, and ceremonies",
      facilities: ["Seating for 500", "Audio/Visual Equipment", "Air Conditioning", "Stage"],
      icon: "🎭",
      keywords: ["theatre", "auditorium", "event", "conference", "ceremony", "presentation", "stage", "hall"]
    },
    {
      id: 5,
      name: "Administrative Building",
      category: "academic",
      coordinates: { x: 36.6274, y: 40.2285 }, // Building 5
      description: "Faculty administration and main offices",
      facilities: ["Dean's Office", "Administrative Offices", "Reception", "Meeting Rooms"],
      icon: "🏛️",
      keywords: ["admin", "administration", "office", "dean", "management", "reception", "meeting", "staff"]
    },
    {
      id: 6,
      name: "Security Unit",
      category: "services",
      coordinates: { x: 30.169, y: 46.2819 }, // Building 6
      description: "Campus security and safety services",
      facilities: ["Security Office", "CCTV Monitoring", "Access Control", "Emergency Response"],
      icon: "🛡️",
      keywords: ["security", "safety", "guard", "cctv", "emergency", "access", "control", "protection"]
    },
    {
      id: 7,
      name: "Engineering Library",
      category: "academic",
      coordinates: { x: 23.5294, y: 21.5316 }, // Building 27 on map
      description: "Specialized library with engineering resources and study areas",
      facilities: ["Books & Journals", "Study Rooms", "Digital Resources", "Quiet Zone"],
      icon: "📚",
      keywords: ["library", "books", "study", "research", "journal", "quiet", "reading", "knowledge"]
    },
    {
      id: 8,
      name: "Parking Area A",
      category: "parking",
      coordinates: { x: 18.0392, y: 26.526 }, // Main parking area on left side
      description: "Main parking area for students and staff",
      facilities: ["200 Car Spaces", "Motorcycle Parking", "Security"],
      icon: "🚗",
      keywords: ["parking", "car", "vehicle", "motorcycle", "transport", "space", "lot", "auto"]
    },
    {
      id: 9,
      name: "Department of Civil Engineering",
      category: "academic",
      coordinates: { x: 13.8039, y: 31.1875 }, // Building 1 on map
      description: "Civil and Process Engineering department facilities",
      facilities: ["Lecture Halls", "Civil Labs", "Faculty Offices", "Research Labs"],
      icon: "🏗️",
      keywords: ["civil", "construction", "building", "structure", "concrete", "bridge", "infrastructure", "engineering"]
    },
    {
      id: 10,
      name: "Electrical & Electronics Workshop",
      category: "workshop",
      coordinates: { x: 19.2941, y: 30.9655 }, // Building 10 on map
      description: "Electrical and electronics laboratory facilities",
      facilities: ["Electronics Lab", "Power Systems Lab", "Control Systems", "Testing Equipment"],
      icon: "⚡",
      keywords: ["electrical", "electronics", "power", "circuit", "voltage", "current", "wiring", "systems"]
    },
    {
      id: 11,
      name: "Mechanical Workshop",
      category: "workshop",
      coordinates: { x: 14.3529, y: 35.96 }, // Building 14 on map
      description: "Mechanical engineering workshop and laboratories",
      facilities: ["Machine Tools", "Welding Station", "CAD Lab", "Materials Testing"],
      icon: "⚙️",
      keywords: ["mechanical", "machine", "engine", "welding", "tools", "manufacturing", "gear", "motor"]
    },
    {
      id: 12,
      name: "Surveying Lab",
      category: "academic",
      coordinates: { x: 20.7058, y: 35.96 }, // Building 11 on map
      description: "Surveying and geomatics laboratory",
      facilities: ["Survey Equipment", "GPS Instruments", "Mapping Software", "Field Instruments"],
      icon: "📐",
      keywords: ["survey", "mapping", "gps", "measurement", "coordinates", "location", "geomatics", "field"]
    },
    {
      id: 13,
      name: "Environmental Lab",
      category: "academic",
      coordinates: { x: 17.4901, y: 44.5061 }, // Building 14 on map
      description: "Environmental engineering laboratory",
      facilities: ["Water Testing", "Air Quality Monitoring", "Waste Treatment", "Research Equipment"],
      icon: "🌍",
      keywords: ["environment", "water", "air", "pollution", "waste", "green", "clean", "nature"]
    },
    {
      id: 14,
      name: "Materials Lab",
      category: "academic",
      coordinates: { x: 20.549, y: 49.7225 }, // Building 13 on map
      description: "Materials testing and research laboratory",
      facilities: ["Concrete Testing", "Steel Testing", "Material Analysis", "Quality Control"],
      icon: "🔬",
      keywords: ["materials", "testing", "concrete", "steel", "analysis", "quality", "strength", "lab"]
    },
    {
      id: 15,
      name: "Generator Room",
      category: "services",
      coordinates: { x: 17.3333, y: 54.162 }, // Building 19 on map
      description: "Campus power generation and electrical services",
      facilities: ["Backup Generators", "Electrical Panels", "Maintenance", "Emergency Power"],
      icon: "⚡",
      keywords: ["generator", "power", "electricity", "backup", "emergency", "electrical", "energy", "maintenance"]
    },
    {
      id: 16,
      name: "Electronics Lab",
      category: "academic",
      coordinates: { x: 13.647, y: 58.4905 }, // Building 7
      description: "Electronics and communication laboratory",
      facilities: ["Electronics Equipment", "Circuit Testing", "Communication Labs", "Measurement Tools"],
      icon: "📡",
      keywords: ["electronics", "circuit", "communication", "digital", "analog", "signal", "frequency", "measurement"]
    },
    {
      id: 17,
      name: "Fluids Lab", 
      category: "academic",
      coordinates: { x: 19.4509, y: 58.4905 }, // Building 15
      description: "Fluid mechanics and hydraulics laboratory",
      facilities: ["Flow Testing", "Pump Systems", "Hydraulic Equipment", "Fluid Analysis"],
      icon: "💧",
      keywords: ["fluid", "hydraulic", "pump", "flow", "water", "pressure", "mechanics", "liquid"]
    },
    {
      id: 18,
      name: "New Mechanics Lab",
      category: "academic", 
      coordinates: { x: 17.4901, y: 62.93 }, // Building 16
      description: "Modern mechanics and materials laboratory",
      facilities: ["Testing Machines", "Stress Analysis", "Modern Equipment", "Research Facilities"],
      icon: "⚙️",
      keywords: ["mechanics", "stress", "testing", "analysis", "machine", "modern", "equipment", "research"]
    },
    {
      id: 19,
      name: "Applied Mechanics Lab",
      category: "academic",
      coordinates: { x: 20.549, y: 66.7036 }, // Building 17
      description: "Applied mechanics and structural laboratory", 
      facilities: ["Structural Testing", "Load Testing", "Beam Analysis", "Mechanics Equipment"],
      icon: "🏗️",
      keywords: ["applied", "mechanics", "structural", "load", "beam", "analysis", "testing", "force"]
    },
    {
      id: 20,
      name: "Thermodynamics Lab",
      category: "academic",
      coordinates: { x: 20.549, y: 70.4772 }, // Building 18
      description: "Thermodynamics and heat transfer laboratory",
      facilities: ["Heat Engines", "Thermal Testing", "Energy Systems", "Temperature Control"],
      icon: "🌡️",
      keywords: ["thermodynamics", "heat", "thermal", "temperature", "energy", "engine", "cooling", "heating"]
    },
    {
      id: 21,
      name: "Drawing Office 2",
      category: "academic",
      coordinates: { x: 20.549, y: 76.6925 }, // Building 22
      description: "Second technical drawing office",
      facilities: ["CAD Stations", "Plotting", "Design Software", "Drawing Equipment"],
      icon: "📋",
      keywords: ["drawing", "cad", "design", "plotting", "technical", "blueprint", "drafting", "autocad"]
    },
    {
      id: 22,
      name: "Structures Laboratory",
      category: "academic",
      coordinates: { x: 30.4313, y: 54.162 }, // Building 25
      description: "Structural engineering laboratory",
      facilities: ["Loading Frames", "Structural Testing", "Concrete Lab", "Steel Testing"],
      icon: "🏢",
      keywords: ["structure", "structural", "loading", "frame", "concrete", "steel", "building", "test"]
    },
    {
      id: 23,
      name: "Faculty Canteen",
      category: "dining",
      coordinates: { x: 31.2941, y: 77.6914 }, // Building 29
      description: "Faculty dining facility and cafeteria",
      facilities: ["Food Service", "Seating Area", "Refreshments", "Student Meals"],
      icon: "🍽️",
      keywords: ["canteen", "food", "dining", "meal", "eat", "restaurant", "cafeteria", "lunch"]
    },
    // Exhibition Areas for PeraVerse Event
    {
      id: 24,
      name: "Robotics Exhibition Area",
      category: "exhibition",
      coordinates: { x: 25, y: 35 }, // Main exhibition area
      description: "Robotics and automation exhibition showcase",
      facilities: ["Robot Demonstrations", "AI Showcases", "Interactive Robots", "Competition Arena"],
      icon: "🤖",
      keywords: ["robo", "robot", "robotics", "automation", "ai", "artificial intelligence", "machine"]
    },
    {
      id: 25,
      name: "Computer Science Exhibition",
      category: "exhibition", 
      coordinates: { x: 31.4509, y: 21.5316 }, // At Computer Center
      description: "Computer science and software development exhibition",
      facilities: ["Software Demos", "Programming Contests", "Tech Talks", "VR/AR Experiences"],
      icon: "💻",
      keywords: ["computer", "software", "programming", "coding", "tech", "it", "development", "app"]
    },
    {
      id: 26,
      name: "Engineering Innovation Hub",
      category: "exhibition",
      coordinates: { x: 29.8823, y: 34.9611 }, // At Theatre
      description: "Engineering innovations and project showcase",
      facilities: ["Student Projects", "Innovation Displays", "Startup Showcase", "Industry Partners"],
      icon: "⚙️",
      keywords: ["innovation", "engineering", "project", "startup", "invention", "design", "research"]
    },
    {
      id: 27,
      name: "Green Technology Exhibition",
      category: "exhibition",
      coordinates: { x: 17.4901, y: 44.5061 }, // At Environmental Lab area
      description: "Sustainable technology and environmental solutions",
      facilities: ["Solar Projects", "Waste Management", "Green Energy", "Sustainability"],
      icon: "🌱",
      keywords: ["green", "solar", "environment", "sustainable", "energy", "renewable", "eco"]
    },
    {
      id: 28,
      name: "Civil Engineering Showcase",
      category: "exhibition",
      coordinates: { x: 13.8039, y: 31.1875 }, // At Civil Engineering
      description: "Civil engineering projects and infrastructure models",
      facilities: ["Structure Models", "Bridge Designs", "Urban Planning", "Construction Tech"],
      icon: "🏗️",
      keywords: ["civil", "construction", "bridge", "building", "infrastructure", "urban", "structure"]
    },
    {
      id: 29,
      name: "Electronics & Communication Hub",
      category: "exhibition",
      coordinates: { x: 19.2941, y: 30.9655 }, // At Electronics Workshop
      description: "Electronics, communication and IoT exhibition",
      facilities: ["IoT Devices", "Communication Systems", "Circuit Demos", "Smart Home"],
      icon: "📡",
      keywords: ["electronics", "communication", "iot", "circuit", "wireless", "sensor", "smart"]
    },
    {
      id: 30,
      name: "Mechanical Engineering Exhibition",
      category: "exhibition",
      coordinates: { x: 14.3529, y: 35.96 }, // At Mechanical Workshop
      description: "Mechanical engineering and manufacturing showcase",
      facilities: ["3D Printing", "Manufacturing", "Automotive", "Machinery Demos"],
      icon: "⚙️",
      keywords: ["mechanical", "manufacturing", "3d print", "automotive", "machine", "engine", "mechanics"]
    }
  ];

  const categoryColors = {
    academic: "#3b82f6",
    venue: "#ef4444", 
    workshop: "#f59e0b",
    student: "#8b5cf6",
    dining: "#10b981",
    parking: "#6b7280",
    recreation: "#f97316",
    services: "#ec4899",
    exhibition: "#ff6b35"
  };

  // Keyword mapping for search functionality
  const searchByKeywords = (query) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return campusLocations;

    return campusLocations.filter(location => {
      // Check if location has keywords array
      if (location.keywords) {
        const keywordMatch = location.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm) || 
          searchTerm.includes(keyword.toLowerCase())
        );
        if (keywordMatch) return true;
      }

      // Default search in name, category, description
      return location.name.toLowerCase().includes(searchTerm) ||
             location.category.toLowerCase().includes(searchTerm) ||
             location.description.toLowerCase().includes(searchTerm);
    });
  };

  // Generate search suggestions
  const generateSuggestions = (query) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm || searchTerm.length < 2) return [];

    const matchedLocations = campusLocations.filter(location => {
      // Check keywords first
      if (location.keywords) {
        const keywordMatch = location.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );
        if (keywordMatch) return true;
      }

      // Check name
      return location.name.toLowerCase().includes(searchTerm);
    });

    // Return top 5 suggestions
    return matchedLocations.slice(0, 5);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click - auto navigate to location
  const handleSuggestionClick = (location) => {
    setSearchQuery(location.name);
    setSelectedLocation(location);
    setShowDirections(false);
    setShowRoutePath(true);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const filteredLocations = searchByKeywords(searchQuery);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowDirections(false);
    setShowRoutePath(true); // Show blue path line to destination
  };

  const handleGetDirections = (location) => {
    setShowDirections(true);
    setSelectedLocation(location);
    setShowRoutePath(true); // Also show path when getting directions
  };

  const clearSelection = () => {
    setSelectedLocation(null);
    setShowDirections(false);
    setHoveredLocation(null);
    setShowRoutePath(false); // Hide path lines
  };

  return (
    <div className="map-page">
      <div className="map-container">
        <div className="map-header">
          <h1 className="map-title">
            <span className="title-icon">🗺️</span>
            Interactive Campus Navigation
          </h1>
          <p className="page-subtitle">Faculty of Engineering • University of Peradeniya</p>
        </div>

        {/* Search and Controls */}
        <div className="map-controls">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search exhibitions (robo, computer, green...) or locations..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length >= 2 && setSuggestions(generateSuggestions(searchQuery)) && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="search-input"
            />
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((location) => (
                  <div
                    key={location.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(location)}
                  >
                    <span className="suggestion-icon">{location.icon}</span>
                    <div className="suggestion-content">
                      <div className="suggestion-name">{location.name}</div>
                      <div className="suggestion-category">{location.category}</div>
                    </div>
                    <span className="suggestion-arrow">→</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="map-legend">
            <h4>Location Categories</h4>
            <div className="legend-items">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="legend-item">
                  <div 
                    className="legend-dot" 
                    style={{ backgroundColor: color }}
                  ></div>
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="map-content">
          {/* Interactive Map */}
          <div className="interactive-map-container">
            <div className="map-viewport" ref={mapRef}>
              <img 
                src={mapImage} 
                alt="University of Peradeniya Campus Map" 
                className="base-map-image"
              />
              
              {/* Location Markers */}
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`location-marker ${selectedLocation?.id === location.id ? 'selected' : ''} ${hoveredLocation?.id === location.id ? 'hovered' : ''}`}
                  style={{
                    left: `${location.coordinates.x}%`,
                    top: `${location.coordinates.y}%`,
                    backgroundColor: categoryColors[location.category]
                  }}
                  onClick={() => handleLocationClick(location)}
                  onMouseEnter={() => setHoveredLocation(location)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  title={location.name}
                >
                  <span className="marker-icon">{location.icon}</span>
                  <div className="marker-label">{location.name}</div>
                </div>
              ))}

              {/* Gate Entrance Marker */}
              <div
                className="gate-marker"
                style={{
                  left: `${gateEntrance.x}%`,
                  top: `${gateEntrance.y}%`,
                }}
              >
                <span className="gate-icon">🚪</span>
                <div className="gate-label">Main Entrance</div>
              </div>

              {/* Blue Route Path Lines */}
              {showRoutePath && selectedLocation && (
                <svg className="route-path-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {(() => {
                    const pathPoints = generatePathToLocation(selectedLocation);
                    const pathData = pathPoints.map((point, index) => 
                      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                    ).join(' ');
                    
                    return (
                      <>
                        {/* Animated blue route line */}
                        <path
                          d={pathData}
                          className="route-line"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="0.8"
                          strokeDasharray="2 1"
                          strokeLinecap="round"
                        />
                        {/* Route waypoint dots */}
                        {pathPoints.map((point, index) => (
                          <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="0.3"
                            fill="#1d4ed8"
                            className="route-waypoint"
                          />
                        ))}
                        {/* Animated direction arrow */}
                        <circle
                          cx={selectedLocation.coordinates.x}
                          cy={selectedLocation.coordinates.y}
                          r="1.5"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="0.3"
                          className="destination-pulse"
                        />
                      </>
                    );
                  })()}
                </svg>
              )}

              {/* Location Popup */}
              {hoveredLocation && !selectedLocation && (
                <div 
                  className="location-popup"
                  style={{
                    left: `${hoveredLocation.coordinates.x}%`,
                    top: `${hoveredLocation.coordinates.y - 10}%`
                  }}
                >
                  <h4>{hoveredLocation.name}</h4>
                  <p>{hoveredLocation.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Location Details Panel */}
          <div className="location-details">
            {selectedLocation ? (
              <div className="selected-location">
                <div className="location-header">
                  <div className="location-title">
                    <span className="location-icon">{selectedLocation.icon}</span>
                    <h3>{selectedLocation.name}</h3>
                  </div>
                  <button className="close-button" onClick={clearSelection}>✕</button>
                </div>
                
                <div className="location-info">
                  <p className="location-description">{selectedLocation.description}</p>
                  
                  <div className="location-category">
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: categoryColors[selectedLocation.category] }}
                    >
                      {selectedLocation.category.charAt(0).toUpperCase() + selectedLocation.category.slice(1)}
                    </span>
                  </div>

                  <div className="facilities">
                    <h4>Available Facilities</h4>
                    <ul className="facilities-list">
                      {selectedLocation.facilities.map((facility, index) => (
                        <li key={index} className="facility-item">
                          <span className="facility-icon">✓</span>
                          {facility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="location-actions">
                    <button 
                      className="directions-button"
                      onClick={() => handleGetDirections(selectedLocation)}
                    >
                      <span className="button-icon">🧭</span>
                      Get Directions
                    </button>
                  </div>

                  {showDirections && (
                    <div className="directions-panel">
                      <h4>🧭 Directions to {selectedLocation.name}</h4>
                      <div className="route-info">
                        <p><strong>🔵 Blue line shows the recommended route from main gate to your destination</strong></p>
                      </div>
                      <div className="directions-steps">
                        <div className="direction-step">
                          <span className="step-number">1</span>
                          <span>Enter through the main gate (green marker 🚪)</span>
                        </div>
                        <div className="direction-step">
                          <span className="step-number">2</span>
                          <span>Follow the blue route line on the map</span>
                        </div>
                        <div className="direction-step">
                          <span className="step-number">3</span>
                          <span>Look for the {selectedLocation.icon} symbol at your destination</span>
                        </div>
                        <div className="direction-step">
                          <span className="step-number">4</span>
                          <span>Red pulsing circle marks your final destination</span>
                        </div>
                      </div>
                      <div className="directions-note">
                        <p><strong>Note:</strong> Follow campus roads and walkways. For assistance, contact security at the main gate.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="default-info">
                <h3>🎯 Campus Navigation System</h3>
                <p>Welcome to the interactive campus map for the Faculty of Engineering, University of Peradeniya.</p>
                
                <div className="usage-instructions">
                  <h4>How to Use:</h4>
                  <ul>
                    <li><strong>Click</strong> on any marker to view detailed information</li>
                    <li><strong>Hover</strong> over markers for quick preview</li>
                    <li><strong>Search</strong> for specific locations or facilities</li>
                    <li><strong>Filter</strong> by category using the legend</li>
                  </ul>
                </div>

                <div className="quick-stats">
                  <div className="stat-item">
                    <span className="stat-number">{campusLocations.length}</span>
                    <span className="stat-label">Campus Locations</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{Object.keys(categoryColors).length}</span>
                    <span className="stat-label">Categories</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Access Locations */}
        <div className="quick-access">
          <h3>📍 Quick Access Locations</h3>
          <div className="quick-locations">
            {campusLocations.slice(0, 6).map((location) => (
              <button
                key={location.id}
                className="quick-location-button"
                onClick={() => handleLocationClick(location)}
                style={{ borderLeft: `4px solid ${categoryColors[location.category]}` }}
              >
                <span className="quick-icon">{location.icon}</span>
                <span className="quick-name">{location.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
