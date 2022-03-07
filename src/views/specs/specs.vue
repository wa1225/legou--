<template>
    <div>
        <el-bread></el-bread>
        <el-button type="primary" plain size="small" @click="add">添加</el-button>
        <v-list @edit='edit'></v-list>
        <v-dialog :diainfo="diainfo" @cancel='cancel' ref='diaRef'></v-dialog>
        
    </div>
</template>
<script>
import vList from './list'
import vDialog from './dialog'
export default {
    data() {
        return {
            diainfo:{
                isshow:false,
                isAdd:true
            }
        }
    },
    components:{
        vList,
        vDialog
    },
    methods: {
        add(){
            this.diainfo.isshow = true;
            this.diainfo.isAdd = true;
        },
         cancel(e){
            this.diainfo.isshow = false;
        },
        edit(e){
            this.diainfo.isshow = true;
            this.diainfo.isAdd = false;
            this.$refs.diaRef.lookup(e)
        }
    },
    
}
</script>
<style lang="stylus" scoped>
 .el-button
   margin-top 20px;

</style>