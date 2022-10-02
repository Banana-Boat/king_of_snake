<template>
  <div class="main">
    <ArrowIcon color="#329bea59" :direction="playerAOper" class="oper-img" />
    <GameMap />
    <ArrowIcon color="#e8646f5c" :direction="playerBOper" class="oper-img" />
  </div>
</template>

<script setup lang="ts">
import GameMap from "../../../components/game-map/GameMap.vue";
import ArrowIcon from "../../../assets/icons/arrow.vue";
import { DirectionType } from "../../../components/game-map/game-object/snake/type";
import { ref } from "vue";

const playerAOper = ref(DirectionType.UP);
const playerBOper = ref(DirectionType.DOWN);
</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.oper-img {
}
</style>
