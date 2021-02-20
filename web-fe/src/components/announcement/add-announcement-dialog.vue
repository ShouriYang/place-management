<template>
  <div>
    <el-dialog title="发布公告" :visible.sync="isOpen">
      <el-form :model="announcementForm">
        <el-form-item label="公告标题" :label-width="formLabelWidth">
          <el-input v-model="announcementForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入公告内容"
          v-model="announcementForm.content">
          </el-input>
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
  name:'add-announcement-dialog',
  props: {
    isOpen:{
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      formLabelWidth: '120px',
      saveLoading: false,
      announcementForm:{
        title:'',
        content:''
      }
    }
  },
  methods: {
    close(){
      this.saveLoading = false
      this.announcementForm = {
        title:'',
        content:''
      }
      this.$emit('close')
    },
    save(){
      this.saveLoading = true
      this.$http.post("announcement", this.announcementForm).then(res=>{
        if(res.status === 200){
          this.close()
          this.$emit('getAnnouncementData')
          this.$message.success('发布公告成功')
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