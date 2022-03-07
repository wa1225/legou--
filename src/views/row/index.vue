<template>
    <div>
        <el-bread></el-bread>
        <el-button type="primary" plain size="small" @click="add">添加</el-button>
        <vlist @edit='edit'></vlist>
        <vdialog :diginfo='diginfo' @cancel='cancel' ref='diaRef'></vdialog>
        
    </div>
</template>
<script>
import vlist from './list'
import vdialog from './dialog'
export default {
    data() {
        return {
            diginfo:{
                isshow:false,
                isAdd:true

            }
        }
    },
    components:{
        vlist,
        vdialog
    },
    methods: {
        add(){
            this.diginfo.isshow = true;
            this.diginfo.isAdd = true

        },
        cancel(e){
              this.diginfo.isshow = e;
        },
        edit(e){
            this.diginfo.isshow = true;
            this.diginfo.isAdd = false;
            this.$refs.diaRef.lookup(e)
        }
    },
    
}
</script>
<style lang="stylus" scoped>
// @import '../stylus/index.styl';
 .el-button
   margin-top 20px;

</style>