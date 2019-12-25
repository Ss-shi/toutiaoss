<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="searchTool">
      <span>文章状态：</span>
      <el-radio-group v-model="formData.status" @change="changeCondition()">
        <el-radio :label="5">全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="searchTool">
      <span>频道列表：</span>
      <el-select v-model="formData.channel_id" placeholder="请选择" @change="changeCondition()">
        <el-option v-for="item in channels" :label="item.name" :key="item.id"  :value="item.id"></el-option>
      </el-select>
    </el-row>
    <el-row class="searchTool">
      <span>时间选择：</span>
      <el-date-picker
        @change="changeCondition()"
        value-format="yyyy-MM-dd"
        v-model="formData.dataRange"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-row>
    <el-row class="title">共找到{{page.total}}条符合条件的内容</el-row>
    <el-row class="content" type="flex" v-for="item in list" :key="item.id.toString()">
      <el-col>
        <el-row class="connect" type="flex" align="middle">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
          <el-col>
            <p>{{item.title}}</p>
            <el-tag :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
            <p style="font-size=14px;color:#999">{{item.pubdate}}</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="ico" :span="4">
        <i class="el-icon-edit">修改</i>
        <i class="el-icon-delete" @click='delMaterial(item.id)'>删除</i>
      </el-col>
    </el-row>
    <el-row type='flex' justify="center" style='margin-top:10px;'>
      <el-pagination background :page-size='page.pageSize' :current-page='page.currentPage' :total="page.total" @current-change='changePage'></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        dataRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/404.png'),
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    delMaterial (id) {
      this.$confirm('确实要删除这篇文章吗').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '数据删除成功'
          })
          this.changeCondition()
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.changeConditionArticle()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.changeConditionArticle()
    },
    changeConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.dataRange.length ? this.formData.dataRange[0] : null,
        end_pubdate:
          this.formData.dataRange.length > 1 ? this.formData.dataRange[1] : null
      }
      this.getArticles(params)
    },

    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
  .title {
    padding-bottom: 20px;
    margin: 40px 0 10px 0;
    border-bottom: 1px dashed #ccc;
  }
  .content {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    img {
      width: 140px;
      height: 100px;
      margin-right: 20px;
    }
    i {
      margin: 0 5px;
      cursor: pointer;
    }
  }
}
</style>
