
import axios from "axios"

// 方式一：定义网络请求根实例
export function request(config){
    const instance=axios.create({
        baseURL:"http://localhost:3001/",
        // timeout:5000
    })
    // instance(config)本身就是一个promise，所以直接return返回它即可
    return instance(config)
}


// 方式二：能发送异步ajax请求的模块,封装axios库，返回的值是promise对象
export function ajax(url,data={},type="GET"){
    if(type === "GET"){
        return axios.get(url,{
            params:data
        })
    }else if(type==="POST"){
        return axios.post(url,data)
    }
}