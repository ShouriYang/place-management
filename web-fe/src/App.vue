<template>
  <div id="app">
    <div v-if="!isLogin">
      <router-view name="Login"/>
    </div>
    <div v-if="isLogin">
      <div class="nav">
        <div class="nav-left">
          <span class="nav-title">
            <i class="el-icon-edit-outline"></i>
            场地管理系统
          </span>
        </div>
        <div class="nav-right">
          <el-dropdown @command="handleLogout">
              <span class="user-info">
                <img class="user-avatar" src="./assets/user-avatar.png" alt="">
                <span>{{userName || ''}}</span>
              </span> 
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    mounted () {
      if(!this.isLogin){
        this.$router.push('/login')
      }
    },
    computed: {
      userName(){
        return localStorage.userName
      },
      isLogin(){
        return !(!localStorage.token)
      }
    },
    methods: {
      handleCollapse(){
        this.isCollapse = !this.isCollapse
      },
      handleLogout(){
        localStorage.clear()
        this.$router.push('/login')
        location.reload();
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
  .nav{
    justify-content: space-between;
    color: #fff;
    font-size: 16px;
  }
  .nav-left{
    margin-left: 20px;
  }
  .nav-right{
    margin-right: 50px;
    .user-info{
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      .user-avatar{
        margin-right: 8px;
        width: 30px !important;
        height: 30px !important;
      }
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

