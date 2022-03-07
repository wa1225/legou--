<template>
  <div>
    <el-dialog
      :title="diginfo.isAdd?'添加商品':'编辑商品'"
      :visible.sync="diginfo.isshow"
      :before-close="cancel"
      @opened="createEdit"
    >
      <el-form :model="shoplist" :rules="rules" ref="shoplist">
        <el-form-item label="一级分类" :label-width="formLabelWidth" prop="first_cateid">
          <el-select v-model="shoplist.first_cateid" placeholder="请选择" @change="changeCate(false)">
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in cationlist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth" prop="second_cateid">
          <el-select v-model="shoplist.second_cateid" placeholder="请选择">
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in secondlist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsname">
          <el-input v-model="shoplist.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="shoplist.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth" prop="market_price">
          <el-input v-model="shoplist.market_price" autocomplete="off"></el-input>
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
        <el-form-item label="商品规格" :label-width="formLabelWidth" prop="specsid">
          <el-select v-model="shoplist.specsid" placeholder="请选择" @change="changeSpecs(false)">
            <el-option
              :label="item.specsname"
              :value="item.id"
              v-for="item in specslist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth" prop="specsattr">
          <el-select v-model="shoplist.specsattr" placeholder="请选择" multiple>
            <el-option :label="item" :value="item" v-for="item in attrs" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="shoplist.isnew" :label="1">是</el-radio>
          <el-radio v-model="shoplist.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="shoplist.ishot" :label="1">是</el-radio>
          <el-radio v-model="shoplist.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="shoplist.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="wangeditor"></div>
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
import E from "wangeditor";
import { goodsshopAdd, getshopInfo, getshopEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["diginfo"],
  data() {
    return {
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur"
          }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" }
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" }
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" }
        ],
        specsid: [
          { required: true, message: "请选择商品商品", trigger: "change" }
        ],
        specsattr: [
          { required: true, message: "请选择商品属性", trigger: "blur" }
        ]
      },
      secondlist: [],
      attrs: [],
      shoplist: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品商品编号
        specsattr: "", //商品商品属性
        isnew: 1, //是否新品1是2不是
        ishot: 1, //是否热卖1是2不是
        status: 1 //状态1正常2禁用
      },
      dialogVisible: false,
      dialogFormVisible: true,
      dialogImageUrl: "",
      filelist: [],
      formLabelWidth: "120px",
      eidtor: null
    };
  },
  computed: {
    ...mapGetters({
      cationlist: "goodcation/getcationlist",
      specslist: "goodspecs/getspecslist",
      getshoplist: "goodshop/getshoplist"
    })
  },
  mounted() {
    this.getcationlist();
    this.getspecslist();
  },
  methods: {
    createEdit() {
          this.eidtor = new E("#wangeditor");
          this.eidtor.create();
          this.eidtor.txt.html(this.shoplist.description)
    },
    lookup(id) {
      getshopInfo({ id }).then(res => {
        if (res.code === 200) {
          this.shoplist = res.list;
          this.shoplist.id = id;
          this.shoplist.specsattr = this.shoplist.specsattr.split(",");
          this.filelist = this.shoplist.img
            ? [{ url: this.$imgUrl + this.shoplist.img }]
            : [];
          // this.changeCate(true);
          // this.changeAttr(true);
        }
      });
    },
    changeCate(n) {
      let index = this.cationlist.findIndex(
        item => item.id == this.shoplist.first_cateid
      );
      console.log(index);
      this.secondlist = this.cationlist[index].children;
      if (!n) {
        this.shoplist.second_cateid = "";
      }
    },
    changeSpecs(n) {
      let index = this.specslist.findIndex(
        item => item.id == this.shoplist.specsid
      );
      console.log(index);
      this.attrs = this.specslist[index].attrs;
      console.log(this.attrs);
      if (!n) {
        this.shoplist.specsattr = "";
      }
    },
    ...mapActions({
      getcationlist: "goodcation/getcationaction",
      getspecslist: "goodspecs/getspecsaction",
      getshopaction: "goodshop/getshopaction",
      getcountaction: "goodshop/getcountaction"
    }),
    onexceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.shoplist = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品商品编号
        specsattr: "", //商品商品属性
        isnew: 1, //是否新品1是2不是
        ishot: 1, //是否热卖1是2不是
        status: 1 //状态1正常2禁用
      };
      this.$refs.shoplist.resetFields();
      this.filelist = [];
    },
    onchange(file, fileList) {
      this.shoplist.img = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    confirm() {
      this.$refs.shoplist.validate(val => {
        if (val) {
          console.log(this.shoplist.specsattr, "456");
          this.shoplist.specsattr = this.shoplist.specsattr.join(",");
          this.shoplist.description = this.eidtor.txt.html();
          console.log(typeof this.shoplist.specsattr, "123");
          //formData转化
          let file = new FormData();
          for (let i in this.shoplist) {
            file.append(i, this.shoplist[i]);
          }
          if (this.diginfo.isAdd) {
            goodsshopAdd(file).then(res => {
              console.log(res, "che");
              if (res.code == 200) {
                this.cancel();
                this.$message.success(res.msg)
                this.getshopaction();
                this.getcountaction();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            getshopEdit(file).then(res => {
              if (res.code == 200) {
                this.cancel();
                this.getshopaction();
                this.getcountaction();
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped></style>