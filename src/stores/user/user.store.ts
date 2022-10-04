import { defineStore } from "pinia";
import type { IUserAction, IUserState } from "./types";

export const useUserStore = defineStore<string, IUserState, {}, IUserAction>(
  "user",
  {
    state: () => ({
      id: "",
      name: "",
      token: "",
      isLogin: false,
    }),
  }
);
