import {getSpecsList,getSpecsCount} from '../../../util/axios'
const state = {
    specslist: [],
    size:2,
    page:1,
    total:0
}
const getters = {
    getspecslist(state) {
        return state.specslist
    },
    getcount(state){
        return state.total
    },
    getsize(state){
        return state.size
    }
}
const mutations = {
    REQ_SPECSLIST(state, payload) {
        state.specslist = payload
    },
    REQ_SPECSCOUNT(state,payload){
        state.total = payload
    },
      //修改page
  CHANGE_PAGE(state, payload) {
    state.page = payload;
  },
}
const actions = {
    //封装一个触发分类列表的行动
    getspecsaction(context) {
        // console.log('行动被触发')
        getSpecsList({
            size:context.state.size,
            page:context.state.page
        }).then(res => {
            if (res.code == 200) {
                if (context.state.page > 1 && res.list.length == 0) {
                    context.state.page--
                    context.dispatch('getspecsaction')
                    return
                }
                context.commit('REQ_SPECSLIST', res.list)
            }
        })
    },
    //封装一个总条数
    getcountaction(context){
        getSpecsCount().then(res=>{
            if(res.code==200){
                context.commit('REQ_SPECSCOUNT', res.list[0].total)
            }
            
        })

    },
    //切换页码的行动
    changePageAction(context, payload) {
        console.log("行动");
        //修改page 并重新调取列表
        //  context.state.page = payload
        //修改state 就要用mutation
        context.commit("CHANGE_PAGE", payload);
        context.dispatch("getspecsaction");
      },

}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}