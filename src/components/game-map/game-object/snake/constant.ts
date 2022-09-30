// 蛇眼睛不同方向的x的偏移量
export const EyeOffsetX = [
  [-1, 1],
  [1, 1],
  [1, -1],
  [-1, -1],
];

// 蛇眼睛不同方向的y的偏移量
export const EyeOffsetY = [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];

export const OffsetRow = [-1, 0, 1, 0]; // 4个方向行的偏移量
export const OffsetCol = [0, 1, 0, -1]; // 4个方向列的偏移量

export const Epsilon = 1e-2; // 允许的误差
