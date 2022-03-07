<template>
  <div>
    <el-dialog :title="diainfo.isAdd?'添加商品':'编辑商品'" :visible.sync="diainfo.isshow" :before-close="cancel">
      <el-form :model="cationinfo" :rules="rules" ref="cationinfo">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="cationinfo.pid" placeholder="请选择上级分类">
            <el-option label="上级分类" :value="0"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in cationlist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="catename">
          <el-input v-model="cationinfo.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth"   v-if="cationinfo.pid != 0">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload='false'	
            :on-change='onchange'
            :file-list='filelist'
            :limit="1"
            :on-exceed='onexceed'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="cationinfo.status"
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
import { cateAdd,getcateinfo,cateedit} from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["diainfo"],
  data() {
    return {
      value: "100",
      dialogFormVisible: true,
      cationinfo: {
        pid: 0,
        catename: "",
        img: "",
        status: 1
      },
      filelist:[],
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        catename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }]
      }
    };
  },
  methods: {
     onexceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    onchange(file,fileList){
      this.cationinfo.img = file.raw;
    },
     lookup(id){
      getcateinfo({id}).then((res)=>{
        if(res.code==200){
          this.cationinfo = res.list;
          //  this.$refs.tree.setCheckedKeys(this.roulist.menus.split(","));
           this.cationinfo.id = id
           this.filelist = this.cationinfo.img? [{url:this.$imgUrl+this.cationinfo.img}]:[]
        }
      })

    },
      reset(){
          this.cationinfo = {
              pid:0,
              catename:'',
              img:'',
              status:1,
          }
          this.$refs.cationinfo.resetFields();
      },
    ...mapActions({
      getcationlist: "goodcation/getcationaction"
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    confirm() {
      this.$refs.cationinfo.validate(val => {
        if (val) {
          let file = new FormData();
          for (let i in this.cationinfo) {
            file.append(i, this.cationinfo[i]);
          }
          //  console.log(file.get('catename'))
          if (this.diainfo.isAdd) {
            cateAdd(file).then(res => {
              console.log(res);
              this.cancel();
              this.getcationlist();
            });
          }else{
              cateedit(file).then(res=>{
                this.cancel();
                this.getcationlist();
              })
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      cationlist: "goodcation/getcationlist"
    })
  }
};
</script>
<style lang="stylus" scoped></style>