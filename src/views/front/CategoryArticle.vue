<template>
  <div class="category_article_box">
    <p class="name">categories</p>
    <p class="count">目前共计{{categoryList.length}}个分类</p>
    <ul class="list">
      <router-link :to="'/ArchivesSingle/' + item.id + '?to=category'" tag="li" v-for="(item, index) in categoryList" :key="index">
        <a href="#">{{item.name}}</a>
        <span class="number">({{item.count}})</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryArticle',
  data () {
    return {
      categoryList: []
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    /** 分类列表 */
    getCategoryList () {
      this.$http.get('v1/front/categoryList').then((res) => {
        console.log(res)
        if (res.data.reCode === 200) {
          this.categoryList = res.data.result.categoryList
        }
      })
    }
  }
}
</script>

<style lang="less">
.category_article_box {
  margin: 80px auto;
  .name {
    font-size: 26px;
    color: #555555;
    text-align: center;
  }
  .count {
    margin-top: 10px;
    color: #555555;
    line-height: 2;
    text-align: center;
    font-size: 16px;
  }
  .list {
    margin-top: 20px;
    li {
      margin: 5px 10px;
      list-style-type: none;
      a {
        line-height: 2;
        font-size: 16px;
        color: #555555;
        text-decoration-color: #cccccc;
        &:hover {
          color: #222222;
          text-decoration-color: #222222;
        }
      }
      .number {
        color: #bbbbbb;
      }
    }
  }
}
</style>
