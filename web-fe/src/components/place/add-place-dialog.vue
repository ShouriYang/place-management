<template>
  <div>
    <el-dialog title="添加场地" :visible.sync="isOpen">
      <el-form :model="placeForm">
        <el-form-item label="场地名称" :label-width="formLabelWidth">
          <el-input v-model="placeForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="场地类别" :label-width="formLabelWidth">
          <el-input v-model="placeForm.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="容纳人数" :label-width="formLabelWidth">
          <el-input-number v-model="placeForm.capacity" autocomplete="off" controls-position="right" @change="handleChange" :min="1" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="位置信息" :label-width="formLabelWidth">
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入场地具体位置"
          v-model="placeForm.location">
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
  name:'add-place-dialog',
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
      placeForm:{
        name:'',
        type:'',
        location:'',
        capacity: 0
      }
    }
  },
  methods: {
    close(){
      this.saveLoading = false
      this.placeForm = {
        name:'',
        type:'',
        location:'',
        capacity: 0
      }
      this.$emit('close')
    },
    save(){
      this.saveLoading = true
      this.$http.post("place", this.placeForm).then(res=>{
        if(res.status === 200){
          this.close()
          this.$emit('getPlaceData')
          this.$message.success('添加场地成功')
        }
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    handleChange(val){
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>