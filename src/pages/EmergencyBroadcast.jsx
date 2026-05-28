import { useState } from "react";
import { sendEmergencyBroadcast } from "../services/api";

function EmergencyBroadcast() {
  const [formData, setFormData] = useState({
    title: "Emergency Food Pickup",
    message: "",
    targetRole: "all",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendBroadcast = async (e) => {
    e.preventDefault();

    try {
      await sendEmergencyBroadcast(formData);
      alert("Emergency broadcast sent");
      setFormData({
        title: "Emergency Food Pickup",
        message: "",
        targetRole: "all",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Broadcast failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="form-card">
        <div className="form-header">
          <h1>Emergency Broadcast</h1>
          <p>Send urgent notification to users</p>
        </div>

        <form className="modern-form" onSubmit={sendBroadcast}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Target Role</label>
            <select name="targetRole" value={formData.targetRole} onChange={handleChange}>
              <option value="all">All</option>
              <option value="restaurant">Restaurant</option>
              <option value="volunteer">Volunteer</option>
              <option value="ngo">NGO</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="primary-btn full-btn">Send Broadcast</button>
        </form>
      </div>
    </div>
  );
}

export default EmergencyBroadcast;