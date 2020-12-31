import { message } from 'antd'
import React, { Component } from 'react'
import PropTypes from "prop-types"

// 引入axios请求
import { AddRole } from "../../../network/index"
import LocalStorage from "../../../utils/storageUtils"

// 引入CSS样式
import "./addRole.less"

export default class addRole extends Component {
    // 设置state状态
    state = {
        roleType: '',
        isAddRole: this.props.isAddRole
    }

    // 设置propTypes状态
    static propTypes = {
        isAddRole: PropTypes.string.isRequired
    }

    // 在props传递状态更新时，监控并重新配置
    componentWillReceiveProps(nextProps) {
        this.setState({
            isAddRole: nextProps.isAddRole
        })
    }

    // 获取受控组件的值
    handleRoleTypeInput = (event) => {
        let roleType = event.target.value;
        // 保存值
        this.setState({ roleType })
    }

    // 取消提交按钮
    hanleRoleTypeCancel = () => {
        // 取消候选框
        // this.props.isAddRole="none"
        this.setState({
            isAddRole: "none"
        })
    }

    // 提交角色名按钮
    hanleRoleTypeSubmit = async () => {
        // 获取roleType值
        const { roleType } = this.state;
        // 获取授权人
        const author=LocalStorage.getUser()
        // 发送请求传入并获取结果
        const result = await AddRole(roleType,author);
        if (result.status === 200) {
            message.success("创建用户角色权限成功")
            // 清除输入值,取消候选框
            this.setState({
                roleType: '',
                isAddRole: "none"
            })
        } else {
            message.error("创建用户角色权限失败")
        }

    }

    render() {
        const { isAddRole } = this.state
        // console.log(this.props.isAddRole);
        const { roleType } = this.state
        return (
            <div className="addRole" style={{ display: isAddRole }}>
                <h2>创建新角色类型</h2>
                <input type="text" placeholder="请输入角色名" value={roleType}
                    onChange={this.handleRoleTypeInput} />
                <button onClick={this.hanleRoleTypeCancel}>取消</button>
                <button onClick={this.hanleRoleTypeSubmit}>确认</button>
            </div>
        )
    }
}



