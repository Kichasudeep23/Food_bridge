import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddFood from "./pages/AddFood";
import FoodList from "./pages/FoodList";
import MyFoodPosts from "./pages/MyFoodPosts";
import MyRequests from "./pages/MyRequests";
import Notifications from "./pages/Notifications";
import AdminUsers from "./pages/AdminUsers";
import AdminReport from "./pages/AdminReport";
import AdminApprovals from "./pages/AdminApprovals";
import Leaderboard from "./pages/Leaderboard";
import EmergencyBroadcast from "./pages/EmergencyBroadcast";
import DeliveryHistory from "./pages/DeliveryHistory";

import "./styles/styles.css";

function App() {

  const token = localStorage.getItem("token");

  const storedUser = localStorage.getItem("user");

  const user =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;

  const Protected = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="main-content">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Auth Routes */}
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" replace />}
          />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />

          <Route
            path="/add-food"
            element={
              <Protected>
                <AddFood />
              </Protected>
            }
          />

          <Route
            path="/my-foods"
            element={
              <Protected>
                <MyFoodPosts />
              </Protected>
            }
          />

          <Route
            path="/food-list"
            element={
              <Protected>
                <FoodList />
              </Protected>
            }
          />

          <Route
            path="/my-requests"
            element={
              <Protected>
                <MyRequests />
              </Protected>
            }
          />

          <Route
            path="/notifications"
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />

          <Route
            path="/users"
            element={
              <Protected>
                <AdminUsers />
              </Protected>
            }
          />

          <Route
            path="/report"
            element={
              <Protected>
                <AdminReport />
              </Protected>
            }
          />

          <Route
            path="/approvals"
            element={
              <Protected>
                <AdminApprovals />
              </Protected>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <Protected>
                <Leaderboard />
              </Protected>
            }
          />

          <Route
            path="/broadcast"
            element={
              <Protected>
                <EmergencyBroadcast />
              </Protected>
            }
          />

          <Route
            path="/history"
            element={
              <Protected>
                <DeliveryHistory />
              </Protected>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;