<template>
  <div class="category_box">
    <div class="add_group">
      <el-input v-model="name"></el-input>
      <el-button @click="addCategory">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;" :height="tableHeight">
      <el-table-column prop="id" label="id" width="100">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editCategoryConfirm(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleCategory(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Category',
  methods: {
    handleEdit (index, row) {
      console.log(index)
      console.log(row)
    },
    handleDelete (index, row) {
      console.log(index)
      console.log(row)
    },
    /** 添加分类 */
    addCategory () {
      this.$http.post('v1/admin/addCategory', {
        name: this.name
      }).then((res) => {
        console.log(res)
        if (res.data.reCode === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.categoryList()
        }
      })
    },
    /** 分类列表 */
    categoryList () {
      this.$http.get('v1/front/categoryList').then((res) => {
        if (res.data.reCode === 200) {
          this.tableData = res.data.result.categoryList
        }
      })
    },
    /** 删除分类 */
    deleCategory (id) {
      this.$http.post('v1/admin/deleteCategory', {
        id: id
      }).then((res) => {
        console.log(res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.categoryList()
      })
    },
    /** 编辑分类弹窗 */
    editCategoryConfirm (id) {
      this.$prompt('请输入分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.editCategory(id, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    /** 编辑分类 */
    editCategory (id, name) {
      this.$http.post('v1/admin/editCategory', {
        id: id,
        name: name
      }).then((res) => {
        console.log(res)
        if (res.data.reCode === 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.categoryList()
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
    this.categoryList()
  }
}
</script>

<style lang="less">
.category_box {
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
