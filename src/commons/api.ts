import { AxiosResponse } from 'axios';
import { App } from 'vue';
import http from '@/commons/http';

interface getArticleListParams {
  page: string
}

const obj = {
  getCount(): Promise<AxiosResponse> {
    return http.get('/v1/front/count');
  },
  getArticleList(params: getArticleListParams): Promise<AxiosResponse> {
    return http.get('v1/front/articleList', {
      params,
    });
  },
};

export default {
  install(app: App): void {
    app.config.globalProperties.$api = obj;
  },
};
