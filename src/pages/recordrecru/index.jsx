import React, { Component } from 'react'

// 引入推荐记录css样式
import "./recordrecru.less"

// 引入ant-d
import { Table, message } from "antd"

// 引入本地
import LocalMethod from "../../utils/storageUtils"

// 引入网络请求
import {QueryJobsRecord,QueryUserByUsername} from "../../network/index"

export default class RecordRecru extends Component {

    state = {
        name: "投递记录",
        JobsTableData:[]
    }

    // 获取当前用户并引入应聘职位请求
    getJobsRecord=async()=>{
        var currentUser=LocalMethod.getUser()
        if(currentUser==='admin'){
            const adminresult=await QueryJobsRecord(currentUser)
            // console.log(adminresult);
            this.setState({
                JobsTableData:adminresult.data
            })
        }else{
            const userInfo=await QueryUserByUsername(currentUser)
            const user=userInfo.data[0];
            const realUser=user.realname;
            // console.log(realUser);
            const realresult=await QueryJobsRecord(realUser)
            // console.log(realresult);
            this.setState({
                JobsTableData:realresult.data
            })
        }
    }

    // 生命周期内引入
    componentDidMount(){
        this.getJobsRecord()
    }


    render() {
        const { name , JobsTableData} = this.state
        // console.log(JobsTableData);
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
                dataIndex: "staffEmail",
                key: "staffEmail"
            },
            {
                title: '手机号码',
                dataIndex: "staffNumber",
                key: "staffNumber"
            },
            {
                title: '申请时间',
                dataIndex: "date",
                key: "date"
            },
        ]

        return (
            <div className="Record">
                <h2>{name}</h2>
                <Table dataSource={JobsTableData} columns={columns}
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
