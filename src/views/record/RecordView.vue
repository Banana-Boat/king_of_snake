<template>
  <ViewContainer>
    <img
      @click="updateRecordData(1)"
      src="@/assets/icons/refresh.svg"
      class="refresh-icon"
    />
    <div class="main">
      <el-table
        :data="recordData"
        empty-text="暂无数据"
        height="100%"
        style="width: 85%"
        size="large"
        v-loading="isLoading"
        element-loading-background="#0C0D14"
        fit
      >
        <el-table-column
          prop="a_username"
          label="玩家A"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-badge
              :hidden="scope.row.result !== 'A胜'"
              value="win"
              type="success"
            >
              {{ scope.row.a_username }}
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column
          prop="b_username"
          label="玩家B"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-badge
              :hidden="scope.row.result !== 'B胜'"
              value="win"
              type="success"
            >
              {{ scope.row.b_username }}
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          label="结果"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="record.createtime"
          label="对战时间"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template #default="scope">
            <el-button
              @click="replayBtnClickHandle(scope.row.record.id)"
              type="primary"
              round
              color="#5D53AB"
              size="small"
            >
              查看录像
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="pagination.total"
        :current-page="pagination.cur"
        @current-change="curPageChangeHandle"
        hide-on-single-page
        layout="prev, pager, next"
        style="align-self: center; margin-top: 20px"
      ></el-pagination>
    </div>
  </ViewContainer>
</template>

<script setup lang="ts">
import ViewContainer from "../../components/view-container/ViewContainer.vue";
import { onBeforeMount, reactive, ref } from "vue";
import type { Record } from "./types";
import { getRecordData } from "./apis";
import { ElMessage } from "element-plus";
import { useRecordStore } from "../../stores/record/record.store";
import { usePkStore } from "../../stores/pk/pk.store";
import { useRouter } from "vue-router";

const recordStore = useRecordStore();
const pkStore = usePkStore();
const router = useRouter();

const recordData = ref<Record[]>([]);
const isLoading = ref(false);
const pagination = reactive({
  cur: 1,
  total: 0,
});

const updateRecordData = async (page: number) => {
  try {
    isLoading.value = true;
    const res = await getRecordData(page);
    if (res) {
      recordData.value = res.records;
      pagination.cur = page;
      pagination.total = res.records_count;
    }
  } catch {
    recordData.value = [];
    pagination.cur = 1;
    pagination.total = 0;
    ElMessage.error("数据获取失败，请重试");
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(() => {
  updateRecordData(1);
});

const curPageChangeHandle = (cur: number) => {
  updateRecordData(cur);
};

// 将地图字符串转换为二维地图矩阵
const stringTo2D = (map: string): boolean[][] => {
  let g = [];
  for (let i = 0, k = 0; i < 13; i++) {
    let line = [];
    for (let j = 0; j < 14; j++, k++) {
      if (map[k] === "0") line.push(0);
      else line.push(1);
    }
    g.push(line);
  }
  return g;
};

const replayBtnClickHandle = (recordId) => {
  const record = recordData.value.find((item) => item.record.id === recordId);
  if (!record) return;

  recordStore.$patch({
    isRecord: true,
    aName: record.a_username,
    bName: record.b_username,
    aSteps: record.record.asteps,
    bSteps: record.record.bsteps,
    loser: record.record.loser,
  });

  pkStore.updateGame({
    map: stringTo2D(record.record.map),
    a_id: record.record.aid,
    a_sx: record.record.asx,
    a_sy: record.record.asy,
    b_id: record.record.bid,
    b_sx: record.record.bsx,
    b_sy: record.record.bsy,
  });

  router.push({
    name: "recordReplay",
    params: {
      recordId,
    },
  });
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.refresh-icon {
  cursor: pointer;
  width: 24px;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>

<style>
.el-table--large .cell {
  padding: 8px 10px;
}
.el-table--large .el-table__cell {
  padding: 6px 0;
}
</style>
