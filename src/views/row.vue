<template>
  <div>
   <el-bread></el-bread>
    <el-button type="primary" plain size="small">添加</el-button>

    <!-- 表格 -->
     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
     <el-table-column
      label="状态">
         <el-button type="success" plain>启用</el-button>
    </el-table-column>
     <el-table-column
      label="操作">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
     data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-button
  margin-top 20px;

</style>