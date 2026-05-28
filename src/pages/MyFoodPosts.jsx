import { useEffect, useState } from "react";
import { getMyFoodPosts, deleteFoodPost } from "../services/api";
import StatusTimeline from "../components/StatusTimeline";

function MyFoodPosts() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFoods = async () => {
    try {
      const res = await getMyFoodPosts();
      setFoods(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("My foods loading failed:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
    const interval = setInterval(loadFoods, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (value = "") => {
    const status = value.toLowerCase();

    if (status === "available" || status === "fresh") {
      return "badge badge-green";
    }

    if (status === "accepted" || status === "expires soon") {
      return "badge badge-orange";
    }

    if (status === "collected") {
      return "badge badge-blue";
    }

    if (status === "delivered") {
      return "badge badge-emerald";
    }

    if (status === "urgent" || status === "expired") {
      return "badge badge-red";
    }

    return "badge badge-gray";
  };

  const removeFood = async (foodId) => {
    if (!window.confirm("Delete this food post?")) return;

    try {
      await deleteFoodPost(foodId);
      alert("Food deleted successfully");
      loadFoods();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete food");
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="section-card">
          <h1 className="page-title">My Food Posts</h1>
          <p className="center-text">Loading your food posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">My Food Posts</h1>

        <p className="page-subtitle">
          Restaurants can track food from posting to final delivery.
        </p>

        {foods.length === 0 ? (
          <p className="empty-state">No food posts added yet</p>
        ) : (
          <div className="list-grid">
            {foods.map((food) => (
              <div className="list-card" key={food._id}>
                <div className="admin-card-top">
                  <h3>{food.title}</h3>
                  <span className={getStatusClass(food.status)}>
                    {food.status}
                  </span>
                </div>

                <div className="action-row">
                  <span className={getStatusClass(food.urgency)}>
                    {food.urgency || "Normal"}
                  </span>

                  <span className={getStatusClass(food.expiryStatus)}>
                    {food.expiryStatus || "No Expiry Set"}
                  </span>

                  <span className="badge badge-gray">
                    {food.category || "Other"}
                  </span>
                </div>

                <StatusTimeline status={food.status} />

                <div className="info-line">
                  <strong>Quantity:</strong> {food.quantity}
                </div>

                <div className="info-line">
                  <strong>Location:</strong> {food.location}
                </div>

                <div className="info-line">
                  <strong>Food Type:</strong> {food.foodType}
                </div>

                <div className="info-line">
                  <strong>Estimated People:</strong>{" "}
                  {food.estimatedPeople || 0}
                </div>

                {food.latestPickup && (
                  <>
                    <div className="top-highlight">
                      Accepted By: {food.latestPickup.volunteer?.name || "N/A"}
                    </div>

                    <div className="info-line">
                      <strong>Volunteer/NGO Email:</strong>{" "}
                      {food.latestPickup.volunteer?.email || "N/A"}
                    </div>

                    <div className="info-line">
                      <strong>Pickup Time:</strong>{" "}
                      {food.latestPickup.pickupTime || "Not scheduled"}
                    </div>

                    <div className="info-line">
                      <strong>Pickup OTP:</strong>{" "}
                      <span className="badge badge-blue">
                        {food.latestPickup.pickupOtp}
                      </span>
                    </div>

                    <div className="info-line">
                      <strong>Pickup Status:</strong>{" "}
                      {food.latestPickup.status}
                    </div>

                    {food.latestPickup.status === "Completed" && (
                      <>
                        <div className="info-line">
                          <strong>Delivery Location:</strong>{" "}
                          {food.latestPickup.deliveryLocation || "N/A"}
                        </div>

                        <div className="info-line">
                          <strong>People Served:</strong>{" "}
                          {food.latestPickup.peopleServed || 0}
                        </div>

                        <div className="info-line">
                          <strong>Delivery Note:</strong>{" "}
                          {food.latestPickup.deliveryNote || "N/A"}
                        </div>

                        <div className="info-line">
                          <strong>Rating:</strong>{" "}
                          {food.latestPickup.rating || 0}/5
                        </div>

                        <div className="info-line">
                          <strong>Feedback:</strong>{" "}
                          {food.latestPickup.feedback || "No feedback"}
                        </div>
                      </>
                    )}
                  </>
                )}

                {food.status === "Available" && (
                  <button
                    className="danger-btn small-btn"
                    style={{ marginTop: "12px" }}
                    onClick={() => removeFood(food._id)}
                  >
                    Delete Food
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyFoodPosts;