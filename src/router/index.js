import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

function hasUrl(url){
  return store.getters.getUserInfo.menus_url.some(item=>item===url)
}

Vue.use(VueRouter)
 //设定子路由列表 并且导出
 export const routerchild = [
  {
    path:'/menu',
    component: ()=>import('../views/menu/index.vue'),
    name:'菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu')?next():next('/home')
    }

  },
  {
    path:'/role',
    component: ()=>import('../views/row/index.vue'),
    name:'角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role')?next():next('/home')
    }

  },
  {
    path:'/manger',
    component: ()=>import('../views/manger/manger.vue'),
    name:'管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manger')?next():next('/home')
    }

  },
  {
    path:'/category',
    component: ()=>import('../views/cation/cation.vue'),
    name:'商城分类'
  },
  {
    path:'/specs',
    component: ()=>import('../views/specs/specs.vue'),
    name:'商品规格'
  },
  {
    path:'/goods',
    component: ()=>import('../views/shop/shop.vue'),
    name:'商品管理'
  },
  {
    path:'/banner',
    component: ()=>import('../views/banner/banner.vue'),
    name:'轮播图管理'
  },
  {
    path:'/user',
    component: ()=>import('../views/user/user.vue'),
    name:'会员管理'
  },
  {
    path:'/ms',
    component: ()=>import('../views/ms/ms.vue'),
    name:'秒杀管理'
  },
]

const routes = [
  {
    path: '/index',
    component: ()=>import('../pages/index.vue'),
    children:[
      {
        path:'/home',
        component:()=>import('../views/home')
      },
      ...routerchild,
      {
        path:"",
        redirect:"/home"

      }
    ]
  },
  {
    path: '/login',
    component: ()=>import('../pages/login.vue')
  },
  // {
  //   path: '*',
  //   redirect:'/login'
  // },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
    return
  }
  if(store.getters.getUserInfo){
    next()
    return
  }
  next('/login')
})

export default router
