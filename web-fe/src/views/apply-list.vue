<template>
  <div class="apply-list">
    <div class="list-title">
      <el-alert
        title="申请管理"
        center
        type="success"
        :closable="false">
      </el-alert>
    </div>
    <el-divider></el-divider>
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
  export default {
    name: 'ApplyList',
    mixins:[placeMixin],
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
    }
  }
</script>
<style lang='scss' scpoed>
</style>
