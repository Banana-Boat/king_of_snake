<template>
  <div class="header">
    <div class="logo" @click="() => $router.push('/')">
      <img src="@/assets/images/logo_64.png" height="32" width="32" />
      <div class="logo-title">
        <span style="font-size: 19px">King of Snake</span>
        <span style="font-size: 10px">小蛇对战</span>
      </div>
    </div>
    <nav class="nav-bar">
      <div
        class="nav-item"
        v-for="nav in navList"
        :key="nav.name"
        :class="{ 'nav-item-active': nav.path === activeNavPath }"
        @click="navClickHandle(nav)"
      >
        <span>{{ nav.name }}</span>
      </div>
    </nav>
    <el-button-group v-if="!userStore.isLogin" class="btn-group">
      <el-button
        @click="() => (isShowLoginDrawer = true)"
        color="#6842ff"
        round
        style="border-right: #ffffff21 solid 2px"
      >
        登录
      </el-button>
      <el-button
        @click="() => (isShowRegisterDrawer = true)"
        color="#6842ff"
        round
      >
        注册
      </el-button>
    </el-button-group>
    <div v-else class="info">
      <span style="margin-right: 18px">{{ userStore.name }}</span>
      <el-button @click="logout" round>注销</el-button>
    </div>
    <LoginDrawer
      :isShow="isShowLoginDrawer"
      :closeHandle="() => (isShowLoginDrawer = false)"
      :showRegisterDrawer="() => (isShowRegisterDrawer = true)"
    />
    <RegisterDrawer
      :isShow="isShowRegisterDrawer"
      :closeHandle="() => (isShowRegisterDrawer = false)"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useUserStore } from "../../stores/user/user.store";
import LoginDrawer from "./components/LoginDrawer.vue";
import RegisterDrawer from "./components/RegisterDrawer.vue";

interface INav {
  name: string;
  path: string;
}
const router = useRouter();
const userStore = useUserStore();
const isShowLoginDrawer = ref(false); // 是否展示登录抽屉
const isShowRegisterDrawer = ref(false); // 是否展示注册抽屉
const activeNavPath = computed(() => router.currentRoute.value.path); // 当前选中的nav
const navList = ref<INav[]>([
  {
    name: "对战",
    path: "/pk/",
  },
  {
    name: "排行榜",
    path: "/rank-list/",
  },
  {
    name: "对局记录",
    path: "/record/",
  },
]);

const navClickHandle = (nav: INav) => {
  router.push(nav.path);
};

const logout = () => {
  userStore.$reset();
  sessionStorage.removeItem("jwt_token");
  ElMessage.success("注销成功");
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 0 20px;
  background-color: #1f2030;

  color: #fff;
  box-shadow: #111111 2px 10px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.logo-title {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.nav-bar {
  display: flex;
  height: 100%;
}
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 5px;

  width: 140px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 25px;
}
.nav-item:hover {
  background-color: #303243;
}
.nav-item-active {
  background-color: #13141e;
  font-weight: bold;
}

.btn-group {
  display: flex;
  justify-content: end;
  width: 200px;
}

.info {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 200px;
}
</style>
