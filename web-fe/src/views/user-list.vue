<template>
  <div class="user-list">
    <div class="list-title">
      <el-tag style="fontSize:16px">用户管理</el-tag>
    </div>
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
  export default {
    name: 'UserList',
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
    text-align: center;
  }
</style>
