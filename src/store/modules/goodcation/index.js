import {getcatelist} from '../../../util/axios'
const state = {
    cationlist:[]
}
const getters = {
    getcationlist(state){
        return state.cationlist
    }
}
const mutations = {
    REQ_CATIONLIST(state,payload){
        state.cationlist = payload

    }
}
const actions = {
    //封装一个触发分类列表的行动
    getcationaction({commit}){
        getcatelist().then(res=>{
            if(res.code==200){
                commit('REQ_CATIONLIST',res.list)
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