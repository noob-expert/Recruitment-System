// 定义封装各个接口请求模块
import {request} from "./request"

// 登录模块，处理POST请求有问题，待解决
export function LoginPOST(username,password){
    return request({
        url:"/login",
        method:"POST",
        data:{
            username,
            password
        }
    })
}


export function Login(username,password){
    return request({
        url:"/login",
        method:"GET",
        params:{
            username,
            password
        }
    })
}
// 用户添加模块