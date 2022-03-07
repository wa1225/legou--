<template>
    <div>
          <el-table
    :data="userlist"
    border
    style="width: 100%">
    <el-table-column
      prop="uid"
      label="用户编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号">
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
          <div>
                <el-button type="primary" size='small' @click="edit(item.row.uid)">编辑</el-button>
          </div>
      </template>
    </el-table-column>
  </el-table>
        
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {

    mounted() {
        //  console.log(this.$store, "仓库");
        this.getuserlist();
        // console.log(this.userlist,'123')
    },
    methods: {
        edit(id){
            this.$emit('edit',id)
        },
        ...mapActions({
            getuserlist: "gooduser/getuserction"
        })
    },
    computed:{
        ...mapGetters({
            userlist: "gooduser/getuserlist"
        })

    }
    
}
</script>
<style  scoped>
.el-table{
    margin-top: 30px;
}

</style>