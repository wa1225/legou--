<template>
  <div class="login">
    <el-form :model="loginInfo" label-width="100px" class="loginFrom" ref="login" :rules="rules">
      <el-form-item label="用户名" prop="username" class="a1">
        <el-input v-model="loginInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="a1">
        <el-input v-model="loginInfo.password"></el-input>
      </el-form-item>

      <el-form-item class="a1">
        <el-button type="primary" @click="log" class="but">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from "../util/axios";
export default {
  data() {
    return {
      loginInfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        passwold: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    log() {
      //console.log(this.loginInfo);
      this.$refs.login.validate(val => {
        //   console.log(val,'111');
        //   if(this.loginInfo.username == 'admin' && this.loginInfo.passwold == '12345'){
        //      this.$message.success('登录成功');
        //      this.$router.push('/index')
        //   }else{
        //       this.$message.error('用户名密码错误');
        //   }

        //登录接口
        // console.log(loginInfo
        // console.log(this.loginInfo);
        if (val) {
          userLogin(this.loginInfo)
            .then(res => {
              console.log(res, "登录");
              // console.log(JSON.stringify(this.loginInfo));
            })
            .catch(err => {
              console.log();
            });
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.but {
  padding: 10px;
}
.login {
  width: 100vw;
  height: 100vh;
  background-color: #73b3e3;
}
.loginFrom {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 400px;
  height: 250px;
}
.a1 {
  margin-top: 20px;
}
</style>
