import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import goodcation from './modules/goodcation'
import goodspecs from './modules/goodspecs'
import goodshop from './modules/goodshop'
import goodbanner from './modules/goodbanner'
import gooduser from './modules/gooduser'
import goodms from './modules/goodms'
export default new Vuex.Store({
  state: {
    userinfo: sessionStorage.getItem('userinfo')? JSON.parse(sessionStorage.getItem('userinfo')):null,
  },
  getters:{
    getUserInfo(state){
      return state.userinfo;
    }

  },
  mutations: {
    CCHANG_UESR(state,payload){
      if(payload){
        state.userinfo = payload
        sessionStorage.setItem('userinfo',JSON.stringify(payload))
      }else{
        sessionStorage.removeItem('userinfo')
      }
    }
  },
  actions: {
    changuseraction({commit},payload){
      commit('CCHANG_UESR',payload)
      

    }
  },
  modules: {
    goodcation,
    goodspecs,
    goodshop,
    goodbanner,
    gooduser,
    goodms
  }
})
