import { App } from 'vue';
import { ElButton } from 'element-plus';

export default {
  install(app: App):void {
    app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
    app.use(ElButton);
  },
};
