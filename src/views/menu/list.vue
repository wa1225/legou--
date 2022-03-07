<template>
  <div>
    <!-- 表格 -->
     <el-table
    :data="tableData"
    :tree-props="{ children: 'children'}"
    row-key="id"
    default-expand-all
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="菜单编号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="title"
      label="菜单名称">
    </el-table-column>
    <el-table-column
      prop="pid"
      label="上级菜单"
      width="80">
    </el-table-column>
    <el-table-column
      prop="icon"
      label="菜单图标">
      <!-- <i :class="item.icon" v-for='item in tableData' :key='item.id'>
      </i> -->
      <template slot-scope="item">
        <div>
           <i :class="item.row.icon">
      </i>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="菜单地址">
    </el-table-column>
     <el-table-column
      label="状态"
      width="200"
      prop="status">
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
           <el-button type="primary" size="small"  @click='edit(item.row.id)'>编辑</el-button>
           <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
          <!-- <el-button
            type="info"
            circle
            icon="el-icon-edit"
            size="small"
            @click='edit(item.row.id)'
          ></el-button> -->
          <!-- <el-button
            type="danger"
            circle
            icon="el-icon-delete"
            size="small"
            @click="del(item.row.id)"
          ></el-button> -->
        </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import {getMenuList,delMenu} from '../../util/axios'
export default {
     data() {
      return {
        tableData: [],
      }
    },
    mounted() {
       getMenuList().then((res)=>{
         console.log(res,'列表')
         if(res.code == 200){
           this.tableData = res.list;
          //  this.icon = res.list.icon
         }else{
            this.$message.console.error(res.msg);
            
         }
       })
       
    },
    methods: {
     del(id){
       this.$confirm('你确定要删除这条数据吗？？？?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调取删除接口
          delMenu({id})
          .then(res=>{
            if(res.code==200){
              this.$message.success(res.msg)
              //删除成功之后刷新
              location.reload()
            }else{
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    edit(id){
       this.$emit('edit',id)
    }
    },
};
</script>
<style lang="stylus" scoped>
 .el-table
   margin-top 20px

</style>