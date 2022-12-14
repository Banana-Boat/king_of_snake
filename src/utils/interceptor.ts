import axios from "axios";
import qs from "qs";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user/user.store";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

instance.interceptors.request.use(
  (config) => {
    // application/x-www-form-urlencoded 需要将data数据进行特殊序列化
    if (config.method === "post") config.data = qs.stringify(config.data);

    // 如果 token 存在，则注入 Authorization 中
    const { token } = useUserStore();
    if (token && config.headers)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { error_message: msg } = response.data;

    if (msg && msg !== "success") {
      ElMessage.error({
        message: msg,
        duration: 1500,
      });
      return false;
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
