import axios from "axios";
import qs from "qs";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user/user.store";

const instance = axios.create({
  baseURL: "https://app2703.acapp.acwing.com.cn/api",
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
      ElMessage.error(msg);
      return false;
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
