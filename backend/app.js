// 加载核心模块
var express=require("express")
// 在express中获取表单POST请求体数据需要使用body-parse模块
var bodyParser=require("body-parser")

// 创建服务器应用程序
var app=express();

// 静态资源服务（这里暂不设置）

// 解析表单post请求体
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 引入并使用路由模块router.ks
var router=require("./router")
app.use(router)

// 监听端口
app.listen(3001,()=>{
    console.log("server is running");
})