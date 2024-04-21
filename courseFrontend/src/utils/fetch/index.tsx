import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface TokenResponse {
  token: string;
  refresh_token: string;
}

interface ApiClient {
  login: (email: string, password: string) => Promise<void | AxiosError>;
  get: <T>(path: string) => Promise<T>;
  post: <T>(path: string, data: T) => Promise<T>;
  put: <T>(path: string, data: T) => Promise<T>;
  del: (path: string) => Promise<void | AxiosError>;
}

export const ApiClient = (): ApiClient => {
  const api: AxiosInstance = axios.create({
    baseURL: "URL",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
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
        localStorage.getItem("refresh_token")
      ) {
        const refreshToken = localStorage.getItem("refresh_token");

        const data = JSON.stringify({
          refresh_token: refreshToken,
        });

        try {
          const response = await api.post<TokenResponse>("/refresh", data);
          localStorage.setItem("access_token", response.data.token);
          localStorage.setItem("refresh_token", response.data.refresh_token);

          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return await api(originalRequest);
        } catch (err) {
          console.log(err);
        }
      }

      return Promise.reject(error);
    }
  );

  const login = async (
    email: string,
    password: string
  ): Promise<void | AxiosError> => {
    try {
      const { data } = await api.post("/authentication_token", {
        email,
        password,
      });
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("refresh_token", data.refresh_token);
    } catch (err) {
      return err as AxiosError;
    }
  };

  const get = async <T,>(path: string): Promise<T> => {
    const response = await api.get<T>(path);
    return response.data;
  };

  const post = async <T,>(path: string, data: T): Promise<T> => {
    const response = await api.post<T>(path, data);
    return response.data;
  };

  const put = async <T,>(path: string, data: T): Promise<T> => {
    const response = await api.put<T>(path, data);
    return response.data;
  };

  const del = async (path: string): Promise<void | AxiosError> => {
    const response = await api.delete(path);
    return response.data;
  };

  return {
    login,
    get,
    post,
    put,
    del,
  };
};
