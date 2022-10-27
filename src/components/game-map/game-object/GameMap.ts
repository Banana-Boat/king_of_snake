import { BaseGameObject } from "./BaseGameObject";
import { Wall } from "./Wall";
import { snake0Color, snake1Color, mapColor } from "./colors";
import { Snake } from "./snake/Snake";
import { DirectionType, SnakePkStatusType } from "./snake/type";
import type { SnakeCell } from "./snake/SnakeCell";
import { usePkStore } from "@/stores/pk/pk.store";
import type { Store } from "pinia";
import type { IPkAction, IPkState } from "@/stores/pk/types";
import type { IRecordAction, IRecordState } from "@/stores/record/types";
import { useRecordStore } from "@/stores/record/record.store";
import { reverseDirection } from "@/utils/utils";

export class GameMap extends BaseGameObject {
  ctx: CanvasRenderingContext2D; // 画布结点
  parent: HTMLDivElement; // 画布的父结点
  pkStore: Store<string, IPkState, {}, IPkAction>;
  recordStore: Store<string, IRecordState, {}, IRecordAction>;

  pxPerGrid: number; // 一个格子所占的像素值
  cols: number; // 地图所占列数
  rows: number; // 地图所占行数
  mapColor: string[]; // 地图颜色（奇偶不同色）

  wallList: Wall[]; // 墙列表
  innerWallCount: number; // 内部墙列表（不包括外围一圈的墙）

  snakeList: Snake[]; // 蛇列表

  constructor(ctx: CanvasRenderingContext2D, parent: HTMLDivElement) {
    super();

    this.ctx = ctx;
    this.parent = parent;
    this.pkStore = usePkStore();
    this.recordStore = useRecordStore();

    this.pxPerGrid = 0;
    this.cols = 14;
    this.rows = 13;
    this.mapColor = mapColor;
    this.wallList = [];
    this.innerWallCount = 20;
    this.snakeList = [
      new Snake({ id: 0, color: snake0Color, r: this.rows - 2, c: 1 }, this),
      new Snake({ id: 1, color: snake1Color, r: 1, c: this.cols - 2 }, this),
    ];
  }

  start() {
    this.createWalls();
    this.addKeyEventListener();
  }

  update() {
    this.updateMapSize();
    if (this.isBothSnakeReady()) this.toNextStep();
    this.render();
  }

  render() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if ((i + j) % 2 === 0) this.ctx.fillStyle = this.mapColor[0];
        else this.ctx.fillStyle = this.mapColor[1];

        this.ctx.fillRect(
          i * this.pxPerGrid,
          j * this.pxPerGrid,
          this.pxPerGrid,
          this.pxPerGrid
        );
      }
    }
  }

  // 更新地图尺寸（响应式）
  updateMapSize() {
    this.pxPerGrid = Math.floor(
      Math.min(
        this.parent.clientWidth / this.cols,
        this.parent.clientHeight / this.rows
      )
    );
    this.ctx.canvas.width = this.pxPerGrid * this.cols;
    this.ctx.canvas.height = this.pxPerGrid * this.rows;
  }

  // 创建墙
  createWalls() {
    const g = this.pkStore.gameMap;
    if (!g) return;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (g[r][c]) {
          this.wallList.push(new Wall(r, c, this));
        }
      }
    }

    return true;
  }

  // 添加键盘监听事件
  addKeyEventListener() {
    if (this.recordStore.isRecord) {
      let curStep = 0;

      const { aSteps, bSteps, loser } = this.recordStore;
      const [snake0, snake1] = this.snakeList;

      const interval_id = setInterval(() => {
        if (curStep >= aSteps.length - 1) {
          if (loser === "all" || loser === "A") {
            snake0.status = SnakePkStatusType.DIE;
          }
          if (loser === "all" || loser === "B") {
            snake1.status = SnakePkStatusType.DIE;
          }
          clearInterval(interval_id);
        } else {
          snake0.direction = parseInt(aSteps[curStep]);
          snake1.direction = parseInt(bSteps[curStep]);
        }
        curStep++;
      }, 300);
    } else {
      this.ctx.canvas.focus();

      this.ctx.canvas.addEventListener("keydown", (e) => {
        let direction = DirectionType.NONE;
        switch (e.key) {
          case "w":
            direction = DirectionType.UP;
            break;
          case "d":
            direction = DirectionType.RIGHT;
            break;
          case "s":
            direction = DirectionType.DOWN;
            break;
          case "a":
            direction = DirectionType.LEFT;
            break;
          case "ArrowUp":
            direction = DirectionType.UP;
            break;
          case "ArrowDown":
            direction = DirectionType.DOWN;
            break;
          case "ArrowLeft":
            direction = DirectionType.LEFT;
            break;
          case "ArrowRight":
            direction = DirectionType.RIGHT;
            break;
        }

        direction =
          this.pkStore.selfIndex === "A"
            ? direction
            : reverseDirection(direction);

        if (direction !== DirectionType.NONE) {
          this.pkStore.socket?.send({
            event: "move",
            direction: direction.toString(),
          });
        }
      });
    }
  }

  // 进入下一回合
  toNextStep() {
    for (const snake of this.snakeList) snake.toNextStep();
  }

  // 判断两条蛇是否都准备好进入下一回合
  isBothSnakeReady() {
    for (const snake of this.snakeList) {
      const { status, direction } = snake;
      if (status !== SnakePkStatusType.IDLE || direction === DirectionType.NONE)
        return false;
    }
    return true;
  }

  // 判断目标位置是否合法（没有撞到两条蛇身和障碍物）
  isTargetCellValid(cell: SnakeCell) {
    for (const wall of this.wallList)
      if (wall.r === cell.r && wall.c === cell.c) return false;

    for (const snake of this.snakeList) {
      let k = snake.cellList.length;
      if (!snake.isSnakeNeedIncrease()) k--;

      for (let i = 0; i < k; i++)
        if (snake.cellList[i].r === cell.r && snake.cellList[i].c === cell.c)
          return false;
    }

    return true;
  }
}
