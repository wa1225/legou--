<template>
  <div>
    <el-table
      :data="cationlist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="pid" label="分类编号" width="100"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="img" label="图片">
          <template slot-scope="item">
              <div>

                  <img :src="$imgUrl+item.row.img" alt="" class="img" v-if="item.row.pid != 0 && item.row.img">
                  <img src="https://img1.baidu.com/it/u=1126878330,2942641081&fm=26&fmt=auto&gp=0.jpg" alt="" v-if="item.row.pid !=0 && item.row.img==''" class="img">
                  
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
import { catedelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    console.log(this.$store, "仓库");
    this.getcationlist();
  },
  methods: {
    ...mapActions({
      getcationlist: "goodcation/getcationaction"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("你确定要删除这条数据吗？？？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          catedelete({ id }).then(res => {
            this.$message.success(res.msg);
            this.getcationlist();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
<style lang="stylus" scoped>
.el-table {
  margin-top: 30px;
}
.img{
    width:130px;
    height 60px;
}
</style>