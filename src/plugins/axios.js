import axios from "axios";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: "http://127.0.0.1:8001/api",
  timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
  // Accept: '*/*',
};

const api = axios.create(config);

export function setAuthToken(token) {
  api.defaults.headers["access_token"] = token ? `Bearer ${token}` : null;
}

export default api;
