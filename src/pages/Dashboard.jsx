import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getDashboardStats } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Failed to load dashboard");
      }
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 p-10 shadow-xl text-center">
          <h1 className="text-3xl font-semibold text-emerald-600 mb-4">Dashboard</h1>
          <p className="text-slate-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const cardItems = [
    { label: "Total Users", value: stats.cards.totalUsers },
    { label: "Restaurants", value: stats.cards.totalRestaurants },
    { label: "Volunteers", value: stats.cards.totalVolunteers },
    { label: "NGOs", value: stats.cards.totalNgos },
    { label: "Food Posts", value: stats.cards.totalFoods },
    { label: "Pickup Requests", value: stats.cards.totalRequests },
    { label: "Delivered Foods", value: stats.cards.deliveredFoods },
    { label: "People Served", value: stats.cards.totalPeopleServed },
  ];

  const pieColors = ["#2f7d6d", "#8bc6b3", "#f4b860", "#ef6f6c"];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-emerald-600">
                FoodBridge Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Real-time system overview generated from MongoDB data.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cardItems.map((item) => (
            <div
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              key={item.label}
            >
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                {item.label}
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                {item.value ?? 0}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">User Role Distribution</h3>
            <div className="mt-6 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.userRoleChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {stats.userRoleChart.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Food Status Overview</h3>
            <div className="mt-6 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.foodStatusChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2f7d6d" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Impact Summary</h3>
            <div className="mt-6 h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.impactChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#17483f" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;