<template>
  <div class="tag_box">
    <div class="add_group">
      <el-input v-model="name"></el-input>
      <el-button @click="addTag">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;" :height="tableHeight">
      <el-table-column prop="id" label="id" width="100">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editTagConfirm(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleTag(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  methods: {
    handleEdit (index, row) {
      console.log(index)
      console.log(row)
    },
    handleDelete (index, row) {
      console.log(index)
      console.log(row)
    },
    /** 添加标签 */
    addTag () {
      this.$http.post('v1/admin/addTag', {
        name: this.name
      }).then((res) => {
        console.log(res)
        if (res.data.reCode === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.tagList()
        }
      })
    },
    /** 分类列表 */
    tagList () {
      this.$http.get('v1/front/tagList').then((res) => {
        if (res.data.reCode === 200) {
          this.tableData = res.data.result.tagList
        }
      })
    },
    /** 删除分类 */
    deleTag (id) {
      this.$http.post('v1/admin/deleteTag', {
        id: id
      }).then((res) => {
        console.log(res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.tagList()
      })
    },
    /** 编辑标签弹窗 */
    editTagConfirm (id) {
      this.$prompt('请输入标签名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.editTag(id, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    /** 编辑标签 */
    editTag (id, name) {
      this.$http.post('v1/admin/editTag', {
        id: id,
        name: name
      }).then((res) => {
        console.log(res)
        if (res.data.reCode === 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.tagList()
        }
      })
    }
  },
  computed: {
    tableHeight () {
      let clientHeight = document.documentElement.clientHeight
      return clientHeight - 160
    }
  },
  data () {
    return {
      tableData: [],
      name: ''
    }
  },
  created () {
    this.tagList()
  }
}
</script>

<style lang="less">
.tag_box {
  .add_group {
    display: flex;
    margin-bottom: 20px;
    .el-input {
      width: 200px;
    }
    button {
      margin-left: 20px;
    }
  }
}
</style>
