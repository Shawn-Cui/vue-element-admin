<template>
  <div class="changePassword-container">
    <el-form class="changePassword-form" autoComplete="on" :model="changePasswordForm" :rules="changePasswordRules" ref="changePasswordForm" label-position="left">
      <!-- <div class="title-container">
        <h3 class="title">{{$t('login.title')}}</h3>
      </div> -->
      <!-- <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item> -->

      <el-form-item prop="oldPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="oldPassword" :type="passwordType" v-model="changePasswordForm.oldPassword" autoComplete="on" placeholder="旧密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="newPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="newPassword" :type="passwordType" v-model="changePasswordForm.newPassword" autoComplete="on" placeholder="新密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="confirmNewPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="confirmNewPassword" :type="passwordType" @keyup.enter.native="handleChangePassword" v-model="changePasswordForm.confirmNewPassword" autoComplete="on" placeholder="确认新密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleChangePassword">{{$t('login.changePassword')}}</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'changePassword',
  data() {
    var validateNewPassword = (rule, value, callback) => {
      if (value === this.changePasswordForm.oldPassword) {
        callback(new Error('新密码不能与旧密码一样！'))
      } else {
        callback()
      }
    }
    var validateConfirmNewPassword = (rule, value, callback) => {
      if (value !== this.changePasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      changePasswordRules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: '确认新密码不能为空', trigger: 'blur' },
          { validator: validateConfirmNewPassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleChangePassword() {
      this.$refs.changePasswordForm.validate(valid => {
        if (valid && this.changePasswordForm.newPassword === this.changePasswordForm.confirmNewPassword) {
          this.loading = true
          axios.post('/api/Admins/change-password', {
            oldPassword: this.changePasswordForm.oldPassword,
            newPassword: this.changePasswordForm.newPassword
          }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
              this.loading = false
              this.$message({ showClose: true, message: '密码更改成功！', type: 'success' })
              this.$router.replace({
                path: '/login'
              })
            } else {
              this.$message({ showClose: true, message: '密码更改失败！', type: 'error' })
            }
          })
        } else if (this.changePasswordForm.newPassword === this.changePasswordForm.confirmNewPassword) {
          this.$message({ showClose: true, message: '您所填写的信息不完整，无法提交！', type: 'warning' })
          return false
        }
      })
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.changePassword-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  // background-color: $bg;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .changePassword-form {
    // position: absolute;
    // left: 0;
    // right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 30px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
