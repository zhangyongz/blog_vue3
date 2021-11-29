import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import element from './commons/element-ui';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(element);
app.mount('#app');
