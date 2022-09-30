import { BaseGameObject } from "./BaseGameObject";
import { Wall } from "./Wall";
import { snake0Color, snake1Color, mapColor } from "./colors";
import { Snake } from "./snake/Snake";
import { DirectionType, SnakeStatusType } from "./snake/type";
import type { SnakeCell } from "./snake/SnakeCell";

export class GameMap extends BaseGameObject {
  ctx: CanvasRenderingContext2D; // 画布结点
  parent: HTMLDivElement; // 画布的父结点

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
    for (let i = 0; i < 1000; i++) if (this.createWalls()) break;

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
    const g: boolean[][] = [];
    for (let r = 0; r < this.rows; r++) {
      g[r] = [];
      for (let c = 0; c < this.cols; c++) {
        g[r][c] = false;
      }
    }

    // 给四周加上障碍物
    for (let r = 0; r < this.rows; r++) {
      g[r][0] = g[r][this.cols - 1] = true;
    }

    for (let c = 0; c < this.cols; c++) {
      g[0][c] = g[this.rows - 1][c] = true;
    }

    // 创建随机障碍物
    for (let i = 0; i < this.innerWallCount / 2; i++) {
      for (let j = 0; j < 1000; j++) {
        let r = Math.floor(Math.random() * this.rows);
        let c = Math.floor(Math.random() * this.cols);
        if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
        if ((r == this.rows - 2 && c == 1) || (r == 1 && c == this.cols - 2))
          continue;

        g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
        break;
      }
    }

    const copy_g = JSON.parse(JSON.stringify(g));
    if (!this.isConnected(copy_g, this.rows - 2, 1, 1, this.cols - 2))
      return false;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (g[r][c]) {
          this.wallList.push(new Wall(r, c, this));
        }
      }
    }

    return true;
  }

  // 判断墙的连通性
  isConnected(g: true[][], sx: number, sy: number, tx: number, ty: number) {
    if (sx == tx && sy == ty) return true;
    g[sx][sy] = true;

    let dx = [-1, 0, 1, 0],
      dy = [0, 1, 0, -1];
    for (let i = 0; i < 4; i++) {
      let x = sx + dx[i],
        y = sy + dy[i];
      if (!g[x][y] && this.isConnected(g, x, y, tx, ty)) return true;
    }

    return false;
  }

  // 添加键盘监听事件
  addKeyEventListener() {
    this.ctx.canvas.focus();

    const [snake0, snake1] = this.snakeList;
    this.ctx.canvas.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          snake0.direction = DirectionType.UP;
          break;
        case "d":
          snake0.direction = DirectionType.RIGHT;
          break;
        case "s":
          snake0.direction = DirectionType.DOWN;
          break;
        case "a":
          snake0.direction = DirectionType.LEFT;
          break;
        case "ArrowUp":
          snake1.direction = DirectionType.UP;
          break;
        case "ArrowRight":
          snake1.direction = DirectionType.RIGHT;
          break;
        case "ArrowDown":
          snake1.direction = DirectionType.DOWN;
          break;
        case "ArrowLeft":
          snake1.direction = DirectionType.LEFT;
          break;
      }
    });
  }

  // 进入下一回合
  toNextStep() {
    for (const snake of this.snakeList) snake.toNextStep();
  }

  // 判断两条蛇是否都准备好进入下一回合
  isBothSnakeReady() {
    for (const snake of this.snakeList) {
      const { status, direction } = snake;
      if (status !== SnakeStatusType.IDLE || direction === DirectionType.NONE)
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
