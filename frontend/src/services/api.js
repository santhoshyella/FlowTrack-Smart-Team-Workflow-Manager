import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("flowtrack_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authService = {
  signup: (payload) => api.post("/auth/signup", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
  users: (search = "") => api.get("/auth/users", { params: { search } })
};

export const workspaceService = {
  all: () => api.get("/workspaces"),
  create: (payload) => api.post("/workspaces", payload),
  byId: (id) => api.get(`/workspaces/${id}`),
  addMember: (id, email) => api.post(`/workspaces/${id}/members`, { email })
};

export const taskService = {
  all: (params = {}) => api.get("/tasks", { params }),
  create: (payload) => api.post("/tasks", payload),
  updateStatus: (id, status) => api.patch(`/tasks/${id}/status`, { status }),
  analytics: () => api.get("/tasks/analytics/summary"),
  runAgent: () => api.post("/run-agent")
};

export default api;
