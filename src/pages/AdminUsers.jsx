import { useEffect, useState } from "react";
import { getAllUsers, verifyUser } from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleVerify = async (userId) => {
    try {
      await verifyUser(userId);
      alert("User verified successfully");
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to verify user");
    }
  };

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">User Approval Panel</h1>

        <p className="page-subtitle">
          Admin approves restaurants, volunteers, and NGOs one time after signup.
          After approval, they can use the system without repeated approval.
        </p>

        {users.length === 0 ? (
          <p className="empty-state">No users found</p>
        ) : (
          <div className="list-grid">
            {users.map((user) => (
              <div className="list-card" key={user._id}>
                <div className="admin-card-top">
                  <h3>{user.name}</h3>

                  <span
                    className={
                      user.isVerified ? "badge badge-green" : "badge badge-orange"
                    }
                  >
                    {user.isVerified ? "Approved" : "Pending Approval"}
                  </span>
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

                <div className="info-line">
                  <strong>Joined:</strong>{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "Not available"}
                </div>

                {!user.isVerified && user.role !== "admin" && (
                  <button
                    className="primary-btn small-btn"
                    onClick={() => handleVerify(user._id)}
                  >
                    Approve User
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

export default AdminUsers;