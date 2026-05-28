import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/auth/login", formData);

      console.log("LOGIN RESPONSE:", response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login successful");

      // ADMIN LOGIN
      if (response.data.user.role === "admin") {
        navigate("/admin-dashboard");
      }

      // NORMAL USER LOGIN
      else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* TITLE */}
        <h1 className="auth-title">FoodBridge</h1>

        <p className="auth-subtitle">
          Surplus Food Redistribution Platform
        </p>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="primary-btn full-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        {/* REGISTER */}
        <div className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/signup">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;