<template>
  <div class="main">
    <GameMap />
  </div>
</template>

<script setup lang="ts">
import GameMap from "../../../components/game-map/GameMap.vue";
</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
