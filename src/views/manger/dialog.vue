<template>
  <div>
    <el-dialog
      :title="diainfo.isAdd?'添加管理员':'编辑管理员'"
      :visible.sync="diainfo.isshow"
      :before-close="cancle"
    >
      <el-form :model="mangform" :rules="rules" ref="mangform">
        <el-form-item label="所属角色" :label-width="formLabelWidth" prop="roleid">
          <el-select v-model="mangform.roleid" placeholder="请选择">
            <el-option :label="item.rolename" :value="item.id" v-for="item in manglist" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="mangform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="mangform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="mangform.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getRowlist,addManger,getUserInfo,editUser} from '../../util/axios'
export default {
  props: ["diainfo"],
  data() {
    return {
      dialogFormVisible: true,
      mangform: {
        roleid: "",//角色编号
        username: "",//管理员名称
        password: "", //密码
        status: 1,//状态
      },
      manglist:[],
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        roleid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
    };
  },
  methods: {
      lookup(uid){
      getUserInfo({uid}).then((res)=>{
        if(res.code==200){
          this.mangform = res.list;
           this.mangform.uid = uid
           this.mangform.password = ''
        }
      })

    },
    cancle() {
      this.$emit("cancle", false);
      this.reset();
    },
    reset(){
        this.mangform = {
            roleid:'',
            username:'',
            password:'',
            status:1
        }
        this.$refs.mangform.resetFields();
    },
    confirm(){
        this.$refs.mangform.validate((val) => {
            if(val){
                if(this.diainfo.isAdd){
                    addManger(this.mangform).then(res=>{
                        if(res.code==200){
                            this.cancle();
                            this.$emit('init')
                        }
                    })
                }else{
                    editUser(this.mangform).then(res=>{
                        if(res.code==200){
                            this.cancle();
                            this.$emit('init')
                        }
                    })

                }
            }
        });
    }
    
  },
  mounted(){
      getRowlist().then((res)=>{
          if(res.code == 200){
              this.manglist = res.list
          }
      })

  }
};
</script>
<style lang="stylus" scoped></style>