/**
 * 游戏对象基类
 */
export class BaseGameObject {
  timeDelta: number; // 表示两帧之间的时间（单位毫秒），速度 = 距离/timeDelta
  isStart: boolean;

  constructor() {
    this.timeDelta = 0;
    this.isStart = false;
    gameObjects.push(this);
  }

  start() {} // 包含游戏对象初始化的逻辑
  update() {} // 包含每一帧重绘时需要执行的逻辑
  onDestroy() {} // 对象销毁前的hook

  destroy() {
    this.onDestroy();
    const targetIdx = gameObjects.findIndex((val) => val === this);
    if (targetIdx !== -1) gameObjects.splice(targetIdx, 1);
  }
}

const gameObjects: BaseGameObject[] = []; // 维护一个游戏对象的列表
let lastTimeStamp = 0; // 记录上一次刷新动画帧的时间戳

// 浏览器每次进行重绘时的执行一次 step 函数
const step: FrameRequestCallback = (timeStamp) => {
  // 遍历游戏对象列表，调用start或update，同时更新每个对象的timeDelta
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
