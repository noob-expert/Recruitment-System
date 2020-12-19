var express=require("express");

// 1. 创建一个路由器
var router=express.Router()

// 引入核心模块，创建用户，操作mongoose数据库
var user=require("./mongoose")

// 新增数据并实例化，验证成功
// new user({
//     username:"admin",
//     password:"1234"
// })
// .save((err)=>{
//     if(!err){
//         console.log("save success");
//     }
// })

// 2. 把路由挂载到router路由器中
router.get("/",(req,res)=>{
// 查询数据
user.find((err,result)=>{
    if(err){
        console.log("query error");
    }else{
        // console.log(result);
        res.send(result[0]["username"])
    }
})
   
})





// 3. commonJS语法暴露router；备注：有2种方式暴露，exports和module.exports
module.exports=router