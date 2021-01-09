var express = require("express");

// 1. 创建一个路由器
var router = express.Router()

// 引入核心模块，创建用户，操作mongoose数据库
var user = require("./mongooseuser")

var jobs = require("./mongoosejobs")

var recomds = require("./mongooserecomds");

var role = require("./mongooserole")

var jobRecord = require("./mongoosejobsrecord")

var recomdRecord = require("./mongooserecomdsrecord")
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

// 处理验证所有用户查询请求
router.get("/queryUser", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    user.find((err, result) => {
        if (err) {
            console.log("query AllUsers Error")
        } else {
            res.send(result)
        }
    })
})

// 处理验证特定用户查询请求
router.get("/queryUserByUsername", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取请求用户名
    const { username } = req.query
    console.log(username)
    // 查询
    user.find({ username }, (err, result) => {
        if (err) {
            console.log("query UsersByUseranme Error")
        } else {
            console.log("query UsersByUseranme Success")
            res.send(result)
        }
    })
})


// 处理新增用户请求
router.get("/addUser", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取用户名，密码，roleType值
    const { username, password, realname, email, phoneNumber, depart, id, roleType } = req.query
    // 新增内部招聘职位
    new user({
        username,
        password,
        realname,
        roleType,
        email,
        phoneNumber,
        depart,
        id
    }).save((err) => {
        if (err) {
            console.log(" add new user failed");
        } else {
            console.log("add new user ok");
            res.send("Add new User OK")
        }
    })
})

// 处理重置用户名密码请求
router.get("/resetPasswd", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取id值和密码
    const { _id, password } = req.query
    // 执行更新操作
    user.findByIdAndUpdate(_id, { password }, (err) => {
        if (err) {
            console.log("reset Password Failed")
            res.send("reset Password Failed")
        } else {
            console.log("reset Password Success")
            res.send("reset Password Success")
        }
    })
})

