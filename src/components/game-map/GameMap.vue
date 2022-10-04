<template>
  <div ref="parentNodeRef" class="game-map">
    <canvas ref="canvasNodeRef" tabindex="0" style="outline: none"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GameMap } from "./game-object/GameMap";
import { usePkStore } from "../../stores/pk/pk.store";

const parentNodeRef = ref<HTMLDivElement>();
const canvasNodeRef = ref<HTMLCanvasElement>();

const pkStore = usePkStore();

onMounted(() => {
  if (!parentNodeRef.value || !canvasNodeRef.value) return;

  const gameMapObject = new GameMap(
    canvasNodeRef.value.getContext("2d") as CanvasRenderingContext2D,
    parentNodeRef.value
  );
  pkStore.gameMapObject = gameMapObject;
});
</script>

<style scoped>
.game-map {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 85%;
}
</style>
