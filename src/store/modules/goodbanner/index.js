import {bannerList} from '../../../util/axios'
const state = {
    bannerlist:[]
}
const getters = {
    getbannerlist(state){
        return state.bannerlist
    }
}
const mutations = {
    REQ_BANNERLIST(state,payload){
        state.bannerlist = payload

    }
}
const actions = {
    //封装一个触发分类列表的行动
    getbannerction({commit}){
        bannerList().then(res=>{
            if(res.code==200){
                commit('REQ_BANNERLIST',res.list)
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