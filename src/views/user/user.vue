<template>
    <div>
        <el-bread></el-bread>
        <v-list @edit='edit'></v-list>
        <v-dialog :isshow='isshow' @cancel='cancel' ref="diaRef"></v-dialog>
    </div>
</template>
<script>
import vList from './list'
import vDialog from './dialog'
export default {
    data() {
        return {
            isshow:false,
        }
    },
    components:{
        vList,
        vDialog
    },
    methods: {
        edit(e){
            this.isshow=true
            this.$refs.diaRef.lookup(e)
        },
        cancel(){
            this.isshow = false;
        }
    },
    
}
</script>
<style  scoped>

</style>