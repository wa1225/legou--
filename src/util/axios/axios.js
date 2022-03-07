
import axios from 'axios'
import router from '../../router'
import store from '../../store'

let http = axios.create({
     baseURL:'',//基础地址
    // timeout:  //超时控制
})

//axios拦截器
//请求拦截器 ——interceptors
http.interceptors.request.use((req)=>{
    // req.headers.authorization = JSON.parse(sessionStorage.getItem('userinfo')).token
    // req.headers.authorization = sessionStorage.getItem('userinfo')?JSON.parse(sessionStorage.getItem('userinfo')).token:''
    req.headers.authorization = sessionStorage.getItem('userinfo')?JSON.parse(sessionStorage.getItem('userinfo')).token :''
    return req
})

http.interceptors.response.use((res)=>{
    if(res.data.code==403){
        alert(res.data.msg)
        router.push('/login')

    }
    return res.data
})


export default http
