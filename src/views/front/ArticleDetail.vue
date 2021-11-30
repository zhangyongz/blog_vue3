<template>
  <div class="article_detail_box">
    <div class="article_wrapper">
      <h1>{{info.title}}</h1>
      <blockquote class="date">
        <p>发布时间: {{info.created_at}}</p>
      </blockquote>
      <div v-html="info.render" class="markdown-body"></div>
      <div class="tags" v-if="info.tag_name">
        <router-link :to="tagUrl(index)" v-for="(item, index) in info.tag_name" :key="(index)"># {{item}}</router-link>
      </div>
    </div>
    <!-- arduino-light -->
    <!-- color-brewer -->
    <!-- dark -->
    <!-- default -->
    <!-- github-gist -->
    <mavon-editor codeStyle="github-gist" style="display: none"></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import '@/assets/css/markdown.css'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      info: {}
    }
  },
  components: {
    mavonEditor
  },
  created () {
    this.article()
  },
  methods: {
    tagUrl (index) {
      let tagArr = this.info.tag.split(',')
      return '/ArchivesSingle/' + tagArr[index] + '?to=tag'
    },
    /** 字符串转数组 */
    strToArr (str) {
      console.log(str)
      return str.split(',')
    },
    /** 文章详情 */
    article () {
      const loading = this.$loading({
        lock: true,
        text: '加载中'
      })
      this.$http.get('v1/front/article', {
        params: {
          id: this.$route.params.id
        }
      }).then((res) => {
        console.log(res)
        loading.close()
        if (res.data.reCode === 200) {
          this.info = res.data.result.detail
        }
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="less">
.article_detail_box {
  margin: 0 auto;
  overflow: hidden;
  .article_wrapper {
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 0 0 4px 4px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    .date {
      margin: 36px 0;
    }
    .item {
      .year,
      .month {
        margin-top: 30px;
        padding-left: 15px;
        line-height: 1;
      }
      .year {
        font-size: 26px;
      }
      .month {
        font-size: 24px;
      }
      .article {
        padding: 24px 0 24px 22px;
        border-bottom: 1px solid #eeeeee;
        .article_title {
          margin: 16px;
          border-left: 6px solid #6f7071;
          padding-left: 12px;
          font-size: 24px;
        }
        .dec {
          margin: 16px 0 26px;
          font-size: 14px;
          word-wrap: break-word;
          color: #333333;
        }
        .article_footer {
          display: flex;
          justify-content: space-between;
          .date_group {
            .date {
              color: #a1a1a1;
              font-size: 12px;
            }
            .tag {
              padding: 2px 4px;
              background: #b9c8e0;
              border-radius: 5px;
              margin-left: 18px;
              color: #2c4d68;
              font-size: 12px;
            }
          }
          .more_btn {
            padding: 6px 12px;
            color: #fff;
            background-color: #428bca;
            border-color: #357ebd;
            cursor: pointer;
            font-size: 14px;
            line-height: 1.42857143;
            border-radius: 4px;
          }
        }
      }
    }
    .pagination {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tags {
      margin-top: 40px;
      a {
        line-height: 2;
        padding: 1px 5px;
        background: #f5f5f5;
        border-bottom: none;
        display: inline-block;
        margin-right: 10px;
        font-size: 13px;
        text-decoration: none;
        color: #555555;
        cursor: pointer;
        &:hover {
          background: #ccc;
        }
      }
    }
  }
}
</style>
