import useAuthStore from "@/modules/auth/store";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface TokenResponse {
  token: string;
  refresh_token: string;
}

interface ApiClient {
  get: <T>(path: string) => Promise<T>;
  post: <T>(path: string, data: T, formData?: FormData) => Promise<T>;
  put: <T>(path: string, data: T, formData?: FormData) => Promise<T>;
  del: (path: string) => Promise<void | AxiosError>;
}

export const ApiClient = (): ApiClient => {
  const userState = useAuthStore();
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = userState.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (
        originalRequest &&
        error.response?.status === 401 &&
        userState.access_token
      ) {
        const refreshToken = userState.refresh_token;

        const data = JSON.stringify({
          refresh_token: refreshToken,
        });

        try {
          const response = await api.post<TokenResponse>("/lms/refresh/", data);

          userState.updateToken(response.data.token);

          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return await api(originalRequest);
        } catch (err) {
          userState.signout();
        }
      }

      return Promise.reject(error);
    }
  );

  const get = async <T,>(path: string): Promise<T> => {
    const response = await api.get<T>(path);
    return response.data;
  };

  const post = async <T,>(
    path: string,
    data: T,
    formData?: FormData
  ): Promise<T> => {
    const response = await api.post<T>(path, formData, { params: data });
    return response.data;
  };

  const put = async <T,>(
    path: string,
    data: T,
    formData?: FormData
  ): Promise<T> => {
    const response = await api.put<T>(path, formData, { params: data });
    return response.data;
  };

  const del = async (path: string): Promise<void | AxiosError> => {
    const response = await api.delete(path);
    return response.data;
  };

  return {
    get,
    post,
    put,
    del,
  };
};
