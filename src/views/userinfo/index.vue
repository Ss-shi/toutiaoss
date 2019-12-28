<template>
  <el-card class='user-card'>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-upload class='user-image' action='' show-file-list='false'>
      <img :src='formData.photo ? formData.photo : defaultImg' alt="">
    </el-upload>
    <el-form ref='myForm' :model="formData" :rules="rules" label-width="100px">
      <el-form-item label='用户名'  prop='name'>
        <el-input style='width:30%' v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label='简介' prop='intro'>
        <el-input style='width:30%' v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label='邮箱' prop='email'>
        <el-input style='width:30%' v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label='手机号' prop='mobile'>
        <el-input style='width:30%' v-model="formData.mobile" disabled=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveBtn'>保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' },
          { min: 1, max: 10, message: '用户名字符在1-10之间' }],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, message: '邮箱格式不正确' }]
      },
      defaultImg: require('../../assets/img/tx.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveBtn () {
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            this.$message({
              type: 'success',
              message: '信息修改成功'
            })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.user-card{
  position: relative;
  .user-image{
    position: absolute;
    right:240px;
    // top:100px;
    img{
      width: 240px;
      height: 240px;
      border-radius: 50%;
      // border:1px dashed #999;

    }
  }
}
</style>
