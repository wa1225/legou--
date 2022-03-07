<template>
  <div>
    <el-dialog
      :title="diainfo.isAdd?'添加商品规格':'编辑商品规格'"
      :visible.sync="diainfo.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="roulist" ref="roulist" :rules="rules">
        <el-form-item label="规格名称" :label-width="formLabelWidth" prop="specsname">
          <el-input v-model="roulist.specsname" autocomplete="off"></el-input>
        </el-form-item>
                <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, idx) in attrArr"
          :key="idx"
        >
          <el-input
            style="width:75%"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button class="elbtn" v-if="idx == 0" @click="addInp" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delInp(idx)" type="danger" class="del">删除</el-button>
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
import { getSpecsAdd,getSpecsEdit,getSpecsInfo} from "../../util/axios";
import {mapActions} from 'vuex'
export default {
  props: ["diainfo"],
  data() {
    return {
      roulist: {
        specsname: "",
        attrs: "",
        status: 1
      },
      attrArr: [
        {
          value: "",
        },
      ],
      dialogTableVisible: true,
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addInp() {
      if (this.attrArr.length < 6) {
        this.attrArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多添加6个input框！！！");
      }
    },
    delInp(i) {
      this.attrArr.splice(i, 1);
    },
    lookup(id){
      getSpecsInfo({id}).then((res)=>{
        // console.log(res)
        if(res.code==200){
          this.roulist = res.list[0];
          this.roulist.id = id
          this.roulist.attrs.map((item, idx) => {
            if (idx == 0) {
              this.attrArr[0].value = item;
            } else {
              this.attrArr.push({
                value: item,
              });
            }
          });
        }
      })
    },
    ...mapActions({
      getspecslist: "goodspecs/getspecsaction",
      getcountaction:'goodspecs/getcountaction',
    }),
    reset() {
      this.roulist = {
        specsname: "",
        attrs: "",
        status: 1
      };
      this.$refs.roulist.resetFields();
      this.attrArr= [
        {
          value: "",
        },
      ]
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    confirm() {
      this.$refs.roulist.validate(val => {
        if (val) {
          this.roulist.attrs = this.attrArr
            .map((item) => item.value)
            .join(",");
          if (this.diainfo.isAdd) {
            getSpecsAdd(this.roulist).then(res => {
              console.log(res);
              if (res.code == 200) {
                this.cancel();
                this.getspecslist();
                this.getcountaction();
                 this.$message.success(res.msg);
              }else{
                 this.$message.error(res.msg);
              }
            });
          }else{
              getSpecsEdit(this.roulist).then(res=>{
                console.log(res,'编辑成功')
                if (res.code === 200) {
                this.cancel();
                this.getspecslist();
                this.getcountaction()
              }
              })
          }
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.elbtn{
  margin-left:20px;
}
.del{
  margin-left:20px;
}
</style>