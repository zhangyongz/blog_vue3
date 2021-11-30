import { AxiosResponse } from 'axios';
import { App } from 'vue';
import http from '@/commons/http';

const obj = {
  getCount(): Promise<AxiosResponse> {
    return http.get('v1/front/count');
  },
};

export default {
  install(app: App): void {
    app.config.globalProperties.$api = obj;
  },
};
