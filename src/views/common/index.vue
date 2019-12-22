<template>
  <el-card>
    <bread-crumb slot='header'>
        <template slot='title'>评论列表</template>
    </bread-crumb>
    <el-table :data='list' class='main'>
        <el-table-column label="标题" prop='title'  width='500'></el-table-column>
        <el-table-column :formatter= 'formatterBool' label="评论状态" prop='comment_status'></el-table-column>
        <el-table-column label="总评论数" prop='total_comment_count'></el-table-column>
        <el-table-column label="粉丝评论数" prop='fans_comment_count'></el-table-column>
        <el-table-column label="操作" prop=''>
            <template slot-scope='obj'>
              <el-button type="text" size='small'>修改</el-button>
              <el-button type="text" size='small'>{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
            </template>
        </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComments () {
      this.$axios({ url: '/articles', params: { response_type: 'comment' } }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style lang='less' scoped>
    .main{
        text-align: center
    }
</style>
