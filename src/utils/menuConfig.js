// 动态显示导航菜单配置

const menuList = [
    {
        title: "内部推荐",//菜单标题名称
        key: "/Recommend" //对应的path
    },
    {
        title: "内部招聘",//菜单标题名称
        key: "/Recruit" //对应的path
    },
    {
        title: "个人中心",//菜单标题名称
        key:"/profile",
        isPublic:true,
        children: [
            {
                title: "基本信息",
                key: "/BasicInfo"
            },
            {
                title: "投递记录",
                key: "/RecordRecru"
            },
            {
                title: "推荐记录",
                key: "/RecordRecom"
            }
        ]
    },
    {
        title: "用户管理",//菜单标题名称
        key: "/user" //对应的path
    },
    {
        title: "角色管理",//菜单标题名称
        key: "/role" //对应的path
    },
    {
        title: "职位管理",//菜单标题名称
        key:"/jobManagement",
        children: [
            {
                title: "内部推荐",
                key: "/jobRecom"
            },
            {
                title: "内部招聘",
                key: "/jobRecruit"
            }
        ]
    }
]

export default menuList;