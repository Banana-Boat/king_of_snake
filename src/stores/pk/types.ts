import type { GameMap } from "@/components/game-map/game-object/GameMap";
import type { DirectionType } from "@/components/game-map/game-object/snake/type";
import type { PkSocket } from "@/views/pk/PkSocket";

export const enum PkStatusType {
  NONE,
  MATCHING,
  PLAYING,
}

export interface PlayerInfoType {
  id: number;
  sx: number;
  sy: number;
  curDirection: DirectionType;
}

export interface IUpdateGameParams {
  map: boolean[][];
  a_id: number;
  a_sx: number;
  a_sy: number;
  b_id: number;
  b_sx: number;
  b_sy: number;
}

export interface IPkState {
  status: PkStatusType; // 对局状态
  socket: PkSocket | null; // socket对象
  selfIndex: string; // 玩家自身在游戏中的代号（A or B）
  rivalName: string; // 对手用户名
  gameMap: boolean[][] | null; // 后端生成的游戏地图
  gameMapObject: GameMap | null; // 前端GameMap类的实例
  loser: string; // 失败者
  playerAInfo: PlayerInfoType; // A玩家信息
  playerBInfo: PlayerInfoType; // B玩家信息
}

export interface IPkAction {
  updateGame: (params: IUpdateGameParams) => void;
  updateDirection: (user: string, direction: number) => void;
}
