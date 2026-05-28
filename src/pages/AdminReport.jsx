import { downloadAdminReport } from "../services/api";

function AdminReport() {
  const handleDownload = async () => {
    try {
      const res = await downloadAdminReport();

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "foodbridge-report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("Report downloaded successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to download report");
    }
  };

  return (
    <div className="page-shell">
      <div className="section-card">
        <h1 className="page-title">Admin Report</h1>

        <p className="page-subtitle">
          Download a PDF report generated from live MongoDB data.
        </p>

        <div className="dashboard-card">
          <h3>FoodBridge Impact Report</h3>

          <p>
            This report includes total users, restaurants, volunteers, NGOs,
            food posts, pickup requests, delivered foods, and total people
            served.
          </p>

          <button className="primary-btn" onClick={handleDownload}>
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminReport;