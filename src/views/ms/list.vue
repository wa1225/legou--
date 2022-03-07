<template>
  <div>
    <el-table :data="mslist" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status==1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {getSeckDelete} from '../../util/axios'
export default {
  methods: {
      //封装一个删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getSeckDelete({ id }).then(res => {
            if (res.code == 200) {
              this.getmslist();
              this.$message.success(res.msg);
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
    edit(id) {
      this.$emit("edit",id);
    },
    ...mapActions({
      getmslist: "goodms/getmsction"
    })
  },
  computed: {
    ...mapGetters({
      mslist: "goodms/getmslist"
    })
  },
  mounted() {
    this.getmslist();
  }
};
</script>
<style scoped>
.el-table{
    margin-top: 30px;
}
</style>