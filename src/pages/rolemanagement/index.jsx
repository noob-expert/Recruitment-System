import React, { Component, useState } from 'react'

// 引入CSS样式
import Styles from "./roleManage.module.css"

// 引入ant-design组件--card
import { Card, Table, Modal } from "antd"

// 引入本地local Storage中的值和时间戳转化
import LocalStorage from "../../utils/storageUtils"
import { formatDate } from "../../utils/timestamp"

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
const jobs = [
    {
        key: "normal",
        roleType: "普通账号",
        createTime: formatDate(Date.now()),
        author: LocalStorage.getUser()
    },
    {
        key: "admin",
        roleType: "admin账号",
        createTime: formatDate(Date.now()),
        author: LocalStorage.getUser()
    }
]

export default class RoleManagement extends Component {
    // state样式
    state = {
        selectedRowKeys: []
    }

    // [isModalVisible, setIsModalVisible] = useState(false);

    showModal = () => {
        setIsModalVisible(true);
    };

    handleOk = () => {
        setIsModalVisible(false);
    };

    handleCancel = () => {
        setIsModalVisible(false);
    };

    // 勾选表格框按钮时
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys });
    };

    // 引入标题样式
    CardTitle = () => {
        return (
            <div>
                <button type="primary" onClick={this.showModal}>创建角色</button> &nbsp;&nbsp;
                <button type="primary" style={{ disable: true }}>设置角色权限</button>
            </div>
        )
    }

    render() {

        const { selectedRowKeys } = this.state;

        // 创建生成表格抬头样式
        // 选中选择框内容
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className={Styles.card}>
                <Card title={this.CardTitle()} bordered={false} style={{ width: '100%' }}>
                    <Table columns={columns} dataSource={jobs}
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

                {/* 创建角色权限对话框 */}
                <Modal title="Basic Modal"
                visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <input type="text" placeholder="12345" />
                    <p>1234</p>
                </Modal>
            </div>
        )
    }
}
