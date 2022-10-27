<template>
  <div class="main">
    <div class="player-info">
      <el-badge value="我" type="warning">
        <span class="player-name" style="color: #329bea">
          {{ userStore.name }}
        </span>
      </el-badge>
      <div class="oper-img">
        <ArrowIcon color="#329bea59" :direction="userDirection" />
      </div>
    </div>

    <GameMap />

    <div class="player-info">
      <span class="player-name" style="color: #e8646f">
        {{ pkStore.rivalName }}
      </span>
      <div class="oper-img">
        <ArrowIcon color="#e8646f5c" :direction="rivalDirection" />
      </div>
    </div>

    <ResultDialog />
  </div>
</template>

<script setup lang="ts">
import GameMap from "../../../components/game-map/GameMap.vue";
import ArrowIcon from "../../../assets/icons/arrow.vue";
import ResultDialog from "../components/ResultDialog.vue";
import { DirectionType } from "../../../components/game-map/game-object/snake/type";
import { computed, onUnmounted, ref, watch } from "vue";
import { usePkStore } from "../../../stores/pk/pk.store";
import { useUserStore } from "../../../stores/user/user.store";
import { reverseDirection } from "../../../utils/utils";

const pkStore = usePkStore();
const userStore = useUserStore();

onUnmounted(() => {
  pkStore.socket?.close();
  pkStore.$reset();
});

const userDirection = computed(() => {
  return pkStore.selfIndex === "A"
    ? pkStore.playerAInfo.curDirection
    : reverseDirection(pkStore.playerBInfo.curDirection);
});

const rivalDirection = computed(() => {
  return pkStore.selfIndex === "A"
    ? pkStore.playerBInfo.curDirection
    : reverseDirection(pkStore.playerAInfo.curDirection);
});
</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.player-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.player-name {
  font-size: 24px;
  margin-bottom: 10px;
}
.oper-img {
  width: 100px;
  height: 100px;
  margin-top: 20px;
}
</style>
