import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Public from '@/views/front/Public.vue';
import Index from '@/views/front/Index.vue';
import CategoryArticle from '@/views/front/CategoryArticle.vue';
import Archives from '@/views/front/Archives.vue';
import TagArticle from '@/views/front/TagArticle.vue';
import ArchivesSingle from '@/views/front/ArchivesSingle.vue';
import ArticleDetail from '@/views/front/ArticleDetail.vue';

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
      {
        path: '/CategoryArticle',
        name: 'CategoryArticle',
        component: CategoryArticle,
      },
      {
        path: '/Archives',
        name: 'Archives',
        component: Archives,
      },
      {
        path: '/TagArticle',
        name: 'TagArticle',
        component: TagArticle,
      },
      {
        path: '/ArchivesSingle',
        name: 'ArchivesSingle',
        component: ArchivesSingle,
      },
      {
        path: '/ArticleDetail',
        name: 'ArticleDetail',
        component: ArticleDetail,
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
