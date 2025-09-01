import axios, { AxiosInstance, AxiosResponse } from "axios";

interface LoginProps {
  email: string;
  password: string;
  deviceName: string;
  location: string;
}

const withRefresh = <T extends (...args: any[]) => Promise<any>>(
  method: T
): T => {
  return async function (
    this: DebuggersAPI,
    ...args: Parameters<T>
  ): Promise<ReturnType<T>> {
    console.log(window.location.origin);
    try {
      return await method.apply(this, args);
    } catch (error: any) {
      if (error.response?.status === 403) {
        await axios.post(
          `/api/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );
        return await method.apply(this, args);
      }
      throw error;
    }
  } as T;
};

export class DebuggersAPI {
  private static instance: DebuggersAPI;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      withCredentials: true,
      timeout: 5000,
    });
  }

  public static getInstance(): DebuggersAPI {
    if (!DebuggersAPI.instance) {
      DebuggersAPI.instance = new DebuggersAPI();
    }
    return DebuggersAPI.instance;
  }

  async login(props: LoginProps): Promise<void> {
    await this.axiosInstance.post("/api/auth/login", props);
  }

  isLoggedIn = withRefresh(async (): Promise<JWTPayLoad | undefined> => {
    const { data } = await this.axiosInstance.get("/api/auth/authenticate");
    return data;
  });

  private normalizePath(path: string): string {
    return path.startsWith("/") ? path.slice(1) : path;
  }

  get = withRefresh(
    async <T = any,>(path: string): Promise<AxiosResponse<T>> => {
      const normalizedPath = this.normalizePath(path);
      return this.axiosInstance.get(`/api/${normalizedPath}`);
    }
  );

  post = withRefresh(
    async <T = any,>(path: string, data: any): Promise<AxiosResponse<T>> => {
      const normalizedPath = this.normalizePath(path);
      return this.axiosInstance.post(`/api/${normalizedPath}`, data);
    }
  );

  patch = withRefresh(
    async <T = any,>(path: string, data: any): Promise<AxiosResponse<T>> => {
      const normalizedPath = this.normalizePath(path);
      return this.axiosInstance.patch(`/api/${normalizedPath}`, data);
    }
  );

  delete = withRefresh(
    async <T = any,>(path: string): Promise<AxiosResponse<T>> => {
      const normalizedPath = this.normalizePath(path);
      return this.axiosInstance.delete(`/api/${normalizedPath}`);
    }
  );
}
