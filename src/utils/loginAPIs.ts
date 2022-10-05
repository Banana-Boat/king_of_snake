import axios from "@/utils/interceptor";
import { useUserStore } from "@/stores/user/user.store";
import { ElMessage } from "element-plus";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  confirmedPassword: string;
}

interface GetInfoResponse {
  id: string;
  username: string;
}

export const getUserInfo = async () =>
  axios.get<any, GetInfoResponse>("/user/account/info/").then((res) => {
    if (res) {
      const { id, username } = res;
      const userStore = useUserStore();
      userStore.$patch({
        id,
        name: username,
        isLogin: true,
      });
      return true;
    }
  });

export const login = async (params: LoginRequest) =>
  axios
    .post<LoginRequest, LoginResponse>("/user/account/token/", params)
    .then(async (res) => {
      if (res) {
        const userStore = useUserStore();
        const { token } = res;

        userStore.token = token;
        localStorage.setItem("jwt_token", token);

        return await getUserInfo();
      }
    });

export const register = async (params: RegisterRequest) =>
  axios
    .post<RegisterRequest, any>("/user/account/register/", params)
    .then((res) => {
      if (res) return true;
    });
