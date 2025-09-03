import React, { useEffect, useState } from 'react';
import './HeatMapPage.css';

const API_URL = 'https://your-api-endpoint.com/heatmap'; // Replace with your actual API endpoint

function HeatMapPage() {
  const [heatmapData, setHeatmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setHeatmapData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="heatmap-container">
      <h2>Event Heat Map</h2>
      {loading && <p>Loading heat map...</p>}
      {error && <p>Error: {error}</p>}
      {heatmapData && (
        <div className="heatmap">
          {/* Render your heatmap visualization here using heatmapData */}
          <pre>{JSON.stringify(heatmapData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default HeatMapPage;
