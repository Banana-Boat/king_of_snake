<template>
  <div class="main">
    <div class="player-container">
      <div class="player">
        <img src="@/assets/images/player.png" />
        <span>{{ userStore.name ? userStore.name : "---" }}</span>
      </div>
      <div>
        <img style="width: 90px" src="@/assets/images/vs.png" />
      </div>
      <div class="player">
        <img src="@/assets/images/unknown.png" />
        <span>未知玩家</span>
      </div>
    </div>
    <el-button
      @click="matchBtnClickHandle"
      class="match-btn"
      size="large"
      color="#6842ff"
      round
    >
      开始匹配
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../stores/user.store";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

const matchBtnClickHandle = () => {
  if (!userStore.isLogin) {
    return ElMessage({
      message: "您还未登录，请先登录！",
      type: "error",
      duration: 2000,
    });
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.match-btn {
  width: 160px;
}
.match-btn:hover {
  transform: scale(1.1);
  transition-timing-function: ease-out;
}

.player-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 60px;
}
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.player img {
  width: 160px;
  margin-bottom: 20px;
}
</style>
