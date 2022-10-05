<template>
  <div class="main">
    <div class="player-container">
      <div class="player">
        <img src="@/assets/images/player.png" />
        <span>{{ userStore.name ? userStore.name : "---" }}</span>
      </div>
      <div>
        <img style="width: 80px" src="@/assets/images/vs.png" />
      </div>
      <div class="player" v-loading="pkStore.status === PkStatusType.MATCHING">
        <img src="@/assets/images/unknown.png" />
        <span>{{ rivalName }}</span>
      </div>
    </div>
    <el-button
      @click="matchBtnHandle"
      class="match-btn"
      size="large"
      color="#6842ff"
      round
    >
      {{ btnText }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../stores/user/user.store";
import { usePkStore } from "../../../stores/pk/pk.store";
import { ElMessage } from "element-plus";
import { computed } from "vue-demi";
import { PkSocket } from "../PkSocket";
import { PkStatusType } from "../../../stores/pk/types";

const userStore = useUserStore();
const pkStore = usePkStore();
const btnText = computed(() => {
  return pkStore.status === PkStatusType.MATCHING ? "取消匹配" : "开始匹配";
});
const rivalName = computed(() => {
  return pkStore.rivalName === "" ? "未知对手" : pkStore.rivalName;
});

let pkSocket: PkSocket;

const matchBtnHandle = () => {
  // 尚未登录
  if (!userStore.isLogin) {
    ElMessage({
      message: "您还未登录，请先登录！",
      type: "error",
      duration: 2000,
    });
    return;
  }

  // 已经登录，创建socket连接
  pkSocket = new PkSocket();
  pkSocket.matchBtnHandle();
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
  transform: scale(1.15);
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
  width: 155px;
  margin-bottom: 25px;
}
</style>
