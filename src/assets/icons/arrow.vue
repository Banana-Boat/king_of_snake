<template>
  <svg
    v-show="direction !== DirectionType.NONE"
    :style="{
      transform: `rotate(${directionMap.get(direction)}deg)`,
    }"
    t="1664699120236"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="5083"
    width="100"
    height="100"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M689.9712 512h215.7568a34.133333 34.133333 0 0 1 24.1664 58.2656L559.342933 940.782933a68.266667 68.266667 0 0 1-96.529066 0L92.296533 570.2656A34.133333 34.133333 0 0 1 116.394667 512h215.722666V103.185067a68.266667 68.266667 0 0 1 68.266667-68.266667h221.2864a68.266667 68.266667 0 0 1 68.266667 68.266667V512z"
      p-id="5084"
      :fill="color"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import { DirectionType } from "../../components/game-map/game-object/snake/type";

const { color, direction } = defineProps<{
  color: string;
  direction: DirectionType;
}>();

const directionMap = new Map([
  [DirectionType.DOWN, 0],
  [DirectionType.LEFT, 90],
  [DirectionType.UP, 180],
  [DirectionType.RIGHT, 270],
]);
</script>

<style scoped></style>
