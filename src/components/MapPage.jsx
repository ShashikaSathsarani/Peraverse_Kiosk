import React, { useState } from 'react';
import './MapPage.css';
// import mapImage from '../assets/map.jpg';

const MapPage = () => {
  const [mapData] = useState(null);

  return (
    <div className="map-page">
      <div className="map-container">
        <div className="map-header">
          <h1 className="map-title">
            Interactive Campus Navigation
          </h1>
          <p className="page-subtitle">Faculty of Engineering • University of Peradeniya</p>
        </div>

        {/* Map Display Container */}
        <div className="map-display-container">
          {mapData ? (
            <div className="imported-map">
              <h3>Imported Map</h3>
              <div className="map-content">
                {/* This is where the actual map will be rendered */}
                {mapData.mapUrl ? (
                  <img 
                    src={mapData.mapUrl} 
                    alt="Imported Map" 
                    className="map-image"
                  />
                ) : mapData.mapData ? (
                  <div className="map-data-visualization">
                    {/* Render map data as needed */}
                    <pre>{JSON.stringify(mapData.mapData, null, 2)}</pre>
                  </div>
                ) : (
                  <div className="map-placeholder">
                    <p>Map data imported successfully</p>
                    <div className="map-data-preview">
                      <pre>{JSON.stringify(mapData, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="map-placeholder">
              <div className="placeholder-content">
                <span className="placeholder-icon">🗺️</span>
                <h3>No Map Imported</h3>
                <p>Import a map from an API to display it here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
