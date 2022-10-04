<template>
  <el-dialog
    title="对局结果"
    :model-value="pkStore.loser !== ''"
    :before-close="closeHandle"
    :show-close="false"
    :width="450"
    center
  >
    <div style="font-size: 18px; text-align: center">{{ resultText }}</div>
    <template #footer>
      <el-button @click="closeHandle" size="large" color="#6842ff" round>
        再来一局
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import { usePkStore } from "../../../stores/pk/pk.store";
import { PkStatusType } from "../../../stores/pk/types";

const pkStore = usePkStore();

const resultText = computed(() => {
  if (pkStore.loser === "all") return "平局，争取下次获胜！";
  else if (pkStore.loser === pkStore.selfIndex) return "对局失败，再接再厉";
  else return "恭喜您，对局胜利";
});
const closeHandle = () => {
  pkStore.status = PkStatusType.NONE;
};
</script>

<style>
.el-dialog__header {
  margin-right: 0;
}
</style>
