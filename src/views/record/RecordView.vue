<template>
  <ViewContainer>
    <img
      @click="updateRecordData(1)"
      src="@/assets/images/refresh.svg"
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
              v-if="scope.row.result === 'A胜'"
              value="win"
              type="success"
            >
              {{ scope.row.a_username }}
            </el-badge>
            <span v-else>{{ scope.row.a_username }}</span>
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
              v-if="scope.row.result === 'B胜'"
              value="win"
              type="success"
            >
              {{ scope.row.a_username }}
            </el-badge>
            <span v-else>{{ scope.row.a_username }}</span>
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
          <el-button type="primary" round color="#5D53AB" size="small"
            >查看录像</el-button
          >
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
import { Record } from "./types";
import { getRecordData } from "./apis";
import { ElMessage } from "element-plus";

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
    recordData.value = res.records;
    pagination.cur = page;
    pagination.total = res.records_count;
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
