import { AxiosResponse } from 'axios';
import { LocationQueryValue } from 'vue-router';
import http from '@/commons/http';

export function getCount(): Promise<AxiosResponse> {
  return http.get('/v1/front/count');
}

interface getArticleListParams {
  page: number,
  pageSize?: number
}

export function getArticleList(params: getArticleListParams): Promise<AxiosResponse> {
  return http.get('/v1/front/articleList', {
    params,
  });
}

interface queryId {
  id: LocationQueryValue | LocationQueryValue[]
}

export function getArticleDetail(params: queryId): Promise<AxiosResponse> {
  return http.get('/v1/front/article', {
    params,
  });
}

export function getCategoryList(): Promise<AxiosResponse> {
  return http.get('/v1/front/categoryList');
}

interface queryCategoryId {
  categoryId: LocationQueryValue | LocationQueryValue[]
}

export function getArticleListByCategory(params: queryCategoryId): Promise<AxiosResponse> {
  return http.get('/v1/front/articleListByCategory', {
    params,
  });
}

interface queryTagId {
  tagId: LocationQueryValue | LocationQueryValue[]
}

export function getArticleListByTag(params: queryTagId): Promise<AxiosResponse> {
  return http.get('/v1/front/articleListByTag', {
    params,
  });
}

export function getArticleListByDate(): Promise<AxiosResponse> {
  return http.get('/v1/front/articleListByDate');
}

export function getTagList(): Promise<AxiosResponse> {
  return http.get('/v1/front/tagList');
}

interface loginInParams {
  username: string,
  password: string
}

export function login(data: loginInParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/login', data);
}

interface deleArticleParams {
  id: number
}

export function deleArticle(data: deleArticleParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/deleArticle', data);
}

export function uploadImg(data: FormData): Promise<AxiosResponse> {
  return http.post('/v1/admin/uploadImg', data);
}
