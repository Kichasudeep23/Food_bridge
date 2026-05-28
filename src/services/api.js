import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api",
});

// JWT Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ================= AUTH =================
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ================= FOOD =================
export const addFoodPost = (data) =>
  API.post("/food", data);

export const getFoodPosts = () =>
  API.get("/food");

export const getAdminFoodPosts = () =>
  API.get("/food/admin/all");

export const getMyFoodPosts = () =>
  API.get("/food/my-foods");

export const updateFoodPost = (foodId, data) =>
  API.put(`/food/${foodId}`, data);

export const deleteFoodPost = (foodId) =>
  API.delete(`/food/${foodId}`);

// ================= PICKUP =================
export const createPickupRequest = (foodId, data) =>
  API.post(`/pickup/${foodId}`, data);

export const getMyPickupRequests = () =>
  API.get("/pickup/my-requests");

export const getAllPickupRequests = () =>
  API.get("/pickup");

export const updatePickupStatus = (requestId, data) =>
  API.put(`/pickup/${requestId}`, data);

// ================= USERS =================
export const getProfile = () =>
  API.get("/users/profile");

export const updateProfile = (data) =>
  API.put("/users/profile", data);

export const getAllUsers = () =>
  API.get("/users");

export const verifyUser = (userId) =>
  API.put(`/users/verify/${userId}`);

export const getDeliveryHistory = () =>
  API.get("/users/history");

export const getLeaderboard = () =>
  API.get("/users/leaderboard");

// ================= NOTIFICATIONS =================
export const getNotifications = () =>
  API.get("/notifications");

export const markNotificationsRead = () =>
  API.put("/notifications/read");

export const sendEmergencyBroadcast = (data) =>
  API.post("/notifications/broadcast", data);

// ================= REPORT =================
export const downloadAdminReport = () =>
  API.get("/report/download", {
    responseType: "blob",
  });

// ================= DASHBOARD =================
export const getDashboardStats = () =>
  API.get("/dashboard/stats");

// ================= LOGOUT =================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ================= CHECK LOGIN =================
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// ================= GET CURRENT USER =================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export default API;