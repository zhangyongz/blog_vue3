import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Public from '@/views/front/Public.vue';
import Index from '@/views/front/Index.vue';

const routes: Array<RouteRecordRaw> = [
  // 前台
  {
    path: '/',
    component: Public,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index,
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
