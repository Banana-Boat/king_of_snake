import { BaseGameObject } from "../BaseGameObject";

export class SnakeCell extends BaseGameObject {
  r: number; // 所在行
  c: number; // 所在列
  x: number; // 所在行的圆心坐标
  y: number; // 所在列的圆心坐标

  constructor(r: number, c: number) {
    super();

    this.r = r;
    this.c = c;
    this.x = c + 0.5;
    this.y = r + 0.5;
  }
}
