// mongoos模块，模型创建与发布
var mongoose=require("mongoose");
var Schema=mongoose.Schema

// 连接数据库，必须保证mongodb服务已启动
mongoose.connect('mongodb://localhost:27017/hrusers',{useNewUrlParser:true,useUnifiedTopology:true});

// mongoose.connection.one("open",function(){}); //监听建立连接状态
// mongoose.connection.one("close",function(){}); //监听断开连接状态

// 设计用户表结构

// 设计工作职位表结构
var recomdsSchema=new Schema({
    depart:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        default:"面议"
    },
    address:{
        type:String,
        required:true,
        default:"武汉市"
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
})



// 将文档结构发布为模型，通过Schema来创建Model
module.exports=mongoose.model("Recomds",recomdsSchema)
