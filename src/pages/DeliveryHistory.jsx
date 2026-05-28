import { useEffect, useState } from "react";
import { getDeliveryHistory } from "../services/api";

function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getDeliveryHistory();
        setHistory(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load delivery history:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="section-card">
          <h1 className="page-title">Delivery History</h1>
          <p className="center-text">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">Delivery History</h1>
        <p className="page-subtitle">
          Completed food delivery records
        </p>

        {history.length === 0 ? (
          <p className="empty-state">No delivery history found</p>
        ) : (
          <div className="list-grid">
            {history.map((item) => {
              const isPickup = item.food;

              return (
                <div className="list-card" key={item._id}>
                  <h3>{isPickup ? item.food?.title : item.title}</h3>

                  <div className="info-line">
                    <strong>Status:</strong>{" "}
                    <span className="badge badge-emerald">
                      {isPickup ? item.status : item.status}
                    </span>
                  </div>

                  <div className="info-line">
                    <strong>Quantity:</strong>{" "}
                    {isPickup ? item.food?.quantity : item.quantity}
                  </div>

                  <div className="info-line">
                    <strong>Location:</strong>{" "}
                    {isPickup ? item.food?.location : item.location}
                  </div>

                  {isPickup && (
                    <>
                      <div className="info-line">
                        <strong>Volunteer:</strong>{" "}
                        {item.volunteer?.name || "Not available"}
                      </div>
                      <div className="info-line">
                        <strong>Restaurant:</strong>{" "}
                        {item.food?.restaurant?.name || "Not available"}
                      </div>
                    </>
                  )}

                  <div className="info-line">
                    <strong>Updated On:</strong>{" "}
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleString()
                      : "Not available"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryHistory;