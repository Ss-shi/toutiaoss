<template>
  <el-card>
    <bread-crumb>
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type='flex' justify='end'>
      <el-upload action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list='false'
      :http-request='uploadImg'>
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="space-around" align="middle">
              <i @click="collectOrCancel(item)" :style="{color:item.is_collected?'red':''} " class="el-icon-star-on"></i>
              <i @click="deleteMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type='flex' justify='center'>
          <el-pagination background layout="prev, pager, next" :total="page.total"
          :current-page='page.currentPage'
          :page-size='page.pageSize'
          @current-change='currentPage'>
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type='flex' justify='center'>
          <el-pagination background layout="prev, pager, next" :total="page.total"
          :current-page='page.currentPage'
          :page-size='page.pageSize'
          @current-change='currentPage'>
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    deleteMaterial (id) {
      this.$confirm('你确定不要我了吗？').then(() => {
        this.$axios({
          url: `user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    collectOrCancel (row) {
      this.$axios({
        url: `user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      }).then(() => {
        this.getMaterial()
      })
    },
    uploadImg (params) {
      let form = new FormData()
      form.append('image', params.file)
      this.$axios({ url: '/user/images',
        method: 'post',
        data: form }).then(() => {
        this.getMaterial()
      })
    },
    currentPage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 230px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      background-color: #f4f5f6;
    }
  }
}
</style>
