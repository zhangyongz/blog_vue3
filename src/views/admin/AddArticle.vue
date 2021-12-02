<template>
  <div class="add_article_box">
    <el-input placeholder="请输入标题" v-model="title" class="input-with-select">
      <template #prepend>
        <el-select placeholder="请选择" v-model="category">
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </el-input>

    <div id="editor">
      <mavon-editor
        codeStyle="github-gist"
        style="height: 100%"
        ref="md"
        @imgAdd="imgAdd"
        @save="save"
        :value="value"
      ></mavon-editor>
    </div>

    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :headers="header"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="coverImg" :src="coverImg" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <div class="tag_selector">
      <el-select v-model="tag" multiple filterable default-first-option placeholder="请选择文章标签">
        <el-option
          v-for="item in tagList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <el-input class="des_input" v-model="describle" type="textarea" autosize placeholder="请输入文章描述"></el-input>

    <el-button @click="updateArticle" type="primary" v-if="id">更新</el-button>
    <el-button @click="uploadArticle" type="primary" v-if="!id">完成</el-button>
  </div>
</template>

<script setup lang="ts">
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  getCategoryList, getTagList, getArticleDetail, uploadImg,
} from '@/commons/api';
import { BASE_URL } from '@/commons/consts';

interface optionItem {
  value: number,
  label: string
}

const categoryList: optionItem[] = reactive([]);
function getCategoryListHandle() {
  getCategoryList().then((res) => {
    if (res.data.reCode === 200) {
      const data = res.data.result.categoryList;
      for (let i = 0; i < data.length; i++) {
        const category = data[i];
        categoryList.push({
          value: category.id,
          label: category.name,
        });
      }
    }
  });
}
getCategoryListHandle();

const tagList: optionItem[] = reactive([]);
function getTagListHandle() {
  getTagList().then((res) => {
    if (res.data.reCode === 200) {
      const data = res.data.result.tagList;
      for (let i = 0; i < data.length; i++) {
        const tag = data[i];
        tagList.push({
          value: tag.id,
          label: tag.name,
        });
      }
    }
  });
}
getTagListHandle();

const route = useRoute();
const { id } = route.query;

const title = ref('');
const category = ref('');
const value = ref('');
const render = ref('');
const describle = ref('');
const coverImg = ref('');
const tag: number[] = reactive([]);

function getArticleDetailHandle() {
  getArticleDetail({
    id,
  }).then((res) => {
    if (res.data.reCode === 200) {
      const data = res.data.result.detail;
      title.value = data.title;
      category.value = data.category;
      value.value = data.value;
      render.value = data.render;
      describle.value = data.describle;
      coverImg.value = data.cover_img;
      const tagList = data.tag.split(',');
      for (let i = 0; i < tag.length; i++) {
        tagList[i] = parseInt(tagList[i]);
      }
      tag.push(...tagList);
    }
  });
}
if (id) {
  getArticleDetailHandle();
}

function handleAvatarSuccess(res) {
  console.log(res);
  coverImg.value = `${BASE_URL}/${res.result.path}`;
}

const md = ref<HTMLElement | null>(null);
function imgAdd(pos, $file) {
  const formdata = new FormData();
  formdata.append('file', $file);
  uploadImg(formdata).then((res) => {
    console.log(res);
    // (md.value as HTMLElement).$img2Url(pos, `${BASE_URL}/${res.data.result.path}`);
  });
}
</script>

<style lang="less">
.add_article_box {
  .el-select .el-input {
    width: 130px;
  }
  #editor {
    margin: 20px auto;
    height: 580px;
  }
  .tag_selector {
    margin-bottom: 20px;
    .el-select .el-input {
      width: 350px;
    }
  }
  .des_input {
    margin-bottom: 20px;
    textarea {
      width: 450px;
    }
  }
  .avatar-uploader .el-upload {
    margin-bottom: 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    display: block;
  }
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background-color: #ffffff;
  }
}
</style>
