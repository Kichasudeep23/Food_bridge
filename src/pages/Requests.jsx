import { useEffect, useMemo, useState } from "react";
import { getFoodPosts, getAllPickupRequests } from "../services/api";

function Requests() {
  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [foodsRes, requestsRes] = await Promise.all([
          getFoodPosts(),
          getAllPickupRequests(),
        ]);

        setFoods(Array.isArray(foodsRes.data) ? foodsRes.data : []);
        setRequests(Array.isArray(requestsRes.data) ? requestsRes.data : []);
      } catch (error) {
        console.error("Failed to load admin monitoring data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const getStatusClass = (status = "") => {
    const value = status.toLowerCase();

    if (value === "available") return "badge badge-green";
    if (value === "accepted") return "badge badge-orange";
    if (value === "collected") return "badge badge-blue";
    if (value === "completed" || value === "delivered") {
      return "badge badge-emerald";
    }

    return "badge badge-gray";
  };

  const summary = useMemo(() => {
    return {
      totalFoods: foods.length,
      totalRequests: requests.length,
      availableFoods: foods.filter((f) => f.status === "Available").length,
      acceptedFoods: foods.filter((f) => f.status === "Accepted").length,
      collectedFoods: foods.filter((f) => f.status === "Collected").length,
      deliveredFoods: foods.filter((f) => f.status === "Delivered").length,
    };
  }, [foods, requests]);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="section-card">
          <h1 className="page-title">Admin Monitoring Panel</h1>
          <p className="center-text">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">Admin Monitoring Panel</h1>
        <p className="page-subtitle">
          Monitor full system flow from restaurant posting to volunteer delivery
        </p>

        <div className="summary-grid">
          <div className="summary-card">
            <span>Total Food Posts</span>
            <h3>{summary.totalFoods}</h3>
          </div>

          <div className="summary-card">
            <span>Total Pickup Requests</span>
            <h3>{summary.totalRequests}</h3>
          </div>

          <div className="summary-card">
            <span>Available Foods</span>
            <h3>{summary.availableFoods}</h3>
          </div>

          <div className="summary-card">
            <span>Accepted Foods</span>
            <h3>{summary.acceptedFoods}</h3>
          </div>

          <div className="summary-card">
            <span>Collected Foods</span>
            <h3>{summary.collectedFoods}</h3>
          </div>

          <div className="summary-card">
            <span>Delivered Foods</span>
            <h3>{summary.deliveredFoods}</h3>
          </div>
        </div>

        <div className="admin-split-grid">
          <div className="section-card nested-card admin-half-card">
            <h2 className="sub-heading">Restaurant Food Posts</h2>
            <p className="page-subtitle admin-subtext">
              Admin can view all food posts added by restaurants
            </p>

            {foods.length === 0 ? (
              <p className="empty-state">No restaurant food posts found</p>
            ) : (
              <div className="admin-vertical-list">
                {foods.map((food) => (
                  <div className="admin-info-card" key={food._id}>
                    <div className="admin-card-top">
                      <h3>{food.title}</h3>
                      <span className={getStatusClass(food.status)}>
                        {food.status}
                      </span>
                    </div>

                    <div className="info-line">
                      <strong>Quantity:</strong> {food.quantity}
                    </div>

                    <div className="info-line">
                      <strong>Location:</strong> {food.location}
                    </div>

                    <div className="info-line">
                      <strong>Food Type:</strong> {food.foodType || "Veg"}
                    </div>

                    <div className="info-line">
                      <strong>Expiry Time:</strong>{" "}
                      {food.expiryTime || "Not mentioned"}
                    </div>

                    <div className="info-line">
                      <strong>Restaurant Name:</strong>{" "}
                      {food.restaurant?.name || "Not available"}
                    </div>

                    <div className="info-line">
                      <strong>Restaurant Email:</strong>{" "}
                      {food.restaurant?.email || "Not available"}
                    </div>

                    <div className="info-line">
                      <strong>Added On:</strong>{" "}
                      {food.createdAt
                        ? new Date(food.createdAt).toLocaleString()
                        : "Not available"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section-card nested-card admin-half-card">
            <h2 className="sub-heading">Volunteer Pickup Activity</h2>
            <p className="page-subtitle admin-subtext">
              Admin can view volunteer acceptance, collection, and delivery progress
            </p>

            {requests.length === 0 ? (
              <p className="empty-state">No volunteer pickup requests found</p>
            ) : (
              <div className="admin-vertical-list">
                {requests.map((request) => (
                  <div className="admin-info-card" key={request._id}>
                    <div className="admin-card-top">
                      <h3>{request.food?.title || "Requested Food"}</h3>
                      <span className={getStatusClass(request.status)}>
                        {request.status}
                      </span>
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
                      <strong>Volunteer Name:</strong>{" "}
                      {request.volunteer?.name || "Not available"}
                    </div>

                    <div className="info-line">
                      <strong>Volunteer Email:</strong>{" "}
                      {request.volunteer?.email || "Not available"}
                    </div>

                    <div className="info-line">
                      <strong>Restaurant Name:</strong>{" "}
                      {request.food?.restaurant?.name || "Not available"}
                    </div>

                    <div className="info-line">
                      <strong>Restaurant Email:</strong>{" "}
                      {request.food?.restaurant?.email || "Not available"}
                    </div>

                    <div className="info-line">
                      <strong>Created On:</strong>{" "}
                      {request.createdAt
                        ? new Date(request.createdAt).toLocaleString()
                        : "Not available"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="top-highlight">
          Admin access is for monitoring only. This panel shows restaurant food
          posting, volunteer acceptance, collection stage, and final delivery status.
        </div>
      </div>
    </div>
  );
}

export default Requests;