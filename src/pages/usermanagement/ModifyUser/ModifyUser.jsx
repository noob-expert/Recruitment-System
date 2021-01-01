import React, { Component } from 'react'

import PropTypes from "prop-types"

import PubSub from "pubsub-js"

import {ResetPasswd} from "../../../network/index"

import "./ModifyUser.less"

import {message} from "antd"

export default class ModifyUser extends Component {
    // 声明props
    static propTypes={
        isModifyUser:PropTypes.string.isRequired,
        selectedRows:PropTypes.array
    }

    // 声明state
    state={
        isModifyUser:this.props.isModifyUser,
    }

    // 生命周期函数动态监控传入的props
    componentWillReceiveProps(nextProps){
        this.setState({
            isModifyUser:nextProps.isModifyUser
        })
    }

    // 处理取消按钮
    handleModifyUserCancel=()=>{
        this.setState({
            isModifyUser:"none"
        })
        PubSub.publish("restoreModifyUser")
    }

    // 处理确认重置按钮
    handleModifyUserSubmit=async()=>{
        // console.log(this.props.selectedRows);
        // console.log(this.password.value);
        const _id=this.props.selectedRows[0].key;
        const password=this.password.value;
        const result=await ResetPasswd(_id,password)
        if(result.status===200){
            message.success("重置密码成功")
            this.password.value=''
            this.setState({
                isModifyUser:"none"
            })
            PubSub.publish("restoreModifyUser")
            PubSub.publish("QueryAllUsers")
        }
    }

    render() {
        // console.log(this.props.isModifyUser);
        const {isModifyUser}=this.state
        // console.log(isModifyUser);
        return (
            <div className="ModifyUser" style={{display:isModifyUser}}>
                用户名:<input type="text" placeholder={this.props.selectedRows.length===0?'':this.props.selectedRows[0].username} disabled/><br />
                密码：<input type="password" ref={input=>{this.password=input}}/><br />
                <button onClick={this.handleModifyUserCancel}>取消</button>
                <button onClick={this.handleModifyUserSubmit}>确认重置</button>
            </div>
        )
    }
}
