<!-- !!!!项目应用开发笔记!!!! -->

<!--一、项目准备 -->
<!--
1. 项目介绍
2. 技术选型
3. 前端路由
4. API/接口
 -->

 <!-- 二. 环境搭建与验证 -->
<!-- 
1.脚手架搭建项目，初始化环境 ，git管理
-- 脚手架搭建
-- npm start验证
2.服务器后台搭建，初始化app.js及路由管理 
--express框架下载+body-parser解析post请求模块下载
--app.js和router.js初始化
--nodemon app.js验证
1. mongodb数据库和mogoose模块引入，使用node操作mondogb数据库
-- mongodb下载启动服务
-- mongoose模块下载
-- 初始化环境
-- 操作数据库验证
4. 前后台简单交互验证 
-- axios请求封装
-- 注意：可能会碰到跨域请求返错，需要在后端设置:--可以总结记入踩坑笔记
res.setHeader("Access-Control-Allow-Origin","*")
除此之外，还有JSONP，HTTP Proxy代理的方式，需要知晓
5. 基本目录设计,normalize.css样式管理
6. 引入antd(可选,按需引入样式（优化，可记录笔记）和自定义主题)，引入router路由管理
 -->

 <!-- 三. 项目login模块设计及开发 -->
<!--
1. 静态界面设计，引入antd From表单样式
--如何使该背景图片大小也实现响应式 ？?--问题
--原网站优化：输入邮箱时校验是否为邮箱

2. 难点：表单验证（规则的声明式验证rules+自定义验证validator，和点击提交时验证；）
可继续搜索其他普通实现方式，并总结计入笔记

3. 重点：表单数据收集 ()
4. 表单提交 (POST请求，携带请求体参数)
--后台处理POST请求有问题，待修复；暂时先使用GET请求，并且可以实现校验的功能
5. 前后台交互：
API文档（平台接口+应用接口）
容联云通讯平台短信发送接口
postman工具测试接口（需下载）
ajax/axios网络请求模块封装,后台返回的是JSON数据
跨域请求处理方式
优化：async/await优化请求模块，以同步编码方式实现异步流程，不再使用then来解析！--注意catch捕获异常
优化：异常的统一处理：在封装请求模块时即进行捕获，新建Promise对象，使用antd的message.error来获取
登录请求成功：message.success，然后跳转到管理界面：this.props.history.replace()
重难点：维持用户登录与自动登录的实现：localStorage方式 -- 放在untils中
-->

<!-- 四. 项目admin模块设计及开发  -->
<!-- 
1. 界面布局设计--antd组件或自行设计
--局部样式的实现（记录踩坑笔记）
Vue中局部CSS样式通过scoped；
在React中，(必须使用类选择器)，可以通过将css/less/scss等文件命名为xxx.module.css，然后引入时需要使用import styles(自定义) from "...scss'，使用时要这样写：className={styles.container}

2. 路由设计和默认界面设置（Redirect To）
3. 重难点：菜单列表的动态设计。封装到数组中，通过map遍历和递归调用
 -->



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
