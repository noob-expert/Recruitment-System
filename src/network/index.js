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

// 登录验证用户
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

// 查询所有用户模块
export function QueryUser(){
    return request({
        url:"/queryUser",
        method:"GET",
    })
}

// 查询特定用户模块
export function QueryUserByUsername(username){
    return request({
        url:"/queryUserByUsername",
        method:"GET",
        params:{
            username
        }
    })
}

// 新增用户模块
export function AddNewUser(username,password,realname,email,phoneNumber,depart,id,roleType){
    return request({
        url:"/addUser",
        method:"GET",
        params:{
            username,
            password,
            realname,
            email,
            phoneNumber,
            depart,
            id,
            roleType
        }
    })
}

// 重置用户名密码请求
export function ResetPasswd(_id,password){
    return request({
        url:"/resetPasswd",
        method:'GET',
        params:{
            _id,
            password
        }
    })
}

// 删除用户模块
export function DeleteUser(_id){
    return request({
        url:"/deleteUser",
        method:"GET",
        params:{
            _id
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

// 根据特定条件搜索内部推荐职位请求模块
export function JobsByPosition(positionName){
    return request({
        url:"/jobsByPosition",
        method:"GET",
        params:{
            positionName
        }
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

// 根据特定条件搜索内部推荐职位请求模块
export function RecomdsByPosition(positionName){
    return request({
        url:"/recomdsByPosition",
        method:"GET",
        params:{
            positionName
        }
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

// 角色信息查询模块queryRole
export function QueryRole(){
    return request({
        url:"/queryRole",
        method:"GET"
    })
}

// 查询特定角色信息模块
export function QueryRoleByRoleType(roleType){
    return request({
        url:"/queryRoleByRoleType",
        method:"GET",
        params:{
            roleType
        }
    })
}



// 角色信息增加模块
export function AddRole(roleType,author,menu=undefined){
    return request({
        url:"/addRole",
        method:"GET",
        params:{
            roleType,
            author,
            menu
        }
    })
}

// 角色信息删除模块
export function DeleteRole(_id){
    return request({
        url:"/deleteRole",
        method:"GET",
        params:{
            _id
        }
    })
}

// 角色信息更改模块
export function ModifyRole(_id,menu){
    return request({
        url:"/modifyRole",
        method:"GET",
        params:{
            _id,
            menu
        }
    })
}

// 新增应聘职位模块
export function addJobsRecord(position, depart, staffName, staffID, staffEmail, staffNumber){
    return request({
        url:"/addJobsRecord",
        method:"GET",
        params:{
            position, depart, staffName, staffID, staffEmail, staffNumber
        }
    })
}

// 应聘记录请求模块
export function QueryJobsRecord(currentUser){
    return request({
        url:"/queryJobsRecord",
        method:"GET",
        params:{
            currentUser
        }
    })
}

// 新增推荐职位模块
export function addRecomdRecord(position, depart, recomdName, recomdEmail, recomdNumber, staffName, staffID ){
    return request({
        url:"/addRecomdRecord",
        method:"GET",
        params:{
            position, depart, recomdName, recomdEmail, recomdNumber, staffName, staffID 
        }
    })
}

// 推荐记录请求模块
export function QueryRecomdRecord(currentUser){
    return request({
        url:"/queryRecommdRecord",
        method:"GET",
        params:{
            currentUser
        }
    })
}