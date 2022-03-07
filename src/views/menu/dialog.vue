<template>
  <div>
    <el-dialog :title="diaInfo.isAdd?'添加':'编辑'" :before-close="cancel" :visible.sync="diaInfo.isShow">
      <el-form
      :rules="rules"
      :model="menuform"
      ref="menuform"
      >
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="menuform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop='pid'>
          <el-select v-model="menuform.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.title" :value="item.id" v-for="item in menulist" :key='item.id'></el-option>
            <!-- <el-option label="商城管理" :value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menuform.type" :label="1">目录</el-radio>
          <el-radio v-model="menuform.type" :label="2">菜单</el-radio>
        </el-form-item>
         <el-form-item label="菜单图标" :label-width="formLabelWidth" prop='icon'  v-if="menuform.type == 1">
          <el-select v-model="menuform.icon" placeholder="请选择图标">
            <el-option :label="item.name" :value="item.el" v-for="item in iconlist" :key='item.id'></el-option>          
          </el-select>
        </el-form-item>
         <el-form-item label="菜单地址" :label-width="formLabelWidth" prop='url'  v-else>
          <el-select v-model="menuform.url" placeholder="请选择地址">
            <el-option :label="item.name" :value="item.path" v-for="item in urllist" :key='item.name'></el-option>          
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          v-if="menuform.type == 1"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuform.icon" autocomplete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="menuform.url" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menuform.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="diaInfo.isAdd" type="primary" @click="add">添 加</el-button>
        <el-button @click="bianji" v-else type="primary">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addMenu,getMenuInfo,editMenu,getMenuList} from "../../util/axios";
// import {routerchild} from '../../router'
import {routerchild} from '../../router/index'
export default {
  props: ["diaInfo"],
  data() {
    return {
      value: "100",
      formLabelWidth: "120px",
      menuform: {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      },
      menulist:[],
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      iconlist:[
        {
          id:1,
          name:'系统图标',
          el:'el-icon-s-tools'
        },
        {
          id:2,
          name:'系统透明图标',
          el:'el-icon-setting'
        },
        {
          id:3,
          name:'购物图标',
          el:'el-icon-s-goods'
        },
        {
          id:4,
          name:'购物透明图标',
          el:'el-icon-goods'
        },
      ],
      urllist:routerchild
    };
  },
  mounted(){
    getMenuList().then(res=>{
      if(res.code==200){
        this.menulist = res.list
      }
    })

  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
      this.menuform = {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      };
      this.$refs.menuform.resetFields();
    },
    add(){
        this.$refs.menuform.validate((val) => {
        if (val) {
           console.log(this.menuform, "菜单弹框信息");
          addMenu(this.menuform)
            .then((res) => {
              console.log(res, "响应");
              if (res.code == 200) {
                this.cancel();
                this.$message.success(res.msg)
                location.reload();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err, "错误拦截");
            });
        } else {
          console.log("验证失败");
        }
      });
    },
    lookup(id){
      getMenuInfo({id})
      .then(res=>{
        console.log(res)
        if(res.code==200){
          this.menuform = res.list
          this.menuform.id = id
        }else{
          this.$message.error(res.msg)
        }
      })

    },
      bianji(){
      this.$refs.menuform.validate((val) => {
        if (val) {
           console.log(this.menuform, "菜单弹框信息");
          editMenu(this.menuform)
            .then((res) => {
              console.log(res, "响应");
              if (res.code == 200) {
                this.cancel();
                this.$message.success(res.msg)
                location.reload();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err, "错误拦截");
            });
        } else {
          console.log("验证失败");
        }
      })
    
  }
    
  },

};
</script>
<style lang="stylus" scoped></style>