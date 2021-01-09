import React, { Component } from 'react'

// 引入ant-d
import { Table, message } from "antd"

// 引入网络请求模块
import {QueryRecomdRecord,QueryUserByUsername} from "../../network/index"

// 引入本地用户模块
import Methods from "../../utils/storageUtils"


export default class RecordRecom extends Component {
    state = {
        name: "推荐记录",
        TableData:[]
    }

    // 获取当前用户并引入推荐职位请求
    getRecomdRecord=async()=>{
        var currentUser=Methods.getUser()
        if(currentUser==='admin'){
            const adminresult=await QueryRecomdRecord(currentUser)
            // console.log(adminresult);
            this.setState({
                TableData:adminresult.data
            })
        }else{
            const userInfo=await QueryUserByUsername(currentUser)
            const user=userInfo.data[0];
            const realUser=user.realname;
            // console.log(realUser);
            const realresult=await QueryRecomdRecord(realUser)
            // console.log(realresult);
            this.setState({
                TableData:realresult.data
            })
        }
        
        
        // console.log(result);
    }

    // 声明周期内引入
    componentDidMount(){
        this.getRecomdRecord()
    }


    render() {
        const { name,TableData } = this.state
        // console.log((TableData));
        const columns = [
            {
                title: '应聘职位',
                dataIndex: "position",
                // key: "position"
            },
            {
                title: '所属部门',
                dataIndex: "depart",
                // key: "depart"
            },
              {
                title: '被推荐人姓名',
                dataIndex: "recomdName",
                // key: "recomdName"
            },
            {
                title: '被推荐人邮箱',
                dataIndex: "recomdEmail",
                // key: "recomdEmail"
            },
            {
                title: '被推荐人手机号码',
                dataIndex: "recomdNumber",
                // key: "recomdNumber"
            },
            {
                title: '推荐员工姓名',
                dataIndex: "staffName",
                // key: "staffName"
            },
            {
                title: '推荐员工ID',
                dataIndex: "staffID",
                // key: "staffID"
            },
            {
                title: '更新时间',
                dataIndex: "date",
                // key: "date"
            },
        ]

        // const dataSource = [
        //     {
        //         key: '1',
        //         position: "通信工程师",
        //         depart: "烽火通信",
        //         recommendName:"柯京",
        //         recommendEmail:"1229413925@qq.com",
        //         recommendPhoneNumber:"18098981212",
        //         staffName: "刘保军",
        //         staffID: '0211006185',
        //         time: "2021-01-05"
        //     }
        // ]
        return (
            <div className="Record">
                <h2>{name}</h2>
                <Table dataSource={TableData} columns={columns}
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
