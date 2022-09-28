import { createRouter, createWebHistory } from "vue-router";
import PKView from "@/views/pk/PKView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/pk/",
    },
    {
      path: "/pk/",
      name: "pk",
      component: PKView,
    },
    {
      path: "/rank-list/",
      name: "rankList",
      component: import("@/views/rank-list/RankListView.vue"),
    },
    {
      path: "/record/",
      name: "record",
      component: import("@/views/record/RecordView.vue"),
    },
    {
      path: "/404/",
      name: "404",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404/",
    },
  ],
});

export default router;
