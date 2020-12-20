// 用来进行local数据存储管理的工具模块

// import store from "store"; --该库兼容性更好些

const USER_KEY="user_key"

export default{
    // 保存用户信息
    saveUser(user){
        localStorage.setItem(USER_KEY,JSON.stringify(user))
        // store.set(USER_KEY,user)--兼容性更好些
    },
    // 读取用户信息
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        // return store.get(USER_KEY)||{} --兼容性更好些
    },
    // 删除用户信息
    removeUser(){
        localStorage.removeItem(USER_KEY)
        // store.remove(USER_KEY) --兼容性更好些
    }
}