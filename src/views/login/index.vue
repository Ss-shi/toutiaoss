<template>
  <div class="login">
    <el-card class="login-card">
      <div class="login-logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="LoginForm" :rules="LoginRules" ref='myForm'>
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:65%" v-model="LoginForm.code" placeholder="请输入验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="LoginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click='loginSubmit' type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      LoginForm: {
        mobile: '',
        code: '',
        check: false
      },
      LoginRules: {
        mobile: [{ required: true, message: '请输入内容' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确格式'
        }],
        code: [{ required: true, message: '请输入内容' }, {
          pattern: /^\d{6}$/, message: '请输入正确格式'
        }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('要勾选哦'))
          }
        } }]
      }
    }
  },
  methods: {
    loginSubmit () {
      this.$refs.myForm.validate(function (isOK) {
        if (isOK) {
          console.log('前端校验完成')
        }
      })
    }
  }
}
</script>

<style lang='less'>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 400px;
    height: 350px;
    .login-logo {
      margin-bottom: 20px;
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
