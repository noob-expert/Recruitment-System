import React, { Component } from 'react'

// 引入css样式
import Style from "./ProfileInfo.module.css"

// 引入发布订阅
import PubSub from "pubsub-js"

// 引入本地localStorage
import methods from "../../../utils/storageUtils"

//引入查询用户请求
import { QueryUserByUsername} from "../../../network/index"

// 引入头像
import userHeader from "../../../assets/image/user-header.jpg"


export default class ProfileInfo extends Component {
    state={
        usersInfo:[]
    }

    // 请求用户信息
    GetUserInfo=async()=>{
        const username = methods.getUser()
        const result = await QueryUserByUsername(username);
        PubSub.publish("getUserDetail",result.data)
        this.setState({
            usersInfo:result.data
        })
    }

    // 生命周期内请求用户信息
    componentDidMount(){
        this.GetUserInfo();
    }

    render() {
        // console.log(this.state.usersInfo);
        const {usersInfo}=this.state
        // console.log(usersInfo);
        if(usersInfo.length!==0){
            var {email,username,realname,phoneNumber,depart,id}=usersInfo[0]
        }else{
            var email,username,realname,phoneNumber,depart,id=''
        }
        // var email='123'
        return (
            <div className={Style.profileinfo}>
                <img src={userHeader} alt=""/>
                <div className={Style.username}>{realname}</div>
                <div className={Style.userinfo}>
                    <div><span>电子信箱:</span>{email}</div>
                    <div><span>用户名:</span>{username}</div>
                    <div><span>联系电话:</span>{phoneNumber}</div>
                    <div><span>所属部门:</span>{depart}</div>
                    <div><span>推荐理由:</span></div>
                    <div><span>员工编号:</span>{id}</div>
                </div>
            </div>
        )
    }
}
