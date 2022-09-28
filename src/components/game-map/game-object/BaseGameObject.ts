export class BaseGameObject {
  timeDelta: number;
  isStart: boolean;

  constructor() {
    this.timeDelta = 0;
    this.isStart = false;
    gameObjects.push(this);
  }

  start() {}
  update() {}
  onDestroy() {}
  destroy() {
    this.onDestroy();

    const targetIdx = gameObjects.findIndex((val) => val === this);
    if (targetIdx !== -1) gameObjects.splice(targetIdx, 1);
  }
}

const gameObjects: BaseGameObject[] = [];
let lastTimeStamp = 0;

const step: FrameRequestCallback = (timeStamp) => {
  gameObjects.forEach((item) => {
    if (!item.isStart) {
      item.start();
      item.isStart = true;
      return;
    }
    item.timeDelta = timeStamp - lastTimeStamp;
    item.update();
  });
  lastTimeStamp = timeStamp;
  requestAnimationFrame(step);
};

requestAnimationFrame(step);
