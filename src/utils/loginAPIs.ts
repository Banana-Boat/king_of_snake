import axios from "@/utils/interceptor";
import { useUserStore } from "@/stores/user.store";
import { ElMessage } from "element-plus";

interface loginRequest {
  username: string;
  password: string;
}

interface loginResponse {
  token: string;
}

interface registerRequest {
  username: string;
  password: string;
  confirmedPassword: string;
}

interface getInfoResponse {
  id: string;
  username: string;
}

export const getUserInfo = async () =>
  axios.get<any, getInfoResponse>("/user/account/info/").then((res) => {
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

export const login = async (params: loginRequest) =>
  axios
    .post<loginRequest, loginResponse>("/user/account/token/", params)
    .then(async (res) => {
      if (res) {
        const userStore = useUserStore();
        const { token } = res;

        userStore.token = token;
        localStorage.setItem("jwt_token", token);

        return await getUserInfo();
      }
    });

export const register = async (params: registerRequest) =>
  axios
    .post<registerRequest, any>("/user/account/register/", params)
    .then((res) => {
      if (res) return true;
    });
