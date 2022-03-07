import {getshopList,getshopCount} from '../../../util/axios'
const state = {
    shoplist: [],
    size:2,
    page:1,
    total:0
}
const getters = {
    getshoplist(state) {
        return state.shoplist
    },
    getcount(state){
        return state.total
    },
    getsize(state){
        return state.size
    }
}
const mutations = {
    REQ_SHOPLIST(state,payload){
        state.shoplist = payload

    },
    REQ_SHOPCOUNT(state,payload){
        state.total = payload
    },
      //修改page
  CHANGE_PAGE(state, payload) {
    state.page = payload;
  },

}
const actions = {
    //封装一个获取分类列表的方法
    getshopaction(context){
        getshopList({
            size: context.state.size, //每一页显示的条目
            page: context.state.page,
          }).then(res=>{
            console.log(res)
            if(res.code==200){
                let list = res.list ? res.list : []
        //情景判断，如果当前page>1并且数组的长度为0page--
        if(context.state.page>1&&list.length==0){
          context.state.page--
          context.dispatch('getshopaction')
          return
        }
        context.commit('REQ_SHOPLIST', res.list)

            }
        })

    },
    //封装一个总条数
    getcountaction(context){
        getshopCount().then(res=>{
            if(res.code==200){
                
                context.commit('REQ_SHOPCOUNT', res.list[0].total)
            }
            
        })

    },
    //切换页码的行动
    changePageAction(context, payload) {
        // console.log("行动");
        //修改page 并重新调取列表
        //  context.state.page = payload
        //修改state 就要用mutation
        context.commit("CHANGE_PAGE", payload);
        context.dispatch("getshopaction");
      },
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}