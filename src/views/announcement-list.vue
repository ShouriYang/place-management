<template>
  <div class="announcement-list">
    Hone
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
  export default {
    name: 'AnnouncementList',
    mixins:[placeMixin],
    data() {
      return {
        isCollapse: false
      };
    },
    computed: {
      menuMap () {
        const allMaps = [
          {
            title:'公告管理',
            key:'announcementList',
            icon:'el-icon-menu',
          },
          {
            title:'场地管理',
            key:'placeList',
            icon:'el-icon-document',
          },
          {
            title:'申请管理',
            key:'applyList',
            icon:'el-icon-document',
          },
          {
            title:'用户管理',
            key:'userList',
            icon:'el-icon-document',
          }
        ]
        return allMaps
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