// 处理删除用户请求
router.get("/deleteUser", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取id值
    const { _id } = req.query
    // console.log(req.query,_id)
    // 执行删除操作
    user.findByIdAndDelete(_id, (err) => {
        if (err) {
            console.log("delete User Failed")
            res.send("delete User Failed")
        } else {
            console.log("delete User Success")
            res.send("delete User Success")
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

// 处理根据关键字职位名返回内部招聘职位查询请求
router.get("/jobsByPosition", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取职位关键字
    const {positionName}=req.query
    const positionNameRegExp=new RegExp(positionName)
    console.log(positionNameRegExp)
    // 查找并返回所有jobs数据;
    jobs.find({
        position:positionNameRegExp
    },(err, result) => {
        if (err) {
            console.log("query jobsByPosition error");
            res.send("failed")
        } else {
            console.log("query jobsByPosition success");
            res.send(result)
        }
    })
})

// 处理根据内部招聘部门返回招聘职位查询请求
router.get("/jobsFindByDepart", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 接收传送过来的depart
    const { depart } = req.query
    // 查找并返回符合招聘部门的职位
    jobs.find({ depart }, (err, results) => {
        if (err) {
            console.log("query Jobs by Depart error");
            res.send("failed")
        } else {
            console.log("query Jobs by Depart success");
            res.send(results)
        }
    })
})


// 处理新增内部招聘职位请求
router.get("/jobsAdd", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 识别传过来的id值
    const { depart, position, salary, address } = req.query
    console.log(req.query);
    // 新增内部招聘职位
    new jobs({
        depart,
        position,
        salary,
        address
    }).save((err) => {
        if (err) {
            console.log(" add jobs failed");
        } else {
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
            console.log("delete jobs error");
            res.send("failed")
        } else {
            console.log("delete jobs okay");
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

// 处理根据关键字职位名返回内部推荐职位查询请求
router.get("/recomdsByPosition", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取职位关键字
    const {positionName}=req.query
    const positionNameRegExp=new RegExp(positionName)
    console.log(positionNameRegExp)
    // 查找并返回所有jobs数据;
    recomds.find({
        position:positionNameRegExp
    },(err, result) => {
        if (err) {
            console.log("query recomdsByPosition error");
            res.send("failed")
        } else {
            console.log("query recomdsByPosition success");
            res.send(result)
        }
    })
})



// 处理根据内部推荐部门返回推荐职位查询请求
router.get("/recomdsFindByDepart", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 接收传送过来的depart
    const { depart } = req.query
    // 查找并返回符合招聘部门的职位
    recomds.find({ depart }, (err, results) => {
        if (err) {
            console.log("query Recomds by Depart error");
            res.send("failed")
        } else {
            console.log("query Recomds by Depart success");
            res.send(results)
        }
    })
})

// 处理新增内部推荐职位请求
router.get("/recomdsAdd", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 识别传过来的id值
    const { depart, position, salary, address } = req.query
    console.log(req.query);
    // 新增内部招聘职位
    new recomds({
        depart,
        position,
        salary,
        address
    }).save((err) => {
        if (err) {
            console.log("add recomds failed");
        } else {
            console.log("add recommds success");
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

// 处理用户角色查询请求
router.get("/queryRole", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 查询用户角色 
    role.find((err, result) => {
        if (err) {
            console.log("query role falied");
            res.send('query role failed')
        } else {
            console.log("query role success");
            res.send(result)
        }
    })
})

// 处理验证特定用户角色查询请求
router.get("/queryRoleByRoleType", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取请求用户名
    const { roleType } = req.query
    console.log(roleType)
    // 查询
    role.find({ roleType }, (err, result) => {
        if (err) {
            console.log("query queryRoleByRoleType Error")
        } else {
            console.log("query queryRoleByRoleType Success")
            res.send(result)
        }
    })
})


// 处理用户角色新增保存请求
router.get("/addRole", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取req请求值内容并保存
    console.log(req.query);
    const { roleType, menu, author } = req.query
    new role({
        roleType,
        menu,
        author
    }).save((err) => {
        if (err) {
            console.log("add Role failed");
            res.send("add role failed")
        } else {
            console.log("add Role success");
            res.send("add role success")
        }
    })
})

// 处理用户角色删除请求
router.get("/deleteRole", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    const { _id } = req.query
    console.log(req.query)
    role.findByIdAndDelete(_id, (err, result) => {
        if (err) {
            console.log("delete roleType error");
            res.send("delete roleType failed")
        } else {
            console.log("delete roleType success");
            res.send("delete roleType success")
        }
    })
})

// 处理用户角色权限新增提交请求
router.get("/modifyRole", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取req请求值内容并保存
    console.log(req.query);
    const { menu, _id } = req.query;
    role.findByIdAndUpdate(_id, { menu: menu }, (err, result) => {
        if (err) {
            console.log("modify roleType error");
            res.send("modifle roleType failed")
        } else {
            console.log("modify roleType success");
            res.send("modifle roleType ok")
        }
    })

}
)

// 处理应聘职位新增请求
router.get("/addJobsRecord", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取req请求值内容并保存
    console.log(req.query);
    const { position, depart, staffName, staffID, staffEmail, staffNumber } = req.query
    new jobRecord({
        position,
        depart,
        staffName,
        staffID,
        staffEmail,
        staffNumber
    }).save((err) => {
        if (err) {
            console.log("add JobsRecord failed");
            res.send("add JobsRecord failed")
        } else {
            console.log("add JobsRecord success");
            res.send("add JobsRecord success")
        }
    })
})

// 处理应聘职位查询请求（判断请求用户名）
router.get("/queryJobsRecord", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取req请求值内容并保存
    console.log(req.query);
    const { currentUser } = req.query
    if (currentUser === "admin") {
        jobRecord.find((err, result) => {
            if (err) {
                console.log("query JobsRecord Failed")
                res.send("query JobsRecord Failed")
            } else {
                console.log("query JobsRecord Success")
                res.send(result)
            }
        })
    } else {
        jobRecord.find({ staffName: currentUser }, (err, result) => {
            if (err) {
                console.log("query JobsRecord Failed")
                res.send("query JobsRecord Failed")
            } else {
                console.log("query JobsRecord Success")
                res.send(result)
            }
        })
    }
})

// 处理推荐职位新增请求
router.get("/addRecomdRecord", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取req请求值内容并保存
    console.log(req.query);
    const { position, depart, recomdName, recomdEmail, recomdNumber, staffName, staffID } = req.query
    new recomdRecord({
        position,
        depart,
        recomdName,
        recomdEmail,
        recomdNumber,
        staffName,
        staffID
    }).save((err) => {
        if (err) {
            console.log("add RecomdRecord failed");
            res.send("add RecomdRecord failed")
        } else {
            console.log("add RecomdRecord success");
            res.send("add RecomdRecord success")
        }
    })
})
// 处理推荐职位查询请求
router.get("/queryRecommdRecord", (req, res) => {
    // 处理跨域请求
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 获取req请求值内容并保存
    console.log(req.query);
    const { currentUser } = req.query
    if (currentUser === "admin") {
        recomdRecord.find((err, result) => {
            if (err) {
                console.log("query recomdRecord Failed")
                res.send("query recomdRecord Failed")
            } else {
                console.log("query recomdRecord Success")
                res.send(result)
            }
        })
    } else {
        recomdRecord.find({ staffName: currentUser }, (err, result) => {
            if (err) {
                console.log("query recomdRecord Failed")
                res.send("query recomdRecord Failed")
            } else {
                console.log("query recomdRecord Success")
                res.send(result)
            }
        })
    }
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