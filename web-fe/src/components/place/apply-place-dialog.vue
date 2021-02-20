<template>
  <div>
    <el-dialog title="申请场地" :visible.sync="isOpen" width="400px">
      <el-form :model="applyForm">
        <el-form-item label="申请日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="applyForm.date"
            align="right"
            type="date"
            placeholder="选择申请日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-time-select
            placeholder="开始时间"
            v-model="applyForm.startTime"
            :picker-options="{
              start: '09:30',
              step: '00:30',
              end: '18:30'
            }">
          </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-time-select
            placeholder="结束时间"
            v-model="applyForm.endTime"
            :picker-options="{
              start: '09:30',
              step: '00:30',
              end: '18:30',
              minTime: applyForm.startTime
            }">
          </el-time-select>
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
  name:'apply-place-dialog',
  props: {
    isOpen:{
      default: false,
      type: Boolean
    },
    placeId:{
      default: '',
      type: String
    }
  },
  data () {
    return {
      formLabelWidth: '80px',
      saveLoading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '明天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      applyForm:{
        date:'',
        startTime:'',
        endTime:''
      }
    }
  },
  methods: {
    close(){
      this.saveLoading = false
      this.applyForm={
        date:'',
        startTime:'',
        endTime:''
      }
      this.$emit('close')
    },
    save(){
      this.saveLoading = true
      const data = {
            userId: localStorage.token,
            placeId: this.placeId,
            startDate: this.applyForm.date + ' ' + this.applyForm.startTime,
            endDate: this.applyForm.date + ' ' + this.applyForm.endTime
          }
      this.$http.post('apply',data).then(res=>{
        if(res.status===200){
          this.close()
          this.$message.success("申请成功,请等待管理员审核")
        }else if (res.status===201){
          this.close()
          this.$message.error(res.data.message)
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