import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
      setFormData({
        name: res.data.user.name || "",
        phone: res.data.user.phone || "",
        address: res.data.user.address || "",
      });
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      alert("Profile updated successfully");
      setEditing(false);
      loadProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!profile) {
    return (
      <div className="page-shell">
        <div className="section-card">
          <h1 className="page-title">My Profile</h1>
          <p className="center-text">Loading profile...</p>
        </div>
      </div>
    );
  }

  const { user, stats } = profile;

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">View and edit your profile details</p>

        <div className="list-grid">
          <div className="list-card">
            <h3>Profile Information</h3>

            {editing ? (
              <div className="modern-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="action-row">
                  <button className="primary-btn small-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="danger-btn small-btn"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="info-line">
                  <strong>Name:</strong> {user.name}
                </div>
                <div className="info-line">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="info-line">
                  <strong>Role:</strong> {user.role}
                </div>
                <div className="info-line">
                  <strong>Phone:</strong> {user.phone || "Not available"}
                </div>
                <div className="info-line">
                  <strong>Address:</strong> {user.address || "Not available"}
                </div>

                <div className="action-row">
                  <button
                    className="primary-btn small-btn"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="list-card">
            <h3>Account Summary</h3>

            {user.role === "restaurant" && (
              <>
                <div className="info-line"><strong>Total Foods:</strong> {stats.totalFoods}</div>
                <div className="info-line"><strong>Available:</strong> {stats.availableFoods}</div>
                <div className="info-line"><strong>Accepted:</strong> {stats.acceptedFoods}</div>
                <div className="info-line"><strong>Collected:</strong> {stats.collectedFoods}</div>
                <div className="info-line"><strong>Delivered:</strong> {stats.deliveredFoods}</div>
              </>
            )}

            {user.role === "volunteer" && (
              <>
                <div className="info-line"><strong>Total Requests:</strong> {stats.totalRequests}</div>
                <div className="info-line"><strong>Accepted:</strong> {stats.acceptedRequests}</div>
                <div className="info-line"><strong>Collected:</strong> {stats.collectedRequests}</div>
                <div className="info-line"><strong>Completed:</strong> {stats.completedRequests}</div>
              </>
            )}

            {user.role === "admin" && (
              <>
                <div className="info-line"><strong>Total Users:</strong> {stats.totalUsers}</div>
                <div className="info-line"><strong>Total Restaurants:</strong> {stats.totalRestaurants}</div>
                <div className="info-line"><strong>Total Volunteers:</strong> {stats.totalVolunteers}</div>
                <div className="info-line"><strong>Total Foods:</strong> {stats.totalFoods}</div>
                <div className="info-line"><strong>Total Requests:</strong> {stats.totalRequests}</div>
                <div className="info-line"><strong>Delivered:</strong> {stats.deliveredFoods}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;