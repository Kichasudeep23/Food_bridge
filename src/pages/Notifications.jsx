import { useEffect, useState } from "react";
import { getNotifications, markNotificationsRead } from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async () => {
    try {
      await markNotificationsRead();
      loadNotifications();
    } catch (error) {
      alert("Failed to mark notifications as read");
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="section-card">
          <h1 className="page-title">Notifications</h1>
          <p className="center-text">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">Notifications</h1>
        <p className="page-subtitle">Latest food and pickup updates</p>

        <button className="primary-btn small-btn" onClick={handleMarkRead}>
          Mark All Read
        </button>

        <div className="list-grid" style={{ marginTop: "22px" }}>
          {notifications.length === 0 ? (
            <p className="empty-state">No notifications found</p>
          ) : (
            notifications.map((item) => (
              <div className="list-card" key={item._id}>
                <div className="admin-card-top">
                  <h3>{item.title}</h3>
                  <span
                    className={
                      item.isRead ? "badge badge-gray" : "badge badge-orange"
                    }
                  >
                    {item.isRead ? "Read" : "Unread"}
                  </span>
                </div>

                <p>{item.message}</p>

                <div className="info-line">
                  <strong>Date:</strong>{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Not available"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;