import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';
import api from '@/commons/api';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $message: any,
    $api: any,
  }
}

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(api);
app.mount('#app');

export default app;
