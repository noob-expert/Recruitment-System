// mongoos模块，模型创建与发布
var mongoose = require("mongoose");
var Schema = mongoose.Schema

// 连接数据库，必须保证mongodb服务已启动
mongoose.connect('mongodb://localhost:27017/hrusers', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.one("open",function(){}); //监听建立连接状态
// mongoose.connection.one("close",function(){}); //监听断开连接状态

// 设计用户角色管理表结构
var roleSchema = new Schema({
    // key:{
    //         type:String,
    //         required:true
    //     },
    roleType: {
        type: String,
        required: true
    },
    menu: {
        type: Array,
        required: true,
        default: []
    },
    createTime: {
        type: String,
        default: new Date(Date.now()).getFullYear() + '-' + (new Date(Date.now()).getMonth() + 1) + "-" + new Date(Date.now()).getDate()
    }
});


// 将文档结构发布为模型，通过Schema来创建Model
module.exports = mongoose.model("Role", roleSchema)
