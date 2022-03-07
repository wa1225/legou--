<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-dialog :diginfo='diginfo' @cancel='cancel' ref="dia"></v-dialog>
  </div>
</template>
<script>
import vList from "./list";
import vDialog from "./dialog";
export default {
  components: {
    vList,
    vDialog
  },
  data() {
    return {
      diginfo: {
        isshow: false,
        isAdd: true
      }
    };
  },
  methods: {
      add(){
          this.diginfo.isshow= true;
          this.diginfo.isAdd = true;
      },
      cancel(){
          this.diginfo.isshow = false;
      },
      edit(e){
          this.diginfo.isshow = true;
          this.diginfo.isAdd = false;
          this.$refs.dia.lookup(e)
      }
  },
};
</script>
<style  scoped>
.el-button {
  margin-top: 20px;
}
</style>