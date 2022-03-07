<template>
  <div>
   <el-bread></el-bread>
    <el-button type="primary" plain size="small" @click="getinfo">添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-dialog :diaInfo='diaInfo' @cancel="cancel"  ref="dialogInfo"></v-dialog>

   
  </div>
</template>
<script>
import vList from './list'
import vDialog from './dialog'
export default {
    data() {
        return {
            diaInfo:{
               isShow:false,
               isAdd:true

            }
        }
    },
    components:{
        vList,
        vDialog
    },
    methods: {
        getinfo(){
            this.diaInfo.isShow = true;
            this.diaInfo.isAdd = true;
        },
        cancel(e){
            this.diaInfo.isShow = e;
        },
        edit(e){
           this.diaInfo.isShow = true;
           this.diaInfo.isAdd = false;
           console.log(this.$refs.dialogInfo)
           this.$refs.dialogInfo.lookup(e)
        }
    },
     
};
</script>
<style lang="stylus" scoped>
// @import '.../stylus/index.styl';

.el-button 
  margin-top 20px

</style>