<template>
  <div class="tag_article_box">
    <p class="name">tags</p>
    <p class="count">目前共计{{tagList.length}}个标签</p>
    <ul class="list">
      <router-link :to="'/ArchivesSingle/' + item.id + '?to=tag'" tag="li" v-for="(item, index) in tagList" :key="index">
        <a href="#">{{item.name}}</a>
        <span class="number">({{item.count}})</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TagArticle',
  data () {
    return {
      tagList: []
    }
  },
  created () {
    this.getTagList()
  },
  methods: {
    /** 标签列表 */
    getTagList () {
      this.$http.get('v1/front/tagList').then((res) => {
        console.log(res)
        if (res.data.reCode === 200) {
          this.tagList = res.data.result.tagList
        }
      })
    }
  }
}
</script>

<style lang="less">
.tag_article_box {
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
