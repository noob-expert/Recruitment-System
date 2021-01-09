import React, { Component } from 'react'

// 从antd中引入tabs
import { Tabs,message } from "antd";

// 引入css样式
import "./basicinfo.less"

// 引入本地localStorage
import methods from "../../utils/storageUtils"

//引入查询用户请求
import { QueryUserByUsername,ResetPasswd} from "../../network/index"

// 引入发布订阅
import PubSub from "pubsub-js"

// 引入子组件
import ProfileInfo from "./ProfileInfo/ProfileInfo"

// 进入img
import AccountBind from "../../assets/image/AccountBind.jpg"


const { TabPane } = Tabs;

export default class BasicInfo extends Component {
    state = {
        userInfo:{},
        oldPasswd: '',
        newPasswdFirst: '',
        newPasswdSecond: ''
    }

    // 请求用户信息
    GetUserInfo=async()=>{
      const username = methods.getUser()
      const result = await QueryUserByUsername(username);
      PubSub.publish("getUserDetail",result.data)
        this.setState({
            userInfo:result.data[0]
            })
        }
    
    // 生命周期内请求用户信息
    componentDidMount(){
            this.GetUserInfo();
            
        }

    // 定义tabs onChange函数
    callback = (key) => {
        // console.log(key);
    }

    // 定义原密码输入函数
    handleOldPasswdInput = (e) => {
        this.setState({
            oldPasswd:e.target.value
        })
    }

    // 定义新密码输入函数
    handleNewPasswdFirstInput = (e) => {
        this.setState({
            newPasswdFirst:e.target.value
        })
    }

    // 定义第二次密码输入函数
    handleNewPasswdSecondInput = (e) => {
        this.setState({
            newPasswdSecond:e.target.value
        })
    }

    changePasswdSave=async()=>{
        const {oldPasswd,userInfo,newPasswdFirst,newPasswdSecond}=this.state;
        // console.log(oldPasswd,userInfo,newPasswdFirst,newPasswdSecond);
        if(oldPasswd!==userInfo.password){
            message.error("原密码错误，请重新输入")
        }else if(newPasswdFirst!==newPasswdSecond){
            message.error("两次密码输入不符合，请重新输入")
        }else{
            console.log("开始改密码");
            const result=await ResetPasswd(userInfo._id,newPasswdFirst);
            // console.log(result);
            message.success("修改密码成功");
            this.setState({
                oldPasswd: '',
                newPasswdFirst: '',
                newPasswdSecond: ''
            })
        }
    
    }


    render() {
        const { oldPasswd, newPasswdFirst, newPasswdSecond } = this.state
        return (
            <div className="myProfile123">
                <div className="tab">
                    <Tabs defaultActiveKey="1" onChange={this.callback}
                        centered='true'>
                        <TabPane tab="个人信息" key="1"
                            style={{ position: 'relative' }}>
                            <ProfileInfo />
                        </TabPane>
                        <TabPane tab="账号绑定" key="2">
                            {/* <img src={AccountBind} alt="" className='accountBind'/> */}
                            <div className="accountBind-top">绑定后，你可以同时使用以下方式登录</div>
                            <div className="accountBind-bottom">微信账号为空，请绑定微信号</div>
                    </TabPane>
                        <TabPane tab="修改密码" key="3">
                            <div className="passwd">原密码: <input type="password" placeholder="请输入原密码" value={oldPasswd} onChange={this.handleOldPasswdInput} /></div>
                            <div className="passwd">新密码: <input type="password" placeholder="请输入新密码" value={newPasswdFirst} onChange={this.handleNewPasswdFirstInput} /></div>
                            <div className="passwd">确认密码: <input type="password" placeholder="请输入确认密码" value={newPasswdSecond} onChange={this.handleNewPasswdSecondInput} /></div>
                            <button onClick={this.changePasswdSave}>保存</button>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
