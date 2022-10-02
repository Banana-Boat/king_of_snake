import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { DirectionType } from "@/components/game-map/game-object/snake/type";

export const enum StatusType {
  MATCHING,
  PLAYING,
}

export const usePkStore = defineStore("pk", () => {
  const status = ref(StatusType.PLAYING);
  const socket = ref(null);
  const rivalName = ref("");
  const gameMap = ref(null);
  const gameObject = ref(null);
  const playerAInfo = reactive({
    id: 0,
    sx: 0,
    sy: 0,
    direction: DirectionType.NONE,
  });
  const playerBInfo = reactive({
    id: 0,
    sx: 0,
    sy: 0,
    direction: DirectionType.NONE,
  });
  const loser = ref("");

  return {
    status,
    socket,
    rivalName,
    gameMap,
    gameObject,
    playerAInfo,
    playerBInfo,
    loser,
  };
});
