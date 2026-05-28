import { useEffect, useState } from "react";
import { getMyPickupRequests, updatePickupStatus } from "../services/api";
import StatusTimeline from "../components/StatusTimeline";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [proofData, setProofData] = useState({});

  const loadRequests = async () => {
    try {
      const res = await getMyPickupRequests();
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Requests loading failed:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
    const interval = setInterval(loadRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleProofChange = (requestId, field, value) => {
    setProofData((prev) => ({
      ...prev,
      [requestId]: {
        ...prev[requestId],
        [field]: value,
      },
    }));
  };

  const updateStatus = async (requestId, status) => {
    try {
      await updatePickupStatus(requestId, {
        status,
        ...(proofData[requestId] || {}),
      });

      alert(`Status updated to ${status}`);
      loadRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusClass = (status = "") => {
    if (status === "Accepted") return "badge badge-orange";
    if (status === "Collected") return "badge badge-blue";
    if (status === "Completed") return "badge badge-emerald";
    return "badge badge-gray";
  };

  const timelineStatus = (status) => {
    if (status === "Completed") return "Delivered";
    return status;
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="section-card">
          <h1 className="page-title">My Requests</h1>
          <p className="center-text">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">My Pickup Requests</h1>

        <p className="page-subtitle">
          Track accepted food, collect using OTP, and submit delivery proof.
        </p>

        {requests.length === 0 ? (
          <p className="empty-state">No pickup requests found</p>
        ) : (
          <div className="list-grid">
            {requests.map((request) => (
              <div className="list-card" key={request._id}>
                <div className="admin-card-top">
                  <h3>{request.food?.title || "Requested Food"}</h3>
                  <span className={getStatusClass(request.status)}>
                    {request.status}
                  </span>
                </div>

                <StatusTimeline status={timelineStatus(request.status)} />

                <div className="info-line">
                  <strong>Pickup Time:</strong>{" "}
                  {request.pickupTime || "Not scheduled"}
                </div>

                <div className="info-line">
                  <strong>Food Quantity:</strong>{" "}
                  {request.food?.quantity || "Not mentioned"}
                </div>

                <div className="info-line">
                  <strong>Food Location:</strong>{" "}
                  {request.food?.location || "Not mentioned"}
                </div>

                <div className="info-line">
                  <strong>Restaurant:</strong>{" "}
                  {request.food?.restaurant?.name || "Not available"}
                </div>

                <div className="info-line">
                  <strong>Restaurant Phone:</strong>{" "}
                  {request.food?.restaurant?.phone || "Not available"}
                </div>

                <div className="info-line">
                  <strong>Restaurant Address:</strong>{" "}
                  {request.food?.restaurant?.address || "Not available"}
                </div>

                <div className="top-highlight">
                  Pickup OTP: {request.pickupOtp}
                </div>

                {request.status === "Accepted" && (
                  <div className="modern-form" style={{ marginTop: "16px" }}>
                    <div className="form-group">
                      <label>Enter Pickup OTP</label>
                      <input
                        placeholder="Enter OTP from restaurant"
                        onChange={(e) =>
                          handleProofChange(
                            request._id,
                            "pickupOtp",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <button
                      className="primary-btn small-btn"
                      onClick={() => updateStatus(request._id, "Collected")}
                    >
                      Mark Collected
                    </button>
                  </div>
                )}

                {request.status === "Collected" && (
                  <div className="modern-form" style={{ marginTop: "16px" }}>
                    <div className="form-group">
                      <label>Delivery Location</label>
                      <input
                        placeholder="Example: Near bus stand"
                        onChange={(e) =>
                          handleProofChange(
                            request._id,
                            "deliveryLocation",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>People Served</label>
                      <input
                        type="number"
                        placeholder="Example: 10"
                        onChange={(e) =>
                          handleProofChange(
                            request._id,
                            "peopleServed",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Delivery Note</label>
                      <input
                        placeholder="Example: Delivered successfully"
                        onChange={(e) =>
                          handleProofChange(
                            request._id,
                            "deliveryNote",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Delivery Proof URL</label>
                      <input
                        placeholder="Paste photo/link proof URL"
                        onChange={(e) =>
                          handleProofChange(
                            request._id,
                            "deliveryProofUrl",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Rating</label>
                      <select
                        onChange={(e) =>
                          handleProofChange(
                            request._id,
                            "rating",
                            Number(e.target.value)
                          )
                        }
                      >
                        <option value="0">Select rating</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Feedback</label>
                      <input
                        placeholder="Example: Food delivered safely"
                        onChange={(e) =>
                          handleProofChange(
                            request._id,
                            "feedback",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <button
                      className="primary-btn small-btn"
                      onClick={() => updateStatus(request._id, "Completed")}
                    >
                      Mark Delivered
                    </button>
                  </div>
                )}

                {request.status === "Completed" && (
                  <>
                    <div className="info-line">
                      <strong>Delivery Location:</strong>{" "}
                      {request.deliveryLocation || "Not added"}
                    </div>

                    <div className="info-line">
                      <strong>People Served:</strong>{" "}
                      {request.peopleServed || 0}
                    </div>

                    <div className="info-line">
                      <strong>Delivery Note:</strong>{" "}
                      {request.deliveryNote || "No note"}
                    </div>

                    <div className="info-line">
                      <strong>Proof URL:</strong>{" "}
                      {request.deliveryProofUrl || "No proof"}
                    </div>

                    <div className="info-line">
                      <strong>Rating:</strong> {request.rating || 0}/5
                    </div>

                    <div className="info-line">
                      <strong>Feedback:</strong>{" "}
                      {request.feedback || "No feedback"}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRequests;