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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统随机生成一张地图，地图根据中心对称排布障碍物，且左下与右上两个位置连通。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;两名玩家所控制的蛇分别以左下、右上为起点进行移动，当蛇头撞击障碍物或蛇身即死亡。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前十个回合，双方的蛇每回合长度增加1；十个回合后，每三回合蛇长度增加1。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;游戏存在平局，胜利方加3分，失败方减3分，平局则双方各加1分。
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
