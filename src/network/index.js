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

// 内部招聘职位请求模块
export function Jobs(){
    return request({
        url:"/jobs",
        method:"GET"
    })
}

// 根据内部招聘部门请求内部招聘职位模块
export function JobsFindByDepart(depart){
    return request({
        url:"/jobsFindByDepart",
        method:"GET",
        params:{
            depart
        }
    })
}

// 内部招聘职位新增模块
export function JobsAdd(depart,position,salary="面议",address="武汉市"){
    return request({
        url:"/jobsAdd",
        method:"GET",
        params:{
            depart,
            position,
            salary,
            address
        }
    })
}

// 内部招聘职位删除模块
export function JobsDelete(id){
    return request({
        url:"/jobsDelete",
        method:"GET",
        params:{
            id
        }
    })
}

// 内部推荐职位请求模块
export function Recomds(){
    return request({
        url:"/recomds",
        method:"GET"
    })
}

// 根据内部推荐部门请求内部推荐职位模块
export function RecomdsFindByDepart(depart){
    return request({
        url:"/recomdsFindByDepart",
        method:"GET",
        params:{
            depart
        }
    })
}

// 内部推荐职位新增模块
export function RecomdsAdd(depart,position,salary="面议",address="武汉市"){
    return request({
        url:"/recomdsAdd",
        method:"GET",
        params:{
            depart,
            position,
            salary,
            address
        }
    })
}

// 内部推荐职位删除模块
export function RecomdsDelete(id){
    return request({
        url:"/recomdsDelete",
        method:"GET",
        params:{
            id
        }
    })
}
