import { DirectionType } from "@/components/game-map/game-object/snake/type";

export const reverseDirection = (direction: DirectionType) => {
  if (direction === DirectionType.UP) return DirectionType.DOWN;
  if (direction === DirectionType.DOWN) return DirectionType.UP;
  if (direction === DirectionType.LEFT) return DirectionType.RIGHT;
  if (direction === DirectionType.RIGHT) return DirectionType.LEFT;

  return DirectionType.NONE;
};
