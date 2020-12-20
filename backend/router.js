var express=require("express");

// 1. 创建一个路由器
var router=express.Router()

// 引入核心模块，创建用户，操作mongoose数据库
var user=require("./mongoose")

console.log("connect db success");
// 新增数据并实例化，验证成功
// new user({
//     username:"admin@fiberhome.com",
//     password:"admin"
// })
// .save((err)=>{
//     if(!err){
//         console.log("save success");
//     }
// })

// 2. 把路由挂载到router路由器中
router.get("/login",(req,res)=>{
// 处理跨域请求
res.setHeader("Access-Control-Allow-Origin","*")

const {username,password} = req.query

// 查找某个数据;
user.findOne({username,password},(err,result)=>{
    if(err){
        console.log("query error");
    }else{
        // console.log(result);
        res.send(result)
    }
}) 
})


// 处理POST请求有问题，后台没有
// router.post("/login",(req,res)=>{
//     // 处理跨域请求
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
//     console.log(req);
//     // 查询数据
//     user.find((err,result)=>{
//         if(err){
//             console.log("query error");
//         }else{
//             // console.log(result);
//             res.send(JSON.stringify(result))
//         }
//     }) 
//     })



// 3. commonJS语法暴露router；备注：有2种方式暴露，exports和module.exports
module.exports=router