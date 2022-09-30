import { BaseGameObject } from "./BaseGameObject";
import type { GameMap } from "./GameMap";
import { wallColor } from "./colors";

export class Wall extends BaseGameObject {
  c: number; // 所在列
  r: number; // 所在行
  color: string; // 墙颜色
  gameMap: GameMap; // 地图结点

  constructor(r: number, c: number, gameMap: GameMap) {
    super();

    this.c = c;
    this.r = r;
    this.gameMap = gameMap;
    this.color = wallColor;
  }

  update(): void {
    this.render();
  }

  render() {
    const { pxPerGrid, ctx } = this.gameMap;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.c * pxPerGrid, this.r * pxPerGrid, pxPerGrid, pxPerGrid);

    // const img = new Image();
    // img.onload = () => {
    //   ctx.drawImage(
    //     img,
    //     this.c * pxPerGrid,
    //     this.r * pxPerGrid,
    //     pxPerGrid,
    //     pxPerGrid
    //   );
    // };
    // img.src =
    //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAJ1BMVEUfHyIiIiQUFBQiIiMhISMbGx0bGxweHiEcHB4dHR8UFBUTExQMDA2RS6qyAAABNklEQVR42o3S0W6DMBAF0UlbY4z9/99bFZMUjYR1eYtkfDbsMP6e+v0avR9H72NvbWz7/vlZ69i2Ms5ffdSf15gP58lynuyfk6W8X2xwnZTAJLYyX5x3/j/nPcfXxG/CfLFeh9ZTS2C0yvUP1lNLYJTWrhfXU0vg9s3WU0tAdz5PLYHbN1tM3bDAbdO6U1uRgDbtqR9bQnd66seWiPuUQNynBOI+JRD3KYG4TwnEfUog7lMCcZ8SiPuUQNynBOI+JRD3KYG4TwnEfUog7lMCcZ8SiPuUQNynBOI+JRD3KYG4TwnEfVqI+5RA3KcE4j4lEPcpgbhPCcR9SiDuUwJxnxKI+5RA3KcE4j4lEPcpgbhPCaR9eiukfXor5H1qlrRPb4W0T2+FtE9vhbRPz0Lap7dC2qe38gvuf3gW9g7N7AAAAABJRU5ErkJggg==";
  }
}
