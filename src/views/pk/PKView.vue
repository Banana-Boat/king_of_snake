<template>
  <ViewContainer>
    <el-popover placement="bottom" :width="350" trigger="click">
      <template #reference>
        <img
          style="
            cursor: pointer;
            width: 25px;
            position: absolute;
            right: 20px;
            top: 20px;
          "
          src="@/assets/icons/question.svg"
        />
      </template>
      <h2 style="text-align: center">游戏规则</h2>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统随机生成地图，根据中心对称排布障碍物。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;玩家通过“W”、“A“、”S”、“D”键操作蛇移动，当蛇头撞击障碍物或蛇身时死亡。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前十回合，蛇每回合长度增加1；十回合后，每三回合蛇长度增加1。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;胜利方加5分，失败方减2分，平局则均不加分。
      </p>
    </el-popover>
    <GameArea v-if="pkStore.status === PkStatusType.PLAYING" />
    <MatchArea v-else />
  </ViewContainer>
</template>

<script setup lang="ts">
import ViewContainer from "../../components/view-container/ViewContainer.vue";
import MatchArea from "./components/MatchArea.vue";
import GameArea from "./components/GameArea.vue";
import { usePkStore } from "../../stores/pk/pk.store";
import { PkStatusType } from "../../stores/pk/types";
const pkStore = usePkStore();
</script>

<style scoped></style>
