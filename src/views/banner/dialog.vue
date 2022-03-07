<template>
  <div>
    <el-dialog
      :title="diainfo.isAdd?'添加轮播图':'编辑轮播图'"
      :visible.sync="diainfo.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="bannelist" :rules="rules" ref="bannelist">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="bannelist.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onchange"
            :file-list="filelist"
            :limit="1"
            :on-exceed="onexceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="bannelist.status"
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
import { bannerAdd,bannerInfo,bannerEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["diainfo"],
  data() {
    return {
      bannelist: {
        title: "",
        img: "",
        status: 1
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      },
      filelist: [],
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
       lookup(id){
      bannerInfo({id}).then((res)=>{
        if(res.code==200){
          this.bannelist = res.list;
          //  this.$refs.tree.setCheckedKeys(this.roulist.menus.split(","));
           this.bannelist.id = id
           this.filelist = this.bannelist.img? [{url:this.$imgUrl+this.bannelist.img}]:[]
        }
      })

    },
       ...mapActions({
        getbannerction:'goodbanner/getbannerction'
    }),
    confirm() {
      this.$refs.bannelist.validate(val => {
        if (val) {
          let file = new FormData();
          for (let i in this.bannelist) {
            file.append(i, this.bannelist[i]);
          }
          if(this.diainfo.isAdd){
                  bannerAdd(file).then(res => {
            if(res.code==200){
                this.cancel();
                this.getbannerction();
            }
          });
          }else{
              bannerEdit(file).then(res=>{
                  if(res.code==200){
                      this.cancel();
                this.getbannerction();
                  }
              })
          }
      
        }
      });
    },
    cancel() {
      this.$emit("cancel");
      this.reset();
    },
    reset() {
      this.bannelist = {
        title: "",
        img: "",
        status: 1
      };
      this.$refs.bannelist.resetFields();
      this.filelist=[]
    },
    onexceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    onchange(file, fileList) {
      this.bannelist.img = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
   computed: {
    ...mapGetters({
      getbannerlist: "goodbanner/getbannerlist"
    })
  }
};
</script>
<style lang="stylus" scoped></style>