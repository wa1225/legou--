<template>
  <div>
    <el-dialog
      :title="diginfo.isAdd?'添加活动':'编辑活动'"
      :visible.sync="diginfo.isshow"
      :before-close="cancel"
    >
      <el-form :model="ms" :rules="rules" ref="ms">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prpo="title">
          <el-input v-model="ms.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <template>
            <div class="block">
              <el-date-picker
                v-model="timer"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="ms.first_cateid" placeholder="请选择" @change="changeCate(false)">
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in cationlist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="ms.second_cateid" placeholder="请选择" @change="changeGoods(false)">
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in secondArr"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="ms.goodsid" placeholder="请选择">
            <el-option
              :label="item.goodsname"
              :value="item.id"
              v-for="item in goodsArr"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="ms.status"
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
import { mapActions, mapGetters } from "vuex";
import {
  getshopList,
  getSeckAdd,
  getSeckInfo,
  getSeckEdit
} from "../../util/axios";
export default {
  props: ["diginfo"],
  data() {
    return {
      value1: "",
      ms: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      rules: {
        title: [
          { required: true, message: "请输入秒杀名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      },
      timer: null,
      formLabelWidth: "120px",
      secondArr: [],
      goodsArr: []
    };
  },
  computed: {
    ...mapGetters({
      cationlist: "goodcation/getcationlist",
      mslist: "goodms/getmslist"
    })
  },
  mounted() {
    this.getcationlist();
  },
  methods: {
    //封装一个查询单条事件
    lookup(id) {
      getSeckInfo({ id }).then(res => {
        if (res.code == 200) {
          this.ms = res.list;
          this.ms.id = id;
          //对时间数据进行二次转化
          this.timer = [
            new Date(parseInt(this.ms.begintime)),
            new Date(parseInt(this.ms.endtime))
          ];
          this.changeCate(true);
          this.changeGoods(true);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.ms.validate(val => {
        if (val) {
          //事件 [Wed Apr 21 2021 00:00:00 GMT+0800 (中国标准时间), Wed Apr 21 2021 23:00:00 GMT+0800 (中国标准时间), __ob__: Observer] 东八区的数组
          //后端需要的是分开的字符串，实际上要 时间戳
          this.ms.begintime = new Date(this.timer[0]).getTime();
          this.ms.endtime = new Date(this.timer[1]).getTime();
          //数据处理 主要处理时间
          // console.log(this.timer,'时间');
          // console.log(this.seckInfo,'seckInfo');
          if (this.diginfo.isAdd) {
            // //添加接口
            getSeckAdd(this.ms).then(res => {
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //重新触发行动
                this.getmslist();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //编辑接口
            getSeckEdit(this.ms).then(res => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //重新触发行动
                this.getmslist();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        }
      });
    },
    cancel() {
      this.$emit("cancel");
      this.reset();
    },
    reset() {
      this.ms = {
        title: "", //秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1 //状态1正常2禁用
      };
      //调用清空验证的方法
      this.$refs.ms.resetFields();
      //清空事件数据绑定属性
      this.timer = null;
    },
    //创建一个切换一级分类触发的事件
    changeCate(n) {
      let index = this.cationlist.findIndex(
        item => item.id == this.ms.first_cateid
      );
      this.secondArr = this.cationlist[index].children;
      if (!n) {
        //场景：切换一级分类 清空二级数据绑定 清空商品
        this.ms.second_cateid = "";
        this.ms.goodsid = "";
      }
    },
    //创建一个切换二级分类渲染商品列表事件
    changeGoods(n) {
      getshopList({
        fid: this.ms.first_cateid,
        sid: this.ms.second_cateid
      }).then(res => {
        console.log(res, "商品列表");
        if (res.code == 200) {
          this.goodsArr = res.list;
        }
      });
      if (!n) {
        this.ms.goodsid = "";
      }
    },
    ...mapActions({
      getcationlist: "goodcation/getcationaction",
      getmslist: "goodms/getmsction"
    })
  }
};
</script>
<style lang="stylus" scoped></style>