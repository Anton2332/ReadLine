import axios from 'axios';
import toast from 'react-hot-toast';

import { authService } from '@/common/services/auth.service';

const axiosInstance = axios.create({
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await authService.refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    }
    const serverErrorMessage = error.response?.data?.errorMessage;
    toast.error(serverErrorMessage, { duration: 2000 });
    return Promise.reject(error);
  }
);

export { axiosInstance };
