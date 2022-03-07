<template>
  <div>
    <el-table :data="getbannerlist" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
      <el-table-column prop="img" label="图片">
          <template slot-scope="item">
              <div>
                  <img :src="$imgUrl+item.row.img" alt="" class="img">
                  
              </div>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <el-tag type="success">启用</el-tag>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {bannerDel} from '../../util/axios'
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  mounted(){
     this.getbannerction();
     console.log(this.getbannerction())
  },
  methods: {
          del(id) {
      this.$confirm("你确定要删除这条数据吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          bannerDel({ id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //重新获取列表
              this.getbannerction();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
      
    ...mapActions({
        getbannerction:'goodbanner/getbannerction'
    }),
    edit(id) {
      this.$emit("edit",id);
    }
  },
  computed: {
    ...mapGetters({
      getbannerlist: "goodbanner/getbannerlist"
    })
  }
};
</script>
<style lang="stylus" scoped>
.el-table{
  margin-top:30px;
}
.img{
  width:160px;
  height:80px;
}
</style>