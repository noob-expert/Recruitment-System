import React, { Component } from 'react'

// 引入ant-d
import { Table, message } from "antd"

export default class RecordRecom extends Component {
    state = {
        name: "推荐记录"
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
                title: '申请时间',
                dataIndex: "time",
                key: "time"
            },
        ]
        const dataSource = [
            {
                key: '1',
                position: "通信工程师",
                depart: "烽火通信",
                staffName: "柯京",
                staffID: '0211006121',
                time: "2021-01-05"
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
