<template>
  <ViewContainer>
    <img
      @click="updateRankListData(1)"
      src="@/assets/images/refresh.svg"
      class="refresh-icon"
    />
    <div class="main">
      <el-table
        :data="rankListData"
        empty-text="暂无数据"
        height="100%"
        style="width: 70%"
        size="large"
        v-loading="isLoading"
        element-loading-background="#0C0D14"
        fit
      >
        <el-table-column
          prop="username"
          label="玩家名称"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="rating"
          label="积分"
          min-width="100"
          align="center"
        ></el-table-column>
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
import type { User } from "./types";
import { getRankListData } from "./apis";
import { ElMessage } from "element-plus";

const rankListData = ref<User[]>([]);
const isLoading = ref(false);
const pagination = reactive({
  cur: 1,
  total: 0,
});

const updateRankListData = async (page: number) => {
  try {
    isLoading.value = true;
    const res = await getRankListData(page);
    if (res) {
      rankListData.value = res.users;
      pagination.cur = page;
      pagination.total = res.users_count;
    }
  } catch {
    rankListData.value = [];
    pagination.cur = 1;
    pagination.total = 0;
    ElMessage.error("数据获取失败，请重试");
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(() => {
  updateRankListData(1);
});

const curPageChangeHandle = (cur: number) => {
  updateRankListData(cur);
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
