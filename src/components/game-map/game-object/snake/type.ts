export interface ISnakeInfo {
  id: number;
  color: string;
  c: number;
  r: number;
}

export const enum SnakeStatusType {
  IDLE, // 静止
  MOVE, // 移动
  DIE, // 死亡
}

export const enum DirectionType {
  NONE = -1,
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}
