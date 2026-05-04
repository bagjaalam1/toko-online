import axios from "axios";

const TOKEN_KEY = "rd_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (stored) {
        localStorage.removeItem(TOKEN_KEY);
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login?expired=1";
        }
      }
    }
    return Promise.reject(err);
  }
);

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY)
};

export const productsApi = {
  list: (params) => api.get("/products", { params }).then((r) => r.data),
  get: (id) => api.get(`/products/${id}`).then((r) => r.data),
  create: (data) => api.post("/products", data).then((r) => r.data),
  update: (id, data) => api.put(`/products/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/products/${id}`).then((r) => r.data)
};

export const categoriesApi = {
  list: () => api.get("/categories").then((r) => r.data)
};

export const authApi = {
  login: (username, password) =>
    api.post("/auth/login", { username, password }).then((r) => r.data),
  register: (username, password, name) =>
    api.post("/auth/register", { username, password, name }).then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data)
};

export default api;
