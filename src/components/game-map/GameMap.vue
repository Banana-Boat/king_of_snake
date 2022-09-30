<template>
  <div ref="parentNodeRef" class="game-map">
    <canvas ref="canvasNodeRef" tabindex="0" style="outline: none"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GameMap } from "./game-object/GameMap";

const parentNodeRef = ref<HTMLDivElement>(null);
const canvasNodeRef = ref<HTMLCanvasElement>(null);

onMounted(() => {
  new GameMap(canvasNodeRef.value.getContext("2d"), parentNodeRef.value);
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
