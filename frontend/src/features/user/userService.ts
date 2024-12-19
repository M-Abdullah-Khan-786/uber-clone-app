import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/api/user/login`, credentials);
  return response.data;
};

const logout = async () => {
  await axios.post(`${API_BASE_URL}/api/user/logout`);
};

const authService = {
  login,
  logout,
};

export default authService;
