<template>
  <div>
    <el-dialog title="会员编辑" :visible.sync="isshow" :before-close="cancel">
      <el-form :model="user" :rules="rules" ref="user">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="user.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import { userInfo,userEdit} from "../../util/axios";
export default {
  props: ["isshow"],
  data() {
    return {
      dialogFormVisible: true,
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      },
      formLabelWidth: "120px",
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 2, max: 6, message: "长度为11个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 6, message: "长度为2-6个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    confirm() {
      this.$refs.user.validate(val => {
          if(val){
              userEdit(this.user).then(res=>{
                console.log(res)
                if(res.code==200){
                  this.cancel();
                  this.getuserlist();
                }
              })

          }

      });
    },
    lookup(uid) {
      userInfo({ uid }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.user = res.list;
          //    this.userlist.uid = uid
        }
      });
    },
     ...mapActions({
            getuserlist: "gooduser/getuserction"
        }),
    cancel() {
      this.$emit("cancel");
      this.reset();
    },
    reset() {
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      };
      this.$refs.user.resetFields();
    }
  },
   computed:{
        ...mapGetters({
            userlist: "gooduser/getuserlist"
        })

    }
};
</script>
<style  scoped>
</style>