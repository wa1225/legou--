//这个模块用于封装所有的接口
import http from './axios'
import qs from 'qs'

/* ===========菜单管理============ */
// 封装添加接口
export function addMenu(data){
    return http.post('/api/menuadd',data)
}

//封装一个获取菜单列表接口
export function getMenuList(params){
    return http.get('/api/menulist',{
        params:{
            istree:true
        }
    })
}
// 封装编辑接口
export function editMenu(data){
    return http.post('/api/menuedit',data)
}

// 封装删除接口
export function delMenu(data){
    return http.post('/api/menudelete',data)
}

//封装一个获取一个菜单接口
export function getMenuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })
}

/* ===========角色管理============ */
//封装一个角色添加
export function addRoleadd(data){
    return http.post('/api/roleadd',data)
}
//封装一个获取角色列表接口
export function getRowlist(){
    return http.get('/api/rolelist')
}
// 封装角色编辑接口
export function rowlist(data){
    return http.post('/api/roleedit',data)
}

// 封装角色删除接口
export function delRow(data){
    return http.post('/api/roledelete',data)
}

//封装一个获取一个角色接口
export function getRow(params){
    return http.get('/api/roleinfo',{
        params
    })
}


/* ===========管理员管理============ */
//封装一个管理员添加
export function addManger(data){
    return http.post('/api/useradd',data)
}
//封装一个获取管理员列表(分页)接口
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}
// 封装编辑接口
export function editUser(data){
    return http.post('/api/useredit',data)
}

// 封装删除接口
export function delUser(data){
    return http.post('/api/userdelete',data)
}

//封装一个获取一个管理员接口
export function getUserInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}

//封装一个获取管理员总条数接口
export function getUserCount(){
    return http.get('/api/usercount')
}

//封装一个管理员登录
export function userLogin(data){
    return http.post('/api/userlogin',qs.stringify(data))
}


/* ===========商品分类管理============ */

//商品分类添加
export function cateAdd(data){
    return http.post('/api/cateadd',data)
}

//商品分类列表
export function getcatelist(params){
    return http.get('/api/catelist?istree=true')
}

//商品分类获取（一条）
export function getcateinfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}

//商品分类修改
export function cateedit(data){
    return http.post('/api/cateedit',data)
}


//商品分类删除
export function catedelete(data){
    return http.post('/api/catedelete',data)
}


        /* 商品规格管理接口 */
//商品规格添加
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}

//商品规格总数（用于计算分页）
export function getSpecsCount(){
    return http.get('/api/specscount')
}



/* ===========商品管理============ */
//商品添加
export function goodsshopAdd(data){
    return http.post('/api/goodsadd',data)
}
//商品总数（用于计算分页）
export function getshopCount(){
    return http.get('/api/goodscount')
}

//商品列表（分页）
export function getshopList(params){
    return http.get('/api/goodslist',{
        params
    })
}

//商品获取（一条）
export function getshopInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}

//商品修改
export function getshopEdit(data){
    return http.post('/api/goodsedit',data)
}

//商品删除
export function getshopDel(data){
    return http.post('/api/goodsdelete',data)
}


/* ===========轮播图管理============ */

//轮播图添加
export function bannerAdd(data){
    return http.post('/api/banneradd',data)
}
//轮播图列表
export function bannerList(){
    return http.get('/api/bannerlist')
}

//轮播图获取（一条）
export function bannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
//轮播图修改
export function bannerEdit(data){
    return http.post('/api/banneredit',data)
}
//轮播图删除
export function bannerDel(data){
    return http.post('/api/bannerdelete',data)
}

/* ===========会员管理============ */
//获取会员列表
export function userList(){
    return http.get('/api/memberlist')
}
//获取一条会员
export function userInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
//会员修改
export function userEdit(data){
    return http.post('/api/memberedit',data)
}

/* 限时秒杀管理接口 */
//封装限时秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
//封装限时秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
//封装限时秒杀修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
//封装限时秒杀删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}
