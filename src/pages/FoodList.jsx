import { useEffect, useMemo, useState } from "react";
import { getFoodPosts, createPickupRequest } from "../services/api";
import StatusTimeline from "../components/StatusTimeline";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);
  const [pickupTimes, setPickupTimes] = useState({});

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Available");

  const loadFoods = async () => {
    try {
      const res = await getFoodPosts();
      setFoods(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Food loading failed:", error);
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

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesLocation = locationFilter
        ? food.location?.toLowerCase().includes(locationFilter.toLowerCase())
        : true;

      const matchesType = typeFilter ? food.foodType === typeFilter : true;
      const matchesCategory = categoryFilter
        ? food.category === categoryFilter
        : true;
      const matchesUrgency = urgencyFilter
        ? food.urgency === urgencyFilter
        : true;
      const matchesStatus = statusFilter ? food.status === statusFilter : true;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesCategory &&
        matchesUrgency &&
        matchesStatus
      );
    });
  }, [
    foods,
    search,
    locationFilter,
    typeFilter,
    categoryFilter,
    urgencyFilter,
    statusFilter,
  ]);

  const handleAccept = async (foodId) => {
    try {
      setAcceptingId(foodId);

      await createPickupRequest(foodId, {
        pickupTime: pickupTimes[foodId] || "Not scheduled",
      });

      alert("Food accepted successfully");
      await loadFoods();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to accept food");
    } finally {
      setAcceptingId(null);
    }
  };

  const getStatusClass = (status = "") => {
    const value = status.toLowerCase();

    if (value === "available") return "badge badge-green";
    if (value === "accepted") return "badge badge-orange";
    if (value === "collected") return "badge badge-blue";
    if (value === "delivered") return "badge badge-emerald";
    if (value === "urgent") return "badge badge-red";
    if (value === "expired") return "badge badge-red";
    if (value === "expires soon") return "badge badge-orange";
    if (value === "fresh") return "badge badge-green";

    return "badge badge-gray";
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="section-card">
          <h1 className="page-title">Food List</h1>
          <p className="center-text">Loading food posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">Food List</h1>

        <p className="page-subtitle">
          Volunteers and NGOs can view available food and accept pickup requests.
        </p>

        <div className="filter-grid">
          <input
            type="text"
            placeholder="Search food name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Rice">Rice</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Meals">Meals</option>
            <option value="Snacks">Snacks</option>
            <option value="Bakery">Bakery</option>
            <option value="Packed Food">Packed Food</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
          >
            <option value="">All Urgency</option>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Accepted">Accepted</option>
            <option value="Collected">Collected</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {filteredFoods.length === 0 ? (
          <p className="empty-state">No matching food posts found.</p>
        ) : (
          <div className="list-grid">
            {filteredFoods.map((food) => (
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
                  <strong>Food Type:</strong> {food.foodType || "Veg"}
                </div>

                <div className="info-line">
                  <strong>Estimated People:</strong>{" "}
                  {food.estimatedPeople || 0}
                </div>

                <div className="info-line">
                  <strong>Restaurant:</strong>{" "}
                  {food.restaurant?.name || "Not available"}
                </div>

                <div className="info-line">
                  <strong>Phone:</strong>{" "}
                  {food.restaurant?.phone || "Not available"}
                </div>

                <div className="info-line">
                  <strong>Address:</strong>{" "}
                  {food.restaurant?.address || "Not available"}
                </div>

                {food.locationLat && food.locationLng && (
                  <>
                    <iframe
                      title={`map-${food._id}`}
                      src={`https://maps.google.com/maps?q=${food.locationLat},${food.locationLng}&z=15&output=embed`}
                      width="100%"
                      height="180"
                      style={{
                        border: 0,
                        borderRadius: "16px",
                        marginTop: "12px",
                      }}
                      loading="lazy"
                    ></iframe>

                    <a
                      className="dashboard-action"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${food.locationLat},${food.locationLng}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ marginTop: "12px" }}
                    >
                      Open Directions
                    </a>
                  </>
                )}

                {food.status === "Available" ? (
                  <>
                    <div className="form-group">
                      <label>Pickup Time</label>
                      <input
                        type="time"
                        value={pickupTimes[food._id] || ""}
                        onChange={(e) =>
                          setPickupTimes((prev) => ({
                            ...prev,
                            [food._id]: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <button
                      className="primary-btn"
                      style={{ marginTop: "14px", width: "100%" }}
                      onClick={() => handleAccept(food._id)}
                      disabled={acceptingId === food._id}
                    >
                      {acceptingId === food._id ? "Accepting..." : "Accept Food"}
                    </button>
                  </>
                ) : (
                  <button
                    className="primary-btn"
                    style={{
                      marginTop: "14px",
                      width: "100%",
                      opacity: 0.7,
                      cursor: "not-allowed",
                    }}
                    disabled
                  >
                    Not Available
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

export default FoodList;