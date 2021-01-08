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
--左侧表单箭头，可以利用iconfont等图标，或伪元素的方式实现（写入踩坑笔记）
-- 导航菜单栏动态显示方法（menuConfig.js文件）
-- 天气情况通过JSONP请求调用 ,时间通过格式化日期调用，同时在生命周期函数中，动态显示事件，天气与方法
-- Vue和React中禁止eslint方法（写入踩坑笔记）
-- 退出登录功能，借助antd里的modal组件函数，点击OK后依次清除数据并跳转（this问题)；注意：要在卸载生命周期时清除定时器函数
-- JS如何判断对象为空问题???
2. 路由设计和默认界面设置（Redirect To）
3. 重难点：菜单列表的动态设计。封装到数组中，通过map遍历和递归调用（我的项目组没有用到）
4. 内部招聘和内部推荐界面设计
-- 在实现职位获取的前后端交互时, 遍历职位列表时，forEach无返回值不能设置return，map有返回值可以设置return(写入踩坑笔记)
-- 关于分页效果等，可利用ant-d UI组件库的table组件来实现--研究下，可以2个界面分别为手动和ant-d
-- table组件真香！！！！！！！ 另外，修改内部.ant-table的样式方法（写入踩坑笔记）
-- 所属机构展示时数组的去重，利用new Set();-(写入踩坑笔记)
-- 以及优化：所属机构默认一部分，当有新增时也会显示添加？？算是吧
-- 点击所属机构时返回对应职位列表
-- 展开所有部门的功能实现，checked属性来实现,非常依赖~，只能选择后面的,为什么不支持父级选择器/前面的兄弟选择器等，这里略坑啊。。。-(写入踩坑笔记)
-- componentWillMount和componentDidMount的区别？？？
1. 职位管理界面设计
-- 在jsx中遍历绑定事件时，应该采用 map（写入踩坑笔记）
如何向事件回调函数中传递参数？？？：先定义一个匿名函数，在函数中调用处理的函数并传入数据
<td><button onClick={()=>this.recommdsDelete(item._id)}>删除</button></td> 
而不是 <td><button onClick={this.recommdsDelete(item._id)}>删除</button></td> --渲染时会被直接调用
-- 受控组件与非受控组件的2种实现方式，不错；思考：设置默认值的2种方式？
-- 点击添加职位后，刷新界面的2种方式，1种是直接基于原状态更新[...,sss],另外1种是重新请求界面；哪种好些？？
-- 添加和修改界面的实现，利用modal组件，visiable设置为1个值即可
--遗留问题：每次点击新增、删除等时的页面刷新问题，和滚动区域问题，样式问题（待解决后写入踩坑笔记）--在生命周期函数中发布订阅
-- 遗留问题：// timeout:5000  开启后职位管理界面会卡死？

2. 角色管理界面设计
--card 组件设计
--在引入的子组件上，无法直接设置CSS样式？？？需要props传入display值？--（确认后计入踩坑笔记）
-- 子组件中，props的值如何修改，readOnly??除了传递到state之外（写入踩坑笔记）
-- 在使用react是，常常需要在一个组件传入的props更新时重新渲染该组件，常用的方法是在componentWillRecevieProps中将新的props更新到组件的state中（这种state被称为派生状态），从而实现重新渲染;
componentWillReceiveProps(nextProps){
    this.setState({
        user:nextProps.user
    })
}
--在子组件中点击新增属性后并成功后，重新调用父组件中的角色请求函数：采用事件发布和订阅方式，（写入踩坑笔记）
--BUG：点击单选框后，新增组件再次显示出来；解决：在父组件中定义使isAdd/ModifyRole变为none的方法，然后发布订阅，在子组件中每次点击取消或确认后重新调用--（写入踩坑笔记）
-- button设置disable样式的方法，和根据是否勾选显示
--React中useState的用法,和Reac Hook的使用
--

3. 用户管理界面设计
--基本原理和角色管理界面设计相似
-- 如何获取到select选中的值?--(写入踩坑笔记)
--A component is changing an uncontrolled input of type text to be controlled.返错的原因（默认为空）和解决方案

4. 菜单权限管理界面
menu
递归
--2个await，先根据用户名查询角色权限，再根据角色权限查询角色

5. 个人中心界面
--button标签，设置完圆角后点击输入框会显示黑色border
-- 个人信息界面，水平居中的方法，margin:xxx auto
--- 请求到数据后，setstate异步加载的问题，先存到数据组中
--- React是单向数据流，只能由父组件传递子组件数据；子组件可以通过调用父组件的方法来向父组件传递数据；或者通过发布订阅的模式

6. 点击我要应聘按钮
--如何获取当前点击行的职位信息(写入踩坑笔记)
 // column API里面的render可以传入参数，生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引

7. 点击我要推荐按钮
--如何获取当前点击行的职位信息(写入踩坑笔记)
--// column API里面的render可以传入参数，生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
--把text放入state属性中，在点击ok后提取确认

8. 应聘记录和推荐记录的分权分域功能
--在后端处理应聘/推荐职位查询请求时处理，如果是admin，则返回左右，如果不是，则find并返回匹配对应的内容
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
