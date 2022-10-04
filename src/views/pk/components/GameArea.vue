<template>
  <div class="main">
    <div class="player-info">
      <el-badge value="我" type="warning" :hidden="pkStore.selfIndex !== 'A'">
        <span class="player-name" style="color: #329bea">
          {{ playerAName }}
        </span>
      </el-badge>
      <div class="player-img">
        <ArrowIcon color="#329bea59" :direction="playerADirection" />
      </div>
    </div>

    <GameMap />

    <div class="player-info">
      <el-badge value="我" type="warning" :hidden="pkStore.selfIndex !== 'B'">
        <span class="player-name" style="color: #e8646f">
          {{ playerBName }}
        </span>
      </el-badge>
      <div class="player-img">
        <ArrowIcon color="#e8646f5c" :direction="playerBDirection" />
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

const pkStore = usePkStore();
const userStore = useUserStore();

onUnmounted(() => {
  pkStore.socket.close();
  pkStore.$reset();
});

const playerAName = computed(() => {
  if (pkStore.selfIndex === "A") return userStore.name;
  else return pkStore.rivalName;
});

const playerADirection = computed(() => {
  return pkStore.playerAInfo.curDirection;
});

const playerBName = computed(() => {
  if (pkStore.selfIndex === "B") return userStore.name;
  else return pkStore.rivalName;
});

const playerBDirection = computed(() => {
  return pkStore.playerBInfo.curDirection;
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
.player-img {
  width: 100px;
  height: 100px;
  margin-top: 20px;
}
</style>
