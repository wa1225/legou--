<template>
  <div class="login">
    <el-form
      :model="loginInfo"
      label-width="150px"
      class="loginForm"
      ref="login"
      size="mini"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input v-model="loginInfo.password"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="login">登录</el-button>
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
        name: [
          //失去焦点的验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          //字符串长度验证 产品经理设定
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        password: [
          //失去焦点的验证
          { required: true, message: "请输入密码", trigger: "blur" },
          //字符串长度验证 产品经理设定
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    beforeRouteLeave(to, from, next) {
      if (sessionStorage.getItem("userinfo") == null) {
        next("/login");
        location.reload();
      }else{
        next();
      }
    },
    login() {
      this.$refs.login.validate(val => {
        if (val) {
          console.log(this.loginInfo);
          userLogin(this.loginInfo).then(res => {
            // console.log(res)
            if (res.code == 200) {
              // sessionStorage.setItem('userinfo',JSON.stringify(res.list))
              this.$store.dispatch("changuseraction", res.list);
              this.$message.success(res.msg);
              this.$router.push("/home");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log(val, "2222");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: $firstColor;
}

.loginForm {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 50%;
  margin-top: -125px;
  left: 50%;
  margin-left: -200px;
}
</style>
