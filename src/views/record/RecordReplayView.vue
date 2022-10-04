<template>
  <ViewContainer>
    <div class="main" v-if="recordStore.isRecord">
      <el-badge
        value="win"
        type="success"
        :hidden="recordStore.loser === 'A' || recordStore.loser === 'all'"
      >
        <span class="player-name" style="color: #329bea">
          {{ recordStore.aName }}
        </span>
      </el-badge>

      <GameMap />

      <el-badge
        value="win"
        type="success"
        :hidden="recordStore.loser === 'B' || recordStore.loser === 'all'"
      >
        <span class="player-name" style="color: #e8646f">
          {{ recordStore.bName }}
        </span>
      </el-badge>
    </div>
    <div
      v-else
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <el-empty description="无数据" />
    </div>
  </ViewContainer>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onUnmounted, onUpdated } from "vue-demi";
import ViewContainer from "../../components/view-container/ViewContainer.vue";
import GameMap from "../../components/game-map/GameMap.vue";
import { useRouter } from "vue-router";
import { usePkStore } from "../../stores/pk/pk.store";
import { useRecordStore } from "../../stores/record/record.store";

const pkStore = usePkStore();
const recordStore = useRecordStore();
const router = useRouter();

onUnmounted(() => {
  console.log("sss");
  pkStore.$reset();
  recordStore.$reset();
});
</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.player-name {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>
