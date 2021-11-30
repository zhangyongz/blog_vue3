<template>
  <div class="index_box">
    <section class="list">
      <article class="item" v-for="(item, index) in articleList" :key="index">
        <div class="text">
          <h2 class="name">
            <router-link :to="'/ArticleDetail/' + item.id">{{item.title}}</router-link>
          </h2>
          <div class="post_meta">
            <div class="post_item">
              <i class="iconfont icon-calendar"></i>
              <span class="post_text">发表于 {{item.created_at}}</span>
            </div>
            <div class="post_item">
              <i class="iconfont icon-category-belong"></i>
              <span class="post_text">分类于
                <router-link :to="'/ArchivesSingle/' + item.category + '?to=category'"
                  class="category">
                  {{item.category_name}}
                </router-link>
              </span>
            </div>
          </div>
          <div class="post_des">
            {{item.describle}}
          </div>
          <p class="post_btn" @click="goDetail(item.id)">阅读全文 »</p>
          <!-- <router-link :to="'/ArticleDetail/' + item.id" tag="p" class="post_btn">
            阅读全文 »
          </router-link> -->
        </div>
        <div class="img">
          <img :src="item.cover_img">
        </div>
      </article>
    </section>

    <el-pagination layout="prev, pager, next" :page-count="totalPages"
      @current-change="getArticleList" class="paination">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      articleList: [],
      totalPages: 0,
    };
  },
  created() {
    this.getArticleList(1);
  },
  methods: {
    goDetail(id) {
      window.open(`${window.location.origin}#/ArticleDetail/${id}`);
    },
    /** 文章列表 */
    getArticleList(page) {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
      });
      this.$api.getArticleList().then((res) => {
        console.log(res);
        loading.close();
        if (res.data.reCode === 200) {
          const data = res.data.result;
          this.articleList = data.articleList.filter((item) => item.is_del !== 1);
          const totalPages = data.count / data.pageSize;
          this.totalPages = Math.ceil(totalPages);
          this.goTopAction();
        }
      }).catch(() => {
        loading.close();
      });
    },
    goTopAction() {
      this.timer = null;
      this.timer = setTimeout(() => {
        const oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          window.scrollTo(0, oTop - 50);
          this.goTopAction();
        } else {
          clearTimeout(this.timer);
        }
      }, 10);
    },
  },
};
</script>

<style lang="less">
@media screen and (max-width: 450px) {
  .index_box .list .img {
    width: 100px !important;
    height: 100px !important;
  }
}
.index_box {
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  .list {
    flex: 1;
    .item {
      display: flex;
      & + .item {
        margin-top: 100px;
      }
      .text {
        width: 0;
        flex: 1;
        .name {
          margin-bottom: 10px;
          font-size: 24px;
          cursor: pointer;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            width: 100%;
            position: relative;
            color: #555555;
            // display: block;
            text-decoration: none;
            &::before {
              content: "";
              position: absolute;
              width: 100%;
              height: 2px;
              bottom: 0;
              left: 0;
              background-color: #000;
              transform: scaleX(0);
              transition-duration: 0.2s;
              transition-timing-function: ease-in-out;
              transition-delay: 0s;
              display: block;
            }
          }
          a:hover {
            &::before {
              transform: scaleX(1);
            }
          }
        }
        .post_meta {
          display: flex;
          padding: 5px 0 20px;
          font-size: 12px;
          color: #999999;
          .post_item {
            height: 16px;
            padding-right: 10px;
            & + .post_item {
              padding-left: 10px;
              border-left: 1px solid #999999;
            }
            .iconfont {
              margin-right: 6px;
              font-size: 12px;
            }
            .post_text {
              .category {
                margin-left: 6px;
                color: #555555;
                border-bottom: 1px solid #cccccc;
                cursor: pointer;
                &:hover {
                  color: #222222;
                  border-color: #222222;
                }
              }
              a {
                text-decoration: none;
              }
            }
          }
        }
        .post_des {
          margin-bottom: 25px;
          line-height: 2;
          color: #555555;
          text-align: justify;
        }
        .post_btn {
          width: 88px;
          height: 34px;
          margin-bottom: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: normal;
          color: #fff;
          font-size: 14px;
          background: #2c3e50;
          cursor: pointer;
          &:hover {
            background: #34495e;
          }
        }
      }
      .img {
        width: 200px;
        height: 200px;
        margin-left: 20px;
        flex: 0 0 auto;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          img {
            transform: scale(1.2);
          }
        }
        img {
          width: 100%;
          transition: all linear 0.3s;
        }
      }
    }
  }
  .paination {
    margin-top: 100px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
}
</style>
