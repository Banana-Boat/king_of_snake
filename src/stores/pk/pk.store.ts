import { DirectionType } from "@/components/game-map/game-object/snake/type";
import { defineStore } from "pinia";
import {
  PkStatusType,
  type IPkAction,
  type IPkState,
  type IUpdateGameParams,
} from "./types";

export const usePkStore = defineStore<string, IPkState, {}, IPkAction>("pk", {
  state: () => ({
    status: PkStatusType.NONE,
    socket: null,
    selfIndex: "",
    rivalName: "",
    gameMap: null,
    gameMapObject: null,
    loser: "",
    playerAInfo: {
      id: 0,
      sx: 0,
      sy: 0,
      curDirection: DirectionType.NONE,
    },
    playerBInfo: {
      id: 0,
      sx: 0,
      sy: 0,
      curDirection: DirectionType.NONE,
    },
  }),
  actions: {
    updateGame(params: IUpdateGameParams) {
      const { map, a_id, a_sx, a_sy, b_id, b_sx, b_sy } = params;
      this.gameMap = map;
      this.playerAInfo = {
        ...this.playerAInfo,
        id: a_id,
        sx: a_sx,
        sy: a_sy,
      };
      this.playerBInfo = {
        ...this.playerBInfo,
        id: b_id,
        sx: b_sx,
        sy: b_sy,
      };
    },
    updateDirection(user, direction) {
      let target = DirectionType.NONE;
      if (direction === 0) target = DirectionType.UP;
      else if (direction === 1) target = DirectionType.RIGHT;
      else if (direction === 2) target = DirectionType.DOWN;
      else if (direction === 3) target = DirectionType.LEFT;

      if (user === "A") this.playerAInfo.curDirection = target;
      else this.playerBInfo.curDirection = target;
    },
  },
});
