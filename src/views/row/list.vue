<template>
    <div>
         <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="角色编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="rolename"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status==1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="item">
     <el-button type="primary" size="small" @click="edit(item.row.id)" >编辑</el-button>
      <el-button type="danger" size="small" @click="del(item.row.id)" >删除</el-button>
      </template>

    </el-table-column>
  </el-table>
    </div>
</template>
<script>
import {getRowlist,delRow} from '../../util/axios'
export default {
     data() {
      return {
        tableData: []
      }
    },
    mounted(){
      getRowlist().then(res=>{
        if(res.code==200){
          this.tableData = res.list;
        }
        console.log(res)
      })

    },
    methods: {
      edit(id){
        this.$emit('edit',id)
      },
      del(id){
        this.$confirm("你确定要删除这条数据吗？？？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        delRow({id}).then((res)=>{
          this.$message.success(res.msg);
          location.reload();
        })

      })
      .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      }
    },
    
}
</script>
<style lang="stylus" scoped>
.el-table 
 margin-top 20px

</style>