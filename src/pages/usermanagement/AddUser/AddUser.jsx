import React, { Component } from 'react'

// 引入请求模块
import { AddNewUser, QueryRole } from "../../../network/index"

// 引入props
import PropTypes from "prop-types"

// 引入发布订阅
import PubSub from "pubsub-js"

// 引入antd
import {message} from "antd"

// 引入CSS
import "./AddUser.less"

export default class AddUser extends Component {
    // 声明props
    static propTypes = {
        isAddUser: PropTypes.string.isRequired
    }

    // 声明state
    state = {
        isAddUser: this.props.isAddUser,
        username: '',
        pasword: '',
        allRoleType: []
    }

    // 声明周期动态监控props
    componentWillReceiveProps(nextProps) {
        this.setState({
            isAddUser: nextProps.isAddUser
        })
    }

    // 请求所有角色权限
    QueryAllRoles = async () => {
        const result = await QueryRole();
        // console.log(result);
        this.setState({
            allRoleType: result.data
        })
    }

    // 生命周期请求传入allRoleTypes
    componentDidMount() {
        this.QueryAllRoles()
    }



    // 处理用户名输出函数
    handleUserNameInput = (e) => {
        let {username}=this.state
        username=e.target.value
        this.setState({
            username
        })
    }

    // 处理密码输入函数
    handleUserPasswordInput = (e) => {
        let {password}=this.state
        password=e.target.value
        this.setState({
            password
        })
    }

    // 处理取消按钮框
    handleUserCancel = () => {
        this.setState({
            isAddUser: 'none'
        })
        // 发布重置父组件isAddUser
        PubSub.publish("restoreAddUser")
    }

    // 处理提交按钮框
    handleUserSubmit =async () => {
        const select = document.getElementsByClassName('sel')[0];
        // console.log(select.options[select.selectedIndex].value);
        // console.log(select.options[select.selectedIndex].text);
        const roleType = select.options[select.selectedIndex].text;
        const { username, password } = this.state
        // console.log(username, password, roleType);
        const result=await AddNewUser(username,password,roleType)
        if(result.status===200){
            this.setState({
                isAddUser: 'none',
                username:'',
                password:''
            })
            // 提示信息
            message.success("添加新用户成功")
            // 发布重置父组件isAddUser和重新查询所有用户
            PubSub.publish("restoreAddUser")
            PubSub.publish("QueryAllUsers")

        }
    }

    render() {
        // console.log(this.props.isAddUser);
        const { isAddUser, username, password, allRoleType } = this.state
        // console.log(username, password, allRoleType);
        return (
            <div className='AddUser' style={{ display: isAddUser }}>
                <h2>创建新用户</h2>
                <input type="text" placeholder="请输入用户名" value={username}
                    onChange={this.handleUserNameInput} /><br />
                <input type="password" placeholder="请输入密码" value={password}
                    onChange={this.handleUserPasswordInput} /><br />
                <select className="sel">
                    {
                        allRoleType.map((item, index) => {
                            return (
                                <option key={index} value={index}>{item.roleType}</option>
                            )
                        })
                    }
                </select><br />
                <button onClick={this.handleUserCancel}>取消</button>
                <button onClick={this.handleUserSubmit}>确认提交</button>
            </div>
        )
    }
}
