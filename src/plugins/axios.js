import axios from "axios";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const LARAVEL_APP_URL = "http://127.0.0.1:8001";

const config = {
  baseURL: `${LARAVEL_APP_URL}/api`,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  // Accept: '*/*',
};

const api = axios.create(config);

//request csrf cookie
export async function getCsrfCookie() {
  try {
    await axios.get(`${LARAVEL_APP_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
    console.log("CSRF cookie fetched successfully!");
  } catch (error) {
    console.error("Failed to fetch CSRF cookie: ", error);
    throw error;
  }
}
export function setAuthToken(token) {
  api.defaults.headers["Authorization"] = token ? `Bearer ${token}` : null;
}

const token = localStorage.getItem("access_token");
if (token) {
  setAuthToken(token);
}
export default api;
