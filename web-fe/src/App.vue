<template>
  <div id="app">
    <div class="nav">
      <div class="nav-left">
        <span class="nav-title">
          <i class="el-icon-edit-outline"></i>
          场地管理系统
        </span>
      </div>
    </div>
    <div class="content">
      <el-menu :default-active="listType" router class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item 
          v-for="(menu,index) in menuMap" 
          :index="menu.key"
          :key="index">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
      </el-menu>
      <div class="content-list">
        <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" class="collapse-btn" @click="handleCollapse"></i>
        <template>
          <router-view name="AnnouncementList"/>
          <router-view name="PlaceList"/>
          <router-view name="UserList"/>
          <router-view name="ApplyList"/>
        </template> 
      </div>
    </div>
    <div class="footer">

    </div>
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
  export default {
    name: 'App',
    mixins:[placeMixin],
    data() {
      return {
        isCollapse: false
      };
    },
    created () {
    },
    computed: {

    },
    methods: {
      handleCollapse(){
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>
<style lang="scss">
  .nav, .footer{
    height: 50px;
    background-color: #545c64;
    display: flex;
    align-items: center;
  }
  .nav-left{
    margin-left: 20px;
    .nav-title{
      color: #fff;
      font-size: 16px;
    }
  }
  .content{
    display: flex;
    min-height: 450px;
    .collapse-btn{
      color: #409EFF;
      font-size: 20px;
      cursor: pointer;
    }
    .content-list{
      width: 100%;
      margin-left: 12px;
      margin-right: 50px;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-vertical-demo {
    padding-top: 8px;
  }
</style>

