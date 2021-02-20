<template>
  <div>
    <el-dialog title="申请注册" :visible.sync="isOpen">
      <el-form :model="registerForm">
        <el-form-item label="学院/组织" :label-width="formLabelWidth">
          <el-input v-model="registerForm.college" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="registerForm.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="registerForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'register-account-dialog',
  props: {
    isOpen:{
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      formLabelWidth: '80px',
      saveLoading: false,
      registerForm:{
        college: '',
        contact: '',
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    close(){
      this.saveLoading = false
      this.registerForm ={
        college: '',
        contact: '',
        userName: '',
        password: ''
      }
      this.$emit('close')
    },
    save(){
      this.saveLoading = true
      this.$http.post("user/register", this.registerForm).then(res=>{
        if(res.status === 200){
          this.close()
          this.$message.success('申请注册成功')
        }
      }).catch(err=>{
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>