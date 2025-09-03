import React, { useEffect, useState } from 'react';
import './NotificationsPage.css';

const API_URL = 'https://example.com/api/notifications'; // Replace with your API endpoint

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
    intervalId = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="notifications-container">
      <h2>Live Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((note, idx) => (
            <li key={idx} className="notification-item">
              <span className="notification-time">{note.time}</span>
              <span className="notification-message">{note.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsPage;
