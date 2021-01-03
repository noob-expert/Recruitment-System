import React, { Component } from 'react'

// 引入请求模块
import { AddNewUser, QueryRole } from "../../../network/index"

// 引入props
import PropTypes from "prop-types"

// 引入发布订阅
import PubSub from "pubsub-js"

// 引入antd
import { message } from "antd"

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
        realname:'',
        email: '',
        phoneNumber: '',
        depart: '',
        id: '',
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



    // 处理用户名输入函数
    handleUserNameInput = (e) => {
        let { username } = this.state
        username = e.target.value
        this.setState({
            username
        })
    }

    // 处理密码输入函数
    handleUserPasswordInput = (e) => {
        let { password } = this.state
        password = e.target.value
        this.setState({
            password
        })
    }

     // 处理员工名字输入函数
        handleRealNameInput = (e) => {
            let { realname } = this.state
            realname = e.target.value
            this.setState({
                realname
            })
        }

    // 处理邮箱输入函数
    handleEmailInput = (e) => {
        let { email } = this.state
        email = e.target.value
        this.setState({
            email
        })
    }
    // 处理电话号码输入函数
    handlePhoneNumberInput = (e) => {
        let { phoneNumber } = this.state
        phoneNumber = e.target.value
        this.setState({
            phoneNumber
        })
    }
    // 处理部门输入函数
    handleDepartInput = (e) => {
        let { depart } = this.state
        depart = e.target.value
        this.setState({
            depart
        })
    }
    // 处理员工号输入函数
    handleIdInput = (e) => {
        let { id } = this.state
        id = e.target.value
        this.setState({
            id
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
    handleUserSubmit = async () => {
        const select = document.getElementsByClassName('sel')[0];
        // console.log(select.options[select.selectedIndex].value);
        // console.log(select.options[select.selectedIndex].text);
        const roleType = select.options[select.selectedIndex].text;
        const { username, password,realname,email,phoneNumber,depart,id } = this.state
        console.log(username, password,realname,email,phoneNumber,depart,id );
        const result = await AddNewUser(username, password,realname,email,phoneNumber,depart,id,roleType)
        if (result.status === 200) {
            this.setState({
                isAddUser: 'none',
                username: '',
                pasword: '',
                realname:'',
                email: '',
                phoneNumber: '',
                depart: '',
                id: '',
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
        const { isAddUser, username, realname,password, email, phoneNumber, depart, id, allRoleType } = this.state
        // console.log(username, password, allRoleType);
        return (
            <div className='AddUser' style={{ display: isAddUser }}>
                <h2>创建新用户</h2>
                <input type="text" placeholder="请输入用户名" value={username}
                    onChange={this.handleUserNameInput} /><br />
                <input type="password" placeholder="请输入密码" value={password}
                    onChange={this.handleUserPasswordInput} /><br />
                <input type="text" placeholder="请输入员工名字" value={realname}
                    onChange={this.handleRealNameInput} /><br />
                <input type="text" placeholder="请输入邮箱" value={email}
                    onChange={this.handleEmailInput} /><br />
                <input type="text" placeholder="请输入手机号码" value={phoneNumber}
                    onChange={this.handlePhoneNumberInput} /><br />
                <input type="text" placeholder="请输入部门" value={depart}
                    onChange={this.handleDepartInput} /><br />
                <input type="text" placeholder="请输入员工编号" value={id}
                    onChange={this.handleIdInput} /><br />
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
