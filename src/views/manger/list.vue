<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="320"></el-table-column>
      <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status==1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" size="small" @click="edit(item.row.uid)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(item.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { delUser } from "../../util/axios";
export default {
  props: ["list"],
  data() {
    return {};
  },

  methods: {
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(uid) {
      this.$confirm("你确定要删除这条数据吗？？？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser({ uid }).then(res => {
            this.$message.success(res.msg);
            this.$emit('init')
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-table {
  margin-top: 20px;
}
</style>