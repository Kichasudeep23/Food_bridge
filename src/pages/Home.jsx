import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto 50px",
        padding: "0 20px",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, rgba(15,118,110,1) 0%, rgba(19,78,74,1) 100%)",
          borderRadius: "28px",
          padding: "70px 55px",
          color: "#ffffff",
          boxShadow: "0 18px 40px rgba(15,118,110,0.22)",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "14px",
                letterSpacing: "1.5px",
                fontWeight: "700",
                marginBottom: "15px",
                opacity: 0.95,
                textTransform: "uppercase",
              }}
            >
              Surplus Food Redistribution Platform
            </p>

            <h1
              style={{
                fontSize: "62px",
                lineHeight: "1.08",
                marginBottom: "20px",
                fontWeight: "800",
              }}
            >
              FoodBridge
            </h1>

            <p
              style={{
                fontSize: "21px",
                lineHeight: "1.85",
                maxWidth: "720px",
                marginBottom: "30px",
                color: "rgba(255,255,255,0.95)",
              }}
            >
              FoodBridge connects restaurants with volunteers to collect
              surplus food and distribute it to poor people, needy families,
              and hungry communities. It helps reduce food waste and create
              real social impact.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              {!user ? (
                <>
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      background: "#ffffff",
                      color: "#0f766e",
                      padding: "15px 26px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      background: "rgba(255,255,255,0.14)",
                      color: "#ffffff",
                      padding: "15px 26px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      fontSize: "16px",
                      border: "1px solid rgba(255,255,255,0.26)",
                    }}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  style={{
                    textDecoration: "none",
                    background: "#ffffff",
                    color: "#0f766e",
                    padding: "15px 26px",
                    borderRadius: "14px",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "22px",
              padding: "28px",
              backdropFilter: "blur(8px)",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "18px",
                fontWeight: "800",
              }}
            >
              Quick Overview
            </h3>

            <div style={{ display: "grid", gap: "14px" }}>
              {[
                "Restaurants add leftover food",
                "Volunteers view available food",
                "Volunteers accept pickup requests",
                "Food is collected and distributed",
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      color: "#0f766e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "14px",
                    }}
                  >
                    {index + 1}
                  </div>
                  <p style={{ margin: 0, lineHeight: "1.6", fontSize: "15px" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Short Content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "26px",
            boxShadow: "0 10px 25px rgba(15,23,42,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              color: "#1e293b",
              fontSize: "28px",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Problem
          </h3>
          <p style={{ color: "#475569", lineHeight: "1.8", margin: 0 }}>
            Good food is wasted every day while many people still remain hungry.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "26px",
            boxShadow: "0 10px 25px rgba(15,23,42,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              color: "#1e293b",
              fontSize: "28px",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Solution
          </h3>
          <p style={{ color: "#475569", lineHeight: "1.8", margin: 0 }}>
            FoodBridge builds a simple bridge between surplus food and people who
            can help distribute it.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "26px",
            boxShadow: "0 10px 25px rgba(15,23,42,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              color: "#1e293b",
              fontSize: "28px",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Impact
          </h3>
          <p style={{ color: "#475569", lineHeight: "1.8", margin: 0 }}>
            The platform supports hunger relief, community service, and food waste
            reduction through technology.
          </p>
        </div>
      </section>

      {/* Bottom About Button */}
      <section
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "40px 30px",
          textAlign: "center",
          boxShadow: "0 12px 28px rgba(15,23,42,0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            color: "#1e293b",
            marginBottom: "14px",
            fontWeight: "800",
          }}
        >
          Want to know more about the project?
        </h2>

        <p
          style={{
            maxWidth: "820px",
            margin: "0 auto 24px",
            color: "#475569",
            lineHeight: "1.8",
            fontSize: "18px",
          }}
        >
          Click the About button to view the full project explanation, working
          steps, user roles, features, and workflow of FoodBridge.
        </p>

        <Link
          to="/about"
          style={{
            textDecoration: "none",
            background: "#0f766e",
            color: "#ffffff",
            padding: "15px 28px",
            borderRadius: "14px",
            fontWeight: "700",
            fontSize: "16px",
            display: "inline-block",
          }}
        >
          About Project
        </Link>
      </section>
    </div>
  );
}

export default Home;