import React, { Component } from 'react'

// 引入推荐记录css样式
import "./recordrecru.less"

// 引入ant-d
import { Table, message } from "antd"


export default class RecordRecru extends Component {

    state = {
        name: "投递记录"
    }

    render() {
        const { name } = this.state
        const columns = [
            {
                title: '应聘职位',
                dataIndex: "position",
                key: "position"
            },
            {
                title: '所属部门',
                dataIndex: "depart",
                key: "depart"
            },
            {
                title: '员工姓名',
                dataIndex: "staffName",
                key: "staffName"
            },
            {
                title: '员工ID',
                dataIndex: "staffID",
                key: "staffID"
            },
            {
                title: '员工邮箱',
                dataIndex: "email",
                key: "email"
            },
            {
                title: '手机号码',
                dataIndex: "phoneNumber",
                key: "phoneNumber"
            },
            {
                title: '申请时间',
                dataIndex: "time",
                key: "time"
            },
        ]
        const dataSource = [
            {
                key: '1',
                position: "网络工程师",
                depart: "烽火网络",
                staffName: "刘宝军",
                staffID: '0211006185',
                email:"bjliu6185@fiberhome.com",
                phoneNumber:'15202729170',
                time: "2021-01-06"
            }
        ]
        return (
            <div className="Record">
                <h2>{name}</h2>
                <Table dataSource={dataSource} columns={columns}
                    pagination={
                        {
                            defaultCurrent: 1,
                            defaultPageSize: 7
                        }
                    } />
            </div>
        )
    }
}
