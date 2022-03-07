<template>
    <div>
        <el-bread></el-bread>
        <el-button type="primary" plain size="small" @click="add()">添加</el-button>
        <vlist @edit='edit'></vlist>
        <vdialog :diginfo='diginfo' @cancel='cancel' ref='diaRef'></vdialog>
        
    </div>
</template>
<script>
import vlist from './list'
import vdialog from './dialog'
export default {
     components:{
        vlist,
        vdialog
    },
    data() {
        return {
             diginfo:{
                isshow:false,
                isAdd:true

            }
        }
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
.el-button{
    margin-top 20px;
}

</style>