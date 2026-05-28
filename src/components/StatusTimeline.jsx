function StatusTimeline({ status }) {
  const normalizedStatus = (status || "").toLowerCase();

  const steps = [
    { key: "available", label: "Added" },
    { key: "accepted", label: "Accepted" },
    { key: "collected", label: "Collected" },
    { key: "delivered", label: "Delivered" },
  ];

  const statusOrder = {
    available: 0,
    pending: 0,
    accepted: 1,
    collected: 2,
    completed: 3,
    delivered: 3,
  };

  const activeIndex = statusOrder[normalizedStatus] ?? 0;

  return (
    <div style={{ margin: "20px 0 22px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          alignItems: "center",
          position: "relative",
          gap: "0",
        }}
      >
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;

          return (
            <div
              key={step.key}
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {index < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "50%",
                    width: "100%",
                    height: "3px",
                    background:
                      index < activeIndex ? "#2f7d6d" : "#dce3ea",
                    zIndex: -1,
                  }}
                />
              )}

              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  margin: "0 auto 8px",
                  background: isActive ? "#2f7d6d" : "#e2e8f0",
                  color: isActive ? "#ffffff" : "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "800",
                  boxShadow: isActive
                    ? "0 6px 14px rgba(47, 125, 109, 0.22)"
                    : "none",
                }}
              >
                {isActive ? "✓" : index + 1}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: isActive ? "#17483f" : "#64748b",
                }}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusTimeline;