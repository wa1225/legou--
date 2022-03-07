<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <v-list @edit="edit" :list='list' @init='init'></v-list>
    <v-dialog :diainfo="diainfo" @cancle="cancle" ref='diaRef' @init='init'></v-dialog>
    <el-pagination background layout="prev, pager, next" :total="pageinfo.count" :page-size='pageinfo.size' @current-change="changpage"></el-pagination>
  </div>
</template>
<script>
import {getUserCount,getUserList} from '../../util/axios'
import vList from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      diainfo: {
        isshow: false,
        isAdd: true
      },
      pageinfo:{
          size:2,
          page:1,
          count:0
      },
      list:[]
    };
  },

  components: {
    vList,
    vDialog
  },
  mounted() {
      this.init();
  },
  methods: {
    getcount(){
        getUserCount().then(res=>{
            if(res.code==200){
                console.log(res.list[0].total)
                this.pageinfo.count = res.list[0].total
            }
        })

    },
    getlist(){
            getUserList({
            size:this.pageinfo.size,
            page:this.pageinfo.page
        }).then(res=>{
            if(res.code ==200){
                this.list = res.list?res.list:[]
                if(this.pageinfo.page>1 && this.list.length==0){
                     this.pageinfo.page--
                     this.getlist()
                     return
                }
                this.list = res.list
                console.log(this.list)
            }
        })

    },
    init(){
        this.getcount();
        this.getlist();
        
    },
    add() {
      this.diainfo.isshow = true;
      this.diainfo.isAdd = true;
    },
    edit(e) {
      this.diainfo.isshow = true;
      this.diainfo.isAdd = false;
      this.$refs.diaRef.lookup(e)
    },
    cancle(e) {
      this.diainfo.isshow = false;
    },
    changpage(e){
        console.log(e);
        this.pageinfo.page = e;
        this.getlist();
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-button {
  margin-top: 20px;
}
.el-pagination{
    text-align:center;
    margin-top 30px;
}
</style>