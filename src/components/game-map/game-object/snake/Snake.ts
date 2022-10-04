import { BaseGameObject } from "../BaseGameObject";
import type { GameMap } from "../GameMap";
import { SnakeCell } from "./SnakeCell";
import { DirectionType, SnakePkStatusType, type ISnakeInfo } from "./type";
import {
  Epsilon,
  EyeOffsetX,
  EyeOffsetY,
  OffsetCol,
  OffsetRow,
} from "./constant";
import { snakeDieColor, snakeEyeColor } from "../colors";

export class Snake extends BaseGameObject {
  id: number; // 蛇序号
  color: string; // 蛇颜色
  gameMap: GameMap; // 地图结点

  curStep: number; // 当前的回合数
  direction: DirectionType; // 方向指令

  cellList: SnakeCell[]; // 存放蛇的身体，[0]存放蛇头
  nextCell: SnakeCell | null; // 下一步的蛇头结点
  status: SnakePkStatusType; // 蛇状态
  speed: number; // 蛇移动速度（x格子 / 秒）
  eyeDirection: number; // 蛇眼的方向

  constructor({ id, color, c, r }: ISnakeInfo, gameMap: GameMap) {
    super();
    this.id = id;
    this.color = color;
    this.gameMap = gameMap;

    this.curStep = 0;
    this.direction = DirectionType.NONE;

    this.cellList = [new SnakeCell(r, c)];
    this.nextCell = null;
    this.speed = 5;
    this.eyeDirection = id === 0 ? DirectionType.UP : DirectionType.DOWN;
    this.status = SnakePkStatusType.IDLE;
  }

  update() {
    if (this.status === SnakePkStatusType.MOVE) this.move();

    this.render();
  }

  render() {
    const { pxPerGrid, ctx } = this.gameMap;

    // 绘制身体
    ctx.fillStyle =
      this.status === SnakePkStatusType.DIE ? snakeDieColor : this.color;

    this.cellList.forEach((cell) => {
      ctx.beginPath();
      ctx.arc(
        cell.x * pxPerGrid,
        cell.y * pxPerGrid,
        (pxPerGrid / 2) * 0.8,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    // 补全每节身体间的空隙
    for (let i = 1; i < this.cellList.length; i++) {
      const a = this.cellList[i - 1],
        b = this.cellList[i];

      if (Math.abs(a.x - b.x) < Epsilon && Math.abs(a.y - b.y) < Epsilon)
        continue;

      if (Math.abs(a.x - b.x) < Epsilon)
        ctx.fillRect(
          (a.x - 0.4) * pxPerGrid,
          Math.min(a.y, b.y) * pxPerGrid,
          pxPerGrid * 0.8,
          Math.abs(a.y - b.y) * pxPerGrid
        );
      else
        ctx.fillRect(
          Math.min(a.x, b.x) * pxPerGrid,
          (a.y - 0.4) * pxPerGrid,
          Math.abs(a.x - b.x) * pxPerGrid,
          pxPerGrid * 0.8
        );
    }

    // 绘制蛇眼
    ctx.fillStyle = snakeEyeColor;

    for (let i = 0; i < 2; i++) {
      const eyeX =
        (this.cellList[0].x + EyeOffsetX[this.eyeDirection][i] * 0.15) *
        pxPerGrid;
      const eyeY =
        (this.cellList[0].y + EyeOffsetY[this.eyeDirection][i] * 0.15) *
        pxPerGrid;

      ctx.beginPath();
      ctx.arc(eyeX, eyeY, pxPerGrid * 0.05, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 判断当前回合蛇是否需要增加长度
  isSnakeNeedIncrease() {
    if (this.curStep <= 10) return true;
    if (this.curStep % 3 === 1) return true;
    return false;
  }

  // 蛇移动
  move() {
    if (!this.nextCell) return;

    const offsetX = this.nextCell.x - this.cellList[0].x;
    const offsetY = this.nextCell.y - this.cellList[0].y;
    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2); // 距离目标点的距离

    // 走到目标点
    if (distance < Epsilon) {
      this.cellList[0] = this.nextCell;
      this.nextCell = null;
      this.status = SnakePkStatusType.IDLE;
      if (!this.isSnakeNeedIncrease()) this.cellList.pop();
      return;
    }

    // 还没走到目标点
    const moveDistance = (this.speed * this.timeDelta) / 1000; // 当前帧需要移动的距离
    this.cellList[0].x += (moveDistance * offsetX) / distance;
    this.cellList[0].y += (moveDistance * offsetY) / distance;

    if (!this.isSnakeNeedIncrease()) {
      const tail = this.cellList[this.cellList.length - 1],
        tailTarget = this.cellList[this.cellList.length - 2];
      const tailOffsetX = tailTarget.x - tail.x;
      const tailOffsetY = tailTarget.y - tail.y;
      tail.x += (moveDistance * tailOffsetX) / distance;
      tail.y += (moveDistance * tailOffsetY) / distance;
    }
  }

  // 让蛇进入下一回合
  toNextStep() {
    this.nextCell = new SnakeCell( // 设置目标点
      this.cellList[0].r + OffsetRow[this.direction],
      this.cellList[0].c + OffsetCol[this.direction]
    );
    this.eyeDirection = this.direction;
    this.direction = DirectionType.NONE;
    this.status = SnakePkStatusType.MOVE;
    this.curStep++;

    // 插入一个待移动的头结点
    this.cellList.splice(0, 0, JSON.parse(JSON.stringify(this.cellList[0])));
  }
}
