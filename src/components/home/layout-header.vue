<template>
  <el-row class="header" type="flex" align="middle" justify="space-between">
    <el-col :span="10" class="left">
      <i @click='collapseOropen' :class="collapses ?'el-icon-s-unfold':'el-icon-s-fold'"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="6" class="right">
      <el-row type="flex" align="middle" justify="end">
        <img :src='userInfo.photo?userInfo.photo:defaultImg' alt />
        <el-dropdown @command='handle'>
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='info'>个人信息</el-dropdown-item>
            <el-dropdown-item command='git'>git地址</el-dropdown-item>
            <el-dropdown-item command='lgout'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapses: false,
      userInfo: {},
      defaultImg: require('../../assets/img/tt.jpg')
    }
  },
  created () {
    this.getUser()
    eventBus.$on('uploadInfo', () => {
      this.getUser()
    })
  },
  methods: {
    collapseOropen () {
      this.collapses = !this.collapses
      eventBus.$emit('collapses')
    },
    getUser () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer ${token}` }
      }).then(result => {
        this.userInfo = result.data
      })
    },
    handle (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/Ss-shi/toutiaoss'
      } else if (command === 'info') {
        this.$router.push('/home/userinfo')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  line-height: 60px;
  .left {
    font-size: 22px;
    span {
      font-size: 16px;
      padding-left:10px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right:5px
    }
  }
}
</style>
