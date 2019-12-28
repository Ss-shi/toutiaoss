<template>
  <div class="select-img">
    <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
        <div class="select-div">
          <el-card v-for="item in list" :key="item.id" class="select-card">
            <img @click='clickImg(item.url)' :src="item.url" alt />
          </el-card>
        </div>
        <el-row type='flex' justify="center">
          <el-pagination background :current-page='page.currentPage' :page-size='page.pageSize' :total="page.total" @current-change='changePage'></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">
        <el-upload class='upload-img'>
          <i class='el-icon-plus'></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    clickImg (url) {
      this.$emit('clickImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
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
.select-img {
  .select-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .select-card {
      width: 120px;
      height: 120px;
      margin: 10px;
      img {
        width: 100%;
      }
    }
  }
  .upload-img{
    display:flex;
    justify-content:center;
    i{
      font-size: 60px;
      padding:60px;
      border:1px dashed #cccccc;
      margin:20px 0;
    }
  }
}
</style>
