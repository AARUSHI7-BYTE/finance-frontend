import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4800/api",
  headers: {
    "Content-Type": "application/json",
  },
});



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

/* ===================================
   RESPONSE INTERCEPTOR
   Handle Global Errors
=================================== */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out...");

      localStorage.removeItem("token");

      // Redirect safely
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

/* ===================================
   API FUNCTIONS
=================================== */

export const getCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
export const createDefaultCategories = () =>
  api.post("/categories/default");

export const getTransactions = () => api.get("/transactions");
export const createTransaction = (data) =>
  api.post("/transactions", data);
export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`);

export const getBudgets = () => api.get("/budgets");
export const createBudget = (data) => api.post("/budgets", data);
export const deleteBudget = (id) =>
  api.delete(`/budgets/${id}`);

export const getGoals = () => api.get("/goals");
export const createGoal = (data) => api.post("/goals", data);
export const updateGoal = (id, data) =>
  api.put(`/goals/${id}`, data);
export const deleteGoal = (id) =>
  api.delete(`/goals/${id}`);


export default api;