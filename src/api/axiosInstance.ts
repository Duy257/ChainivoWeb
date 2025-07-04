import axios from "axios";
import ConfigAPI from "@/config/ConfigAPI";
import {
  getDataToLocalStorage,
  removeDataToLocalStorage,
  saveDataToLocalStorage,
} from "@/utils/LocalStorage";
import navigationService from "@/services/NavigationService";

const axiosInstance = axios.create({
  baseURL: ConfigAPI.url,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getDataToLocalStorage("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getDataToLocalStorage("refreshToken");
      if (!refreshToken) {
        navigationService.replace("/login");
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(ConfigAPI.url + "data/refreshToken", {
          refreshToken,
        });

        if (res.data.code === 200) {
          const newAccessToken = res.data.accessToken;
          saveDataToLocalStorage("accessToken", newAccessToken);
          saveDataToLocalStorage(
            "timeRefresh",
            `${Date.now() / 1000 + 9 * 60}`
          );
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
          processQueue(null, newAccessToken);
          return axiosInstance(originalRequest);
        }
      } catch (e) {
        processQueue(e, null);
        removeDataToLocalStorage("accessToken");
        removeDataToLocalStorage("refreshToken");
        removeDataToLocalStorage("timeRefresh");
        navigationService.replace("/login");
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
