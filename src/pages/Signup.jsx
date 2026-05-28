import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "restaurant",
    phone: "",
    address: "",

    restaurantName: "",
    restaurantType: "",
    licenseNumber: "",

    age: "",
    availableArea: "",
    vehicleType: "",

    organizationName: "",
    registrationNumber: "",
    serviceArea: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getRoleTitle = () => {
    if (formData.role === "restaurant") return "Register Your Restaurant";
    if (formData.role === "volunteer") return "Register as Volunteer";
    if (formData.role === "ngo") return "Register Your NGO";
    return "Create Account";
  };

  const getRoleDescription = () => {
    if (formData.role === "restaurant") {
      return "Add surplus food and track volunteer pickup status.";
    }

    if (formData.role === "volunteer") {
      return "Accept food pickups and help distribute food to needy people.";
    }

    if (formData.role === "ngo") {
      return "Manage food collection and distribution through your organization.";
    }

    return "Join FoodBridge.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalName =
        formData.role === "restaurant"
          ? formData.restaurantName || formData.name
          : formData.role === "ngo"
            ? formData.organizationName || formData.name
            : formData.name;

      const finalAddress =
        formData.role === "restaurant"
          ? formData.address
          : formData.role === "volunteer"
            ? formData.availableArea || formData.address
            : formData.serviceArea || formData.address;

      const payload = {
        name: finalName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: finalAddress,
      };

      const res = await registerUser(payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signup successful");
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="form-card">
        <div className="form-header">
          <h1>{getRoleTitle()}</h1>
          <p>{getRoleDescription()}</p>
        </div>

        <form className="modern-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Account Type</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="restaurant">Restaurant</option>
              <option value="volunteer">Volunteer</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          {formData.role === "restaurant" && (
            <>
              <div className="form-group">
                <label>Restaurant Name</label>
                <input
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  placeholder="Example: Sanjay Restaurant"
                  required
                />
              </div>

              <div className="form-group">
                <label>Restaurant Type</label>
                <select
                  name="restaurantType"
                  value={formData.restaurantType}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Catering Service">Catering Service</option>
                  <option value="Mess">Mess</option>
                </select>
              </div>

              <div className="form-group">
                <label>Food License Number</label>
                <input
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </>
          )}

          {formData.role === "volunteer" && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Ravi Kumar"
                  required
                />
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Example: 21"
                />
              </div>

              <div className="form-group">
                <label>Available Area</label>
                <input
                  name="availableArea"
                  value={formData.availableArea}
                  onChange={handleChange}
                  placeholder="Example: Belagavi"
                  required
                />
              </div>

              <div className="form-group">
                <label>Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option value="">Select vehicle</option>
                  <option value="Bike">Bike</option>
                  <option value="Car">Car</option>
                  <option value="Auto">Auto</option>
                  <option value="No Vehicle">No Vehicle</option>
                </select>
              </div>
            </>
          )}

          {formData.role === "ngo" && (
            <>
              <div className="form-group">
                <label>Organization Name</label>
                <input
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Example: Helping Hands NGO"
                  required
                />
              </div>

              <div className="form-group">
                <label>NGO Registration Number</label>
                <input
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="form-group">
                <label>Service Area</label>
                <input
                  name="serviceArea"
                  value={formData.serviceArea}
                  onChange={handleChange}
                  placeholder="Example: Belagavi"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Example: 9876543210"
            />
          </div>

          {formData.role === "restaurant" && (
            <div className="form-group">
              <label>Restaurant Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Example: Tilakwadi, Belagavi"
                required
              />
            </div>
          )}

          <button className="primary-btn full-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;