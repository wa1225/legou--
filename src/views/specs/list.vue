<template>
  <div>
    <el-table :data="specslist" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="item">
          <div>
            <el-tag type="info" v-for="attr in item.row.attrs" :key="attr">{{attr}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template>
          <div>
            <el-tag type="success">启用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size="size" @current-change='onchange' background layout="prev, pager, next" :total="count"></el-pagination>
  </div>
</template>
<script>
import { getSpecsDelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    console.log(this.$store, "仓库");
    this.getspecslist();
    this.getcountaction();
  },

  methods: {
    onchange(e){
          this.changePage(e);

    },
    ...mapActions({
      getspecslist: "goodspecs/getspecsaction",
      getcountaction:'goodspecs/getcountaction',
      changePage: "goodspecs/changePageAction",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("你确定要删除这条数据吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getSpecsDelete({ id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getspecslist();
              this.getcountaction();
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
    }
  },
  computed: {
    ...mapGetters({
      specslist: "goodspecs/getspecslist",
      count: "goodspecs/getcount",
      size: "goodspecs/getsize",
    })
  }
};
</script>
<style lang="stylus" scoped>
.el-table {
  margin-top: 30px;
}
</style>