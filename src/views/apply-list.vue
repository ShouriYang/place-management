<template>
  <div class="apply-list">
    <div class="list-title">
      <el-tag style="fontSize:16px">申请管理</el-tag>
    </div>
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
<style>
  .list-title{
    font-size: 20px !important;
    text-align: center;
  }
</style>
