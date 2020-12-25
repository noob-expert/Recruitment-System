var express = require("express");

// 1. 创建一个路由器
var router = express.Router()

// 引入核心模块，创建用户，操作mongoose数据库
var user = require("./mongooseuser")

var jobs = require("./mongoosejobs")

var recomds = require("./mongooserecomds")

// 新增数据并实例化，验证成功
// new user({
//     username:"admin",
//     password:"admin"
// })
// .save((err)=>{
//     if(!err){
//         console.log("save success");
//     }
// })

// new jobs({
//     depart:"烽火网络",
//     position:"软件应用工程师"
// }).save()

// new recomds({
//     depart:"烽火技服",
//     position:"网络支持工程师"
// }).save()

// console.log("connect db success");


// 2. 把路由挂载到router路由器中

// --处理验证用户登录请求
router.get("/login", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    const { username, password } = req.query
    // 查找某个数据;
    user.findOne({ username, password }, (err, result) => {
        if (err) {
            console.log("query users error");
        } else {
            // console.log(result);
            res.send(result)
        }
    })
})

// 处理返回内部招聘职位查询请求
router.get("/jobs", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 查找并返回所有jobs数据;
    jobs.find((err, result) => {
        if (err) {
            console.log("query jobs error");
            res.send("failed")
        } else {
            // console.log(result);
            res.send(result)
        }
    })
})

// 处理新增内部招聘职位请求
router.get("/jobsAdd", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 识别传过来的id值
    const { depart,position,salary,address } = req.query
    console.log(req.query);
    // 新增内部招聘职位
    new jobs({
        depart,
        position,
        salary,
        address
    }).save((err)=>{
        if(err){
            console.log(" add jobs failed");
        }else{
            console.log("jobs add ok");
            res.send("Add Jobs OK")
        }
    })
})



// 处理返回内部招聘职位删除需求
router.get("/jobsDelete", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 识别传过来的id值
    const { id } = req.query
    // 查找并返回所有jobs数据;
    jobs.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err) {
            console.log("delete error");
            res.send("failed")
        } else {
            console.log("12345");
            res.send("delete okay")
        }
    })
})

// 处理返回内部推荐职位查询请求
router.get("/recomds", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 查找并返回所有jobs数据;
    recomds.find((err, result) => {
        if (err) {
            console.log("query recomds error");
            res.send("failed")
        } else {
            // console.log(result);
            res.send(result)
        }
    })
})

// 处理新增内部推荐职位请求
router.get("/recomdsAdd", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 识别传过来的id值
    const { depart,position,salary,address } = req.query
    console.log(req.query);
    // 新增内部招聘职位
    new recomds({
        depart,
        position,
        salary,
        address
    }).save((err)=>{
        if(err){
            console.log("add recomds failed");
        }else{
            console.log("123");
            res.send("Add Recommds OK")
        }
    })
})



// 处理返回内部推荐职位删除需求
router.get("/recomdsDelete", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 识别传过来的id值
    const { id } = req.query
    console.log(id);
    // 查找并删除匹配的数据;
    recomds.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err) {
            console.log("delete error");
            res.send("delete failed")
        } else {
            console.log("delete ok");
            res.send("delete okay")
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
module.exports = router