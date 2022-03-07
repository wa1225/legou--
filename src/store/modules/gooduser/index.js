import {userList} from '../../../util/axios'
const state = {
    userlist:[]
}
const getters = {
    getuserlist(state){
        return state.userlist
    }
}
const mutations = {
    REQ_USERLIST(state,payload){
        state.userlist = payload

    }
}
const actions = {
    //封装一个触发分类列表的行动
    getuserction({commit}){
        // console.log('行动被触发')
        userList().then(res=>{
            // console.log(res)
            if(res.code==200){
                commit('REQ_USERLIST',res.list)
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