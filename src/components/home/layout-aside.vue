<template>
    <div class='layout'>
        <div class='title'>
            <img :src="collapses?smallImg:bigImg" alt="">
        </div>
      <el-menu :collapse="collapses" router :style="{width:collapses?'60px':'230px'}" class='aside' background-color='#353b4e' text-color='#adafb5' active-text-color='#ffd04b'>
          <el-menu-item index='/home'><i class='el-icon-s-home'></i><span>首页</span></el-menu-item>
          <el-submenu index='1'>
              <template  slot="title">
                <i class='el-icon-s-goods'></i>
                <span>内容管理</span>
              </template>
              <el-menu-item index='/home/publish'>发布文章</el-menu-item>
              <el-menu-item index='/home/articles'>内容列表</el-menu-item>
              <el-menu-item index='/home/comment'>评论列表</el-menu-item>
              <el-menu-item index='/home/material'>素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index='2'>
              <template  slot="title">
                <i class='el-icon-s-data'></i>
                <span>粉丝管理</span>
              </template>
              <el-menu-item index='/home/data'>图文数据</el-menu-item>
              <el-menu-item index='/home/info'>粉丝概况</el-menu-item>
              <el-menu-item index='/home/image'>粉丝画像</el-menu-item>
              <el-menu-item index='/home/list'>粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item index='/home/userinfo'><i class='el-icon-user-solid'></i><span>账户信息</span></el-menu-item>
      </el-menu>
    </div>
</template>

<script>

export default {
  props: ['collapses'],
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
    .layout{
        overflow: hidden;
        // position: fixed;
        el-menu{border-right:1px solid #2e2f32;}
        .title{
            text-align: center;
            background-color:#2e2f32;
            padding:10px 0;

            img{
                height: 35px;
            }
        }
    }
</style>
