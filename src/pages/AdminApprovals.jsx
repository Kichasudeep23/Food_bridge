import { useEffect, useState } from "react";
import { getAdminFoodPosts } from "../services/api";

function AdminApprovals() {
  const [foods, setFoods] = useState([]);

  const loadFoods = async () => {
    try {
      const res = await getAdminFoodPosts();
      setFoods(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load foods:", error);
      setFoods([]);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);
JSON.parse(localStorage.getItem("user"))
  const getStatusClass = (status = "") => {
    const value = status.toLowerCase();

    if (value === "available") return "badge badge-green";
    if (value === "accepted") return "badge badge-orange";
    if (value === "collected") return "badge badge-blue";
    if (value === "delivered") return "badge badge-emerald";
    if (value === "urgent") return "badge badge-red";

    return "badge badge-gray";
  };

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">Food Monitoring</h1>

        <p className="page-subtitle">
          Food posts are no longer approved one by one. Once a restaurant is
          approved by admin, its food posts go directly to volunteers and NGOs.
        </p>

        {foods.length === 0 ? (
          <p className="empty-state">No food posts found</p>
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
                  <span className="badge badge-gray">
                    {food.category || "Other"}
                  </span>
                </div>

                <div className="info-line">
                  <strong>Restaurant:</strong>{" "}
                  {food.restaurant?.name || "Not available"}
                </div>

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
                  <strong>Expiry:</strong>{" "}
                  {food.expiryStatus || "No Expiry Set"}
                </div>

                <div className="info-line">
                  <strong>Estimated People:</strong>{" "}
                  {food.estimatedPeople || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminApprovals;