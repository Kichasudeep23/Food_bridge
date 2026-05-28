function About() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "0 20px 40px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "28px",
          padding: "40px",
          boxShadow: "0 12px 28px rgba(15,23,42,0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <h1
          style={{
            fontSize: "46px",
            color: "#1e293b",
            marginBottom: "10px",
            fontWeight: "800",
          }}
        >
          About FoodBridge
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "19px",
            marginBottom: "26px",
          }}
        >
          Full details of the FoodBridge platform, workflow, and system usage.
        </p>

        <hr style={{ marginBottom: "30px", borderColor: "#e2e8f0" }} />

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ color: "#0f766e", marginBottom: "12px", fontSize: "28px" }}>
            Overview
          </h2>
          <p style={{ color: "#334155", lineHeight: "1.9", fontSize: "17px" }}>
            FoodBridge is a full-stack web application designed to reduce food
            waste by connecting restaurants that have surplus food with volunteers
            who can collect and distribute it to poor and needy people.
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ color: "#0f766e", marginBottom: "12px", fontSize: "28px" }}>
            Objective
          </h2>
          <p style={{ color: "#334155", lineHeight: "1.9", fontSize: "17px" }}>
            The main objective of FoodBridge is to ensure that edible leftover
            food reaches hungry people instead of being discarded, while also
            building a transparent and trackable donation process.
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ color: "#0f766e", marginBottom: "16px", fontSize: "28px" }}>
            How the System Works
          </h2>

          <div style={{ display: "grid", gap: "16px" }}>
            {[
              "Restaurant users register and login to the platform.",
              "They add surplus food with food name, quantity, location, food type, and expiry time.",
              "Volunteers login and browse the available food list.",
              "A volunteer accepts the food request.",
              "The volunteer goes to the restaurant and collects the food.",
              "The food is delivered to poor people or needy communities.",
              "Restaurant owners can track who accepted their food and the current status.",
              "Admin monitors the full activity of the platform.",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "16px",
                  padding: "16px 18px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    minWidth: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#0f766e",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "700",
                  }}
                >
                  {index + 1}
                </div>
                <p style={{ margin: 0, color: "#334155", lineHeight: "1.8" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ color: "#0f766e", marginBottom: "12px", fontSize: "28px" }}>
            Main Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              "Authentication Module",
              "Restaurant Dashboard",
              "Volunteer Dashboard",
              "Food Posting Module",
              "Food Acceptance Module",
              "Pickup and Delivery Tracking",
              "Restaurant Profile Tracking",
              "Volunteer Request History",
              "Admin Monitoring Module",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "16px",
                  padding: "18px",
                  color: "#334155",
                  fontWeight: "700",
                }}
              >
                ✅ {item}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ color: "#0f766e", marginBottom: "12px", fontSize: "28px" }}>
            User Roles
          </h2>
          <ul style={{ color: "#334155", lineHeight: "2", fontSize: "17px" }}>
            <li>
              <strong>Restaurant:</strong> Adds food and tracks status.
            </li>
            <li>
              <strong>Volunteer:</strong> Accepts food and updates collection and delivery status.
            </li>
            <li>
              <strong>Admin:</strong> Monitors platform workflow and activity.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "10px" }}>
          <h2 style={{ color: "#0f766e", marginBottom: "12px", fontSize: "28px" }}>
            Benefits
          </h2>
          <ul style={{ color: "#334155", lineHeight: "2", fontSize: "17px" }}>
            <li>Reduces food waste</li>
            <li>Supports poor and hungry people</li>
            <li>Creates social impact through technology</li>
            <li>Provides clear food tracking</li>
            <li>Encourages volunteer participation</li>
          </ul>
        </section>

        <div
          style={{
            marginTop: "30px",
            background: "linear-gradient(135deg, #0f766e, #134e4a)",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "24px",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "700",
          }}JSON.parse(localStorage.getItem("user"))
        >
          FoodBridge transforms surplus food into meaningful support for people
          who need it most.
        </div>
      </div>
    </div>
  );
}

export default About;