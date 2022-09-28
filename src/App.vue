<template>
  <Header />
  <RouterView />
</template>

<script setup lang="ts">
import Header from "./components/header/Header.vue";
import { RouterView } from "vue-router";
import { getUserInfo } from "./utils/loginAPIs";
import { useUserStore } from "./stores/user.store";

const userStore = useUserStore();

const token = localStorage.getItem("jwt_token");
if (token) {
  userStore.token = token;
  try {
    getUserInfo();
  } catch {
    console.log("获取用户信息失败");
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #0c0d14;
}
:root {
  /* 自定义颜色 */
  --kos-btn-color: #6842ff;
}
</style>
