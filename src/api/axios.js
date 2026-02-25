import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4800/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Global response handler (very useful)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized. Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // adjust if needed
    }

    return Promise.reject(error);
  }
);

// 📦 API functions
export const getCategories = () => api.get("/categories");
export const getTransactions = () => api.get("/transactions");
export const getBudgets = () => api.get("/budgets");
export const getGoals = () => api.get("/goals");

export default api;