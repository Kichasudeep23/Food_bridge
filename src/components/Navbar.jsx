import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        FoodBridge
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {!user && (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/food-list">Food List</Link>
            <Link to="/notifications">Notifications</Link>

            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
JSON.parse(localStorage.getItem("user"))
export default Navbar;