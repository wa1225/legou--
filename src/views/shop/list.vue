<template>
    <div>
        <el-table
    :data="getshoplist"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="商品编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsname"
      label="商品名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="market_price"
      label="市场价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="img"
      label="图片"
      width="180">
     <template slot-scope="item">
       <div>
          <img :src="$imgUrl+item.row.img" alt="" class="img">
         
       </div>
     </template>
    </el-table-column>
    <el-table-column
      prop="isnew"
      label="是否新品"
      width="100">
      <template slot-scope="item">
        <div>
           <el-tag type="success" v-if="item.row.isnew==1">是</el-tag>
           <el-tag type="danger" v-else>否</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="ishot"
      label="是否热卖"
      width="100">
      <template slot-scope="item">
        <div>
           <el-tag type="success" v-if="item.row.ishot==1">是</el-tag>
           <el-tag type="danger" v-else>否</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="item">
        <div>
           <el-tag type="success" v-if="item.row.status==1">启用</el-tag>
           <el-tag type="danger" v-else>禁用</el-tag>
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
   <el-pagination :page-size="size" @current-change='onchange' background layout="prev, pager, next" :total="count"></el-pagination>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {getshopDel} from '../../util/axios'
export default {
    
    computed:{
      ...mapGetters({
        getshoplist:'goodshop/getshoplist',
        size:'goodshop/getsize',
        count:'goodshop/getcount',
      }),
    },
    mounted(){
      console.log(this.$store, "仓库");
      this.getshopaction();
      this.getcountaction();
    },
    methods: {
       onchange(e){
          this.changePage(e);

    },
      del(id) {
      this.$confirm("你确定要删除这条数据吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getshopDel({ id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //重新获取列表
              this.getshopaction();
              this.getcountaction();
              console.log(this.getcountaction(),'123');
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
           getshopaction:"goodshop/getshopaction",
           getcountaction:'goodshop/getcountaction',
           changePage:"goodshop/changePageAction",
       }),
       
        edit(id){
        this.$emit('edit',id)
      },
    },
    
}
</script>
<style lang="stylus" scoped>
.img{
  width:140px;
  height:80px;
}
.el-table{
  margin-top:30px;
}

</style>