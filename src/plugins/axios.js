import axios from "axios";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const LARAVEL_APP_URL = "http://127.0.0.1:8001";

const config = {
  baseURL: `${LARAVEL_APP_URL}/api`,
  timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
  // Accept: '*/*',
};

const api = axios.create(config);

export function setAuthToken(token) {
  if (token) {
    // Setting the Authorization header with the Bearer token
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Authorization header set with token.");
  } else {
    // Removing the Authorization header if no token is provided
    delete api.defaults.headers.common["Authorization"];
    console.log("Authorization header removed.");
  }
}

const token = localStorage.getItem("access_token");
if (token) {
  setAuthToken(token);
  console.log("Last token is: ", token);
}
export default api;
