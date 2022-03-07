import {getSeckList} from '../../../util/axios'
const state = {
    mslist:[]
}
const getters = {
    getmslist(state){
        return state.mslist
    }
}
const mutations = {
    REQ_MSLIST(state,payload){
        state.mslist = payload

    }
}
const actions = {
    //封装一个触发分类列表的行动
    getmsction({commit}){
        getSeckList().then(res=>{
            // console.log(res)
            if(res.code==200){
                commit('REQ_MSLIST',res.list)
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}