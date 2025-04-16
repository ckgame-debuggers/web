import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    try {
      return await method.apply(this, args);
    } catch (error: any) {
      if (error.response?.status === 403) {
        try {
          await axios.post(
            `${BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );
          return await method.apply(this, args);
        } catch (refreshError) {
          throw new Error("로그인되지 않았습니다.");
        }
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
      baseURL: BASE_URL,
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
    await this.axiosInstance.post("/auth/login", props);
  }

  isLoggedIn = withRefresh(async (): Promise<JWTPayLoad | undefined> => {
    const { data } = await this.axiosInstance.get("/auth/authenticate");
    return data;
  });

  get = withRefresh(
    async <T = any,>(path: string): Promise<AxiosResponse<T>> => {
      return this.axiosInstance.get(path);
    }
  );

  post = withRefresh(
    async <T = any,>(path: string, data: any): Promise<AxiosResponse<T>> => {
      return this.axiosInstance.post(path, data);
    }
  );

  patch = withRefresh(
    async <T = any,>(path: string, data: any): Promise<AxiosResponse<T>> => {
      return this.axiosInstance.patch(path, data);
    }
  );

  delete = withRefresh(
    async <T = any,>(path: string): Promise<AxiosResponse<T>> => {
      return this.axiosInstance.delete(path);
    }
  );
}
