import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  access_token: string;
  refresh_token: string;
  name: string;
}

interface State extends User {
  signin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signup: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  signout: () => void;
  updateToken: (access_token: string) => void;
}

const defaultState: State = {
  access_token: "",
  refresh_token: "",
  name: "",
  async signin() {},
  async signup() {},
  async signout() {},
  updateToken() {},
};

const useAuthStore = create(
  persist<State>(
    (set) => ({
      ...defaultState,
      signin: async ({ email, password }) => {
        const params = new URLSearchParams({ email, password }).toString();
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/login/?${params}`,
          {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({ email, password }),
          }
        );
        const data = (await response.json()) as User;
        set(() => ({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          name: data.name,
        }));
      },
      signup: async ({ email, password, name }) => {
        const params = new URLSearchParams({
          email,
          password,
          name,
        }).toString();
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/register/?${params}`,
          {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({ email, password, name }),
          }
        );
        const data = (await response.json()) as User;
        set(() => ({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          name: data.name,
        }));
      },
      signout: () => {
        set(() => ({
          access_token: "",
          refresh_token: "",
          name: "",
        }));
      },
      updateToken: (access_token) => {
        set(() => ({
          access_token,
        }));
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
