<template>
  <div class="note"
       :style="backgroundDiv">
    <div class="land"
         id="loginBox">
      <div class="topzi">
        <h1>福建师范大学</h1>
        <h3 style="margin-bottom:1.5em">场地管理系统</h3>
      </div>
      <el-form :model="loginForm"
               status-icon
               ref="loginForm"
               label-width="60px"
               label-position="right"
               class="demo-ruleForm"
               :hide-required-asterisk="true"
               style="margin-left:1em"
               @submit.native.prevent="login">
        <el-form-item prop="userName"
                      label="账号">
          <el-input v-model="loginForm.userName"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      label="密码">
          <el-input type="password"
                    v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-button type="primary"
                   native-type="submit"
                   style="margin:0 1em 1em 4.3em; width:30% ">登录</el-button>
        <el-button @click="resetForm('loginForm')"
                   style="margin-left: 0px; width:30% ">重置</el-button>
      </el-form>

      <div class="registerBtn">
        <span style="float:left;margin-left:3.5em">没有账号？</span>
        <el-button type="text"
                   @click="goRegister"
                   style="float:left;margin-right:2em;font-size: 14px;">申请账号</el-button>
      </div>
      <register-account-dialog
        :isOpen="registerAccountDialog.isOpen"
        @close="registerAccountDialog.isOpen = false"
      />
    </div>
  </div>
</template>

<script>
import RegisterAccountDialog from "../components/register/register-account-dialog";
import placeMixin from '@/plugins/mixins/place-mixin'

export default {
  components: {
    RegisterAccountDialog
  },
  mixins:[placeMixin],
  data () {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      backgroundDiv: {
        backgroundImage: 'url(' + require('../assets/bg.jpg') + ')',
        backgroundRepeat: 'repeat',
        backgroundSize: '100% 100%',
        height: '100%',
        width: '100%',
        position: 'fixed'
      },
      registerAccountDialog:{
        isOpen: false
      }
    };
  },
  mounted () {
    localStorage.clear();
  },
  methods: {
    async login () {
      this.$http.post("user/login", this.loginForm).then(res=>{
        if(res.status === 200){
          localStorage.token = res.data._id
          localStorage.userName = res.data.userName
          if(res.data.options === '0'){
            localStorage.options = res.data.options
          }
          this.$message.success('登录成功')
          this.$router.push('/announcementList')
          // setTimeout(()=>{
            location.reload()
          // },1000)
        }else{
          this.$message.error(res.data.message)
        }
      }).catch(err=>{
        this.$message.error(err.message||'登录失败')
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    goRegister () {
      this.registerAccountDialog.isOpen = true
    },
  }
};
</script>

<style lang='scss' scoped>
body {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.topzi {
  font-family: YouYUan;
  color: #409eff;
  text-align: center;
  position: relative;
}
.land[data-v-7589b93f] {
  width: 20em;
  margin: auto;
  margin-top: 4em;
  background-color: #ffffffbe;
  border: 1px solid #dcdee0;
  border-radius: 8px;
  overflow: hidden;
}
.el-input {
  width: 80%;
  min-width: 168px;
}
label.el-form-item__label {
  padding-right: 0em;
  text-align: right;
}

label span {
  display: inline-block;
  width: 100%;
}
.content .el-from-item__content {
  margin-left: 5em;
}
.registerBtn {
  width: 100%;
  float: left;
  background-color: #e9edf7a8;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  color: #56585c;
  line-height: 40px;
  padding-top: 0.3em;
  margin-top: 0.5em;
  /* overflow: hidden; */
}
/deep/ .v-modal{
  display: none;
}
</style>
