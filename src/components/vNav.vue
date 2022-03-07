<template>
    <div>
       <!-- 
               el-menu
                default-active	当前激活菜单的 index	string
                background-color background-color	菜单的背景色（仅支持 hex 格式）	string
                 text-color	菜单的文字颜色（仅支持 hex 格式）	string
                 active-text-color	当前激活菜单的文字颜色（仅支持 hex 格式）	string
                 unique-opened	是否只保持一个子菜单的展开	boolean
             -->
         <el-menu
      :default-active="defaultActive"
      background-color="#4B6173"
      unique-opened
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >
            <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key='item.id'>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item :index="list.url" v-for='list in item.children' :key='list.id'>
                <span slot="title">{{list.title}}</span>
              </el-menu-item>
              <!-- <el-menu-item index="/row">
                <span slot="title">角色管理</span>
              </el-menu-item>
              <el-menu-item index="/manger">
                <span slot="title">管理员管理</span>
              </el-menu-item> -->
            </el-submenu>
      <!-- <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>商城管理</span>
        </template>
        
      </el-submenu> -->
    </el-menu>
        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      defaultActive:'/home',
      navlist:[]
    }
  },
  computed:{
    ...mapGetters(['getUserInfo'])

  },
  mounted() {
    console.log(this.$route.path)
   this.defaultActive = this.$route.path 
  //  console.log(sessionStorage.getItem('userinfo'))
   //判断存储是否有值
  //  this.navlist = sessionStorage.getItem('userinfo') ? JSON.parse(sessionStorage.getItem('userinfo')).menus : []
  },
    
}
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
 .el-menu
  height 100vh

</style>