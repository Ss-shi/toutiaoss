<template>
  <el-card v-loading='loading'>
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
              <el-button @click='openOrclose(obj.row)' type="text" size='small'>{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row type='flex' justify="center" align="middle">
      <el-pagination
        :page-size='page.pageSize'
        :current-page='page.currentPage'
        :total="page.total"
        @current-change='currentChange'>
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    currentChange (newPage) {
      this.page.currentPage = newPage
      this.getComments()
    },
    getComments () {
      this.$axios({ url: '/articles',
        params: { response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrclose (row) {
      let miss = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你确定要${miss}评论吗？`).then(() => {
        this.$axios({ url: '/comments/status',
          params: { article_id: row.id.toString() },
          method: 'put',
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.getComments()
          // this.$message({

          //   type: 'success',
          //   message: '操作成功'
          // })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '操作失败'
          })
        })
      })
    }
  },
  created () {
    this.loading = true
    this.getComments()
  }
}
</script>

<style lang='less' scoped>
    .main{
        text-align: center
    }
</style>
