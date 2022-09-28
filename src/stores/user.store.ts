import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const id = ref("");
  const name = ref("");
  const token = ref("");
  const isLogin = ref(false);

  const reset = () => {
    id.value = "";
    name.value = "";
    token.value = "";
    isLogin.value = false;
  };

  return {
    id,
    name,
    token,
    isLogin,
    reset,
  };
});
