<template>
  <div>
    <el-dialog :title="diginfo.isAdd ? '添加角色':'编辑角色'" :visible.sync="diginfo.isshow" :before-close="cancel">
      <el-form :model="roulist" ref="roulist" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
          <el-input v-model="roulist.rolename" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            ref="tree"
            check-strictly
            :data="menulist"
            show-checkbox
            node-key="id"
            :props="{
              children: 'children',
              label: 'title',
            }"
            default-expand-all
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roulist.status"
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
import { getMenuList,addRoleadd,getRow,rowlist} from "../../util/axios";
export default {
  props: ["diginfo"],
  data() {
    return {
      menulist: [],
      roulist: {
        rolename: "",
        menus: "[]",
        status: 1
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    lookup(id){
      getRow({id}).then((res)=>{
        if(res.code==200){
          this.roulist = res.list;
          //  this.$refs.tree.setCheckedKeys(this.roulist.menus.split(","));
           this.$refs.tree.setCheckedKeys(JSON.parse(this.roulist.menus));
           this.roulist.id = id
        }
      })
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    confirm() {
      this.$refs.roulist.validate((val)=>{
        if(val){
          this.roulist.menus = this.$refs.tree.getCheckedKeys()?
          JSON.stringify(this.$refs.tree.getCheckedKeys()):''
          // this.$refs.tree.getCheckedKeys().join(','):''
          if(this.diginfo.isAdd){
            addRoleadd(this.roulist).then((res)=>{
              console.log(res)
              this.cancel()
              location.reload();
            })
          }else{
            rowlist(this.roulist).then((res)=>{
              this.cancel()
              location.reload();
            })
          }

        }
      })

    },
    reset(){
      this.roulist = {
         rolename: "",
        menus: "[]",
        status: 1
      }
      this.$refs.roulist.resetFields();
      this.$refs.tree.setCheckedKeys([]);
    }
  },
  mounted() {
    getMenuList().then(res => {
      if (res.code == 200) {
        this.menulist = res.list;
      }
    });
  }
};
</script>
<style lang="stylus" scoped></style>