import axios from "axios";

const baseURL = "http://localhost:3001"

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Додаємо цю опцію для відправки cookie
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        await axios.post(`${baseURL}/api/refresh`);
        return api(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);


export default api;
