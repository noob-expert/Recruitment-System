import React, { Component } from 'react'

// 引入网络请求函数
import { QueryUser,DeleteUser} from "../../network/index"



// 引入css样式
import "./userManagement.less"

// 引入监听订阅
import PubSub from "pubsub-js"

//引入localStroage
import LocalStorage from "../../utils/storageUtils"


// 引入antd组件和子组件
import { Card, Table, message } from "antd"
import AddUser from "./AddUser/AddUser"
import ModifyUser from "./ModifyUser/ModifyUser"

// 设置Card组件标题
const columns = [
    {
        title: "用户名",
        dataIndex: "username",
        key: "username"
    },
    {
        title: "用户角色",
        dataIndex: "roleType",
        key: "roleType"
    },
    {
        title: "注册时间",
        dataIndex: "createTime",
        key: 'createTime'
    }
]




export default class UserManagement extends Component {
    // state样式
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        isAddUser: 'none',
        isModifyUser: 'none',
        roleTypes: [],
        allUser: []
    }

       // 初始化所有User值
       QueryAllUsers = async () => {
        const result = await QueryUser()
        // console.log(result);
        this.setState({
            allUser: result.data
        })
    }

    // 生命周期函数内获取初始化User值，和监听订阅重置函数
    componentDidMount() {
        this.QueryAllUsers()
        PubSub.subscribe("restoreAddUser", this.restoreAddUser)
        PubSub.subscribe("restoreModifyUser", this.restoreModifyUser)
        PubSub.subscribe("QueryAllUsers", this.QueryAllUsers)
    }

    // 勾选表格框按钮时
    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
    };

    // 设置点击新增用户函数
    addUser = () => {
        this.setState({
            isAddUser: 'block'
        })
    }

    // 设置点击删除用户函数
    deleteUser = async () => {
        const {selectedRows}=this.state
        // console.log(selectedRows);
        const result= await DeleteUser(selectedRows[0].key)
        // console.log(result);
        if(result.status===200){
            message.success("删除用户成功");
            this.QueryAllUsers()
        }
    }

    // 设置点击重置密码函数
    resetPasswd = () => {
        this.setState({
            isModifyUser: "block"
        })
    }

    // 重置state属性函数
    restoreAddUser = () => {
        this.setState({
            isAddUser: 'none'
        })
    }
    restoreModifyUser = () => {
        this.setState({
            isModifyUser: "none"
        })
    }

 
    // 标题样式
    CardTitle = () => {
        return (
            <div>
                <button onClick={this.addUser}>创建用户</button>
                <button onClick={this.deleteUser}
                    disabled={this.state.selectedRows.length === 0 ? 'disabled' : ''}
                >删除用户</button>
                <button onClick={this.resetPasswd}
                    disabled={this.state.selectedRows.length === 0 ? 'disabled' : ''}>重置密码</button>
            </div>
        )
    }


    render() {
        const { selectedRowKeys, selectedRows, isAddUser, isModifyUser, allUser } = this.state
        // 创建生成表格抬头样式
        // 选中选择框内容
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // console.log(allUser);
        let users = []
        // 设置初始表格内容
        allUser.forEach((item, index) => {
            users.push({
                key: item._id,
                username: item.username,
                roleType: item.roleType,
                createTime: item.date
            })
        })
        return (
            <div className="userManagement">
                <Card
                    title={this.CardTitle()}
                    bordered={false} style={{ width: '100%' }}>
                    <Table
                        columns={columns} dataSource={users}
                        pagination={
                            {
                                defaultCurrent: 1,
                                defaultPageSize: 7
                            }
                        }
                        rowSelection={{
                            ...rowSelection,
                            type: "radio"
                        }
                        }
                    />
                </Card>
                <AddUser isAddUser={isAddUser} />
                <ModifyUser isModifyUser={isModifyUser} 
                 selectedRows={selectedRows} />
            </div>
        )
    }
}
