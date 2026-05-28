import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFoodPost } from "../services/api";

function AddFood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    location: "",
    locationLat: "",
    locationLng: "",
    foodType: "Veg",
    category: "Other",
    expiryTime: "",
    expiryDateTime: "",
    urgency: "Normal",
    estimatedPeople: "",
    safetyChecklist: {
      packedProperly: false,
      notSpoiled: false,
      hygienic: false,
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChecklistChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      safetyChecklist: {
        ...prev.safetyChecklist,
        [e.target.name]: e.target.checked,
      },
    }));
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Location not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          locationLat: position.coords.latitude,
          locationLng: position.coords.longitude,
        }));

        alert("Current location captured successfully");
      },
      () => {
        alert("Unable to get current location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addFoodPost({
        ...formData,
        quantity: Number(formData.quantity),
        estimatedPeople: Number(formData.estimatedPeople || formData.quantity),
        locationLat: formData.locationLat ? Number(formData.locationLat) : null,
        locationLng: formData.locationLng ? Number(formData.locationLng) : null,
      });

      alert("Food added successfully and notified to volunteers/NGOs");
      navigate("/my-foods");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add food");
    }
  };

  return (
    <div className="page-shell">
      <div className="form-card">
        <div className="form-header">
          <h1>Add Surplus Food</h1>
          <p>
            Verified restaurants can add food directly. It will be visible to
            volunteers and NGOs immediately.
          </p>
        </div>

        <form className="modern-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Food Name</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Biryani"
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Example: 20"
              required
            />
          </div>

          <div className="form-group">
            <label>Pickup Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Example: Belagavi"
              required
            />
          </div>

          <button
            type="button"
            className="primary-btn small-btn"
            onClick={useCurrentLocation}
          >
            Use My Current Location
          </button>

          {formData.locationLat && formData.locationLng && (
            <div className="info-line">
              <strong>Map Location Captured:</strong> {formData.locationLat},{" "}
              {formData.locationLng}
            </div>
          )}

          <div className="form-group">
            <label>Food Type</label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          <div className="form-group">
            <label>Food Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Rice">Rice</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Meals">Meals</option>
              <option value="Snacks">Snacks</option>
              <option value="Bakery">Bakery</option>
              <option value="Packed Food">Packed Food</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Expiry Display Text</label>
            <input
              name="expiryTime"
              value={formData.expiryTime}
              onChange={handleChange}
              placeholder="Example: 10:30 PM"
            />
          </div>

          <div className="form-group">
            <label>Expiry Date and Time</label>
            <input
              name="expiryDateTime"
              type="datetime-local"
              value={formData.expiryDateTime}
              onChange={handleChange}
            />
            const user = JSON.parse(localStorage.getItem("user") || "null");
            <div className="form-group">
              <label>Urgency</label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estimated People Served</label>
              <input
                name="estimatedPeople"
                type="number"
                value={formData.estimatedPeople}
                onChange={handleChange}
                placeholder="Example: 20"
              />
            </div>

            <div className="section-card nested-card">
              <h2 className="sub-heading">Food Safety Checklist</h2>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="packedProperly"
                  checked={formData.safetyChecklist.packedProperly}
                  onChange={handleChecklistChange}
                />
                Food is packed properly
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="notSpoiled"
                  checked={formData.safetyChecklist.notSpoiled}
                  onChange={handleChecklistChange}
                />
                Food is not spoiled
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="hygienic"
                  checked={formData.safetyChecklist.hygienic}
                  onChange={handleChecklistChange}
                />
                Food is hygienic and safe to eat
              </label>
            </div>

            <button className="primary-btn full-btn">Add Food</button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;