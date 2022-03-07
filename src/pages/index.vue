<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="top_left">
          小U商城后台管理系统
        </div>
        <div class="top_right">
          <span>欢迎老板{{$store.getters.getUserInfo.username}}</span>
          <el-button type="danger" size="small" @click="logout">退出</el-button>
        </div>
        </el-header>
      <el-container>
        <el-aside width="220px">
         <v-nav></v-nav>
        </el-aside>
        <el-main>
                   <!-- <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">菜单管理</a></el-breadcrumb-item>
</el-breadcrumb>
 <el-button type="primary" plain size="small">添加</el-button> -->

  <router-view></router-view>


        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import vNav from '../components/vNav'
export default {
    
        
    components:{
       vNav,
    },
    methods: {
      logout(){
        this.$store.dispatch('changuseraction',false);
        this.$router.push('/login')
      },
    },
}
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header 
  background: $thirdColor;
  line-height 60px;
  font-size 25px
  font-family '楷体'
  color #fff
.top_left 
 float left
.top_right
 float right 

</style>
