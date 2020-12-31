import React, { Component, useState } from 'react'

// 引入CSS样式
import Styles from "./roleManage.module.css"

// 引入ant-design组件--card
import { Card, Table ,Button} from "antd"

// 引入时间戳转化
import { formatDate } from "../../utils/timestamp"

// 引入axios请求组件
import {QueryRole} from "../../network/index"

// 引入子组件
import AddRole from "./AddRole/addRole"
import ModifyRole from "./ModifyRole/modifyRole"

const columns = [
    {
        title: '角色类型',
        dataIndex: 'roleType',
        // rowKey:"roleName"
        key: 'roleName'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '授权人',
        dataIndex: 'author',
        key: 'author',
    }
]

// 创建生成表格内容
// const jobs = [
//     {
//         key: "normal",
//         roleType: "普通账号",
//         createTime: formatDate(Date.now()),
//         author: LocalStorage.getUser()
//     },
//     {
//         key: "admin",
//         roleType: "admin账号",
//         createTime: formatDate(Date.now()),
//         author: LocalStorage.getUser()
//     }
// ]

export default class RoleManagement extends Component {
    // state样式
    state = {
        selectedRowKeys: [],
        selectedRows:[],
        isAddRole:'none',
        isModifyRole:'none',
        roleTypes:[]
    }

    // 角色请求函数
    QueryRole=async()=>{
        const result=await QueryRole();
        if(result.status==200){
            // const {roleType,author,createTime}=result.data;
            // console.log((roleType,author,createTime));
            // console.log(result.data);
            this.setState({
                roleTypes:result.data
            })
        }
    }

    // 模块开始加载时执行
    componentDidMount(){
        this.QueryRole()
    }

    // 勾选表格框按钮时
    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys,selectedRows });
    };

    // 点击创建角色按钮时
    showAddRole=()=>{
        this.setState({
            isAddRole:"block"
        })
    }

    // 点击设置角色权限按钮时
    showModifyRole=()=>{
        this.setState({
            isModifyRole:'block'
        })
    }

    // 引入标题样式
    CardTitle = () => {
        return (
            <div>
                <button onClick={this.showAddRole}>创建角色</button> &nbsp;&nbsp;
                <button
                onClick={this.showModifyRole}
                className="modifyDisable"
                // disabled={this.state.selectedRows?'false':'true'}
                // disabled
                >设置角色权限</button>
                {/* <Button disabled>设置角色权限</Button> */}
            </div>
        )
    }

    render() {

        const { selectedRowKeys,isAddRole,isModifyRole,roleTypes,selectedRows} = this.state;

        const roles=[]

        roleTypes.map((item,index)=>{
            roles.push({
                key:item._id,
                roleType: item.roleType,
                createTime: formatDate(item.createTime),
                author: item.author,
                menu:item.menu
            })
        })

        // 创建生成表格抬头样式
        // 选中选择框内容
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        console.log(selectedRows,isModifyRole);
        return (
            <div className={Styles.card}>
                <Card title={this.CardTitle()} bordered={false} style={{ width: '100%' }}>
                    <Table columns={columns} dataSource={roles}
                        pagination={
                            {
                                defaultCurrent: 1,
                                defaultPageSize: 7
                            }
                        }
                        rowSelection={rowSelection}
                        type="radio"
                    />
                </Card>
                <AddRole isAddRole={isAddRole}/>
                <ModifyRole isModifyRole={isModifyRole} selectedRows={selectedRows} />
            </div>
        )
    }
}
