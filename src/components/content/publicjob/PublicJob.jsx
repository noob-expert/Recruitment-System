import React, { Component } from 'react'

// 引入CSS样式
import styles from "./PublicJob.module.css"

// 引入职位请求模块
import { Jobs, JobsFindByDepart,QueryUserByUsername } from "../../../network/index"

// 引入antd表单组件table
import { Table,Modal,message } from 'antd';

// 引入发布订阅
import PubSub from "pubsub-js"

// 引入本地用户
import Local from "../../../utils/storageUtils"


const {confirm}=Modal

export default class PublicJob extends Component {
    
    state = {
        jobs: [],
        Users:{}
    }

    // 加载所有请求函数
    JobsAll = async () => {
        let jobs = await Jobs()
        jobs = jobs.data
        this.setState({ jobs })
    }

    // 获取当前用户信息
    GetUsers=async()=>{
        const username = Local.getUser()
        const result = await QueryUserByUsername(username);
        this.setState({
            Users:result.data[0]
        })

    }

    componentDidMount() {
        this.JobsAll()
        // console.log(Local.getUser());
        this.GetUsers()
    }

    // 点击加载全部时的请求
    showAllJobsClick = () => {
        this.JobsAll()
    }

    // 点击所属机构时的数据显示
    handleDepartClick = async (depart) => {
        // 获取当前点击的机构名字
        // console.log(depart)
        // 在数据库中查找对应职位，并返回值，设置给state
        const jobsFindDepart = await JobsFindByDepart(depart)
        const jobs = jobsFindDepart.data
        // 赋值给state
        this.setState({ jobs })
    }

    // 投递工作
    handleSendJob=()=>{
        // console.log("投递简历");
        confirm({
            title:'确认投递简历',
            onOk:()=>{
                console.log("ok");
                // console.log(this.state.Users);
                const{realname,id,email,phoneNumber,_id}=this.state.Users
            },
            onCancel(){
                console.log("Cancel");
            }
        })
    }

    render() {
        const { jobs } = this.state
        // console.log(jobs);
        // const jobsDepart = []
        // const arr=[{depart:'ws'},{depart:'qs'},{depart:'wes'},{depart:'wds'}]
        const columns = [
            {
                title: '职位',
                dataIndex: 'position',
                key: 'position',
                render: text => <a>{text}</a>,
            },
            {
                title: '薪资',
                dataIndex: 'salary',
                key: 'salary',
            },
            {
                title: '机构',
                dataIndex: 'depart',
                key: 'depart',
            },
            {
                title: '工作地点',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '发布时间',
                key: 'date',
                dataIndex: 'date'
            },
            {
                title: '操作',
                key: 'action',
                render: () => (
                    <button onClick={this.handleSendJob}>我要投递</button>
                ),
            },
        ];
        let Depart = ["烽火通信", "网络产出线", "烽火超微", "宽带业务产出线", "线缆产出线", "成都大唐", "烽火海洋网络设备有限公司", "公共研发部", "微电子部", "国内销售部", "系统设备制造部", "云计算研发中心", "烽火网络", "烽火云创", "光谷智慧", "人力资源部", "科技与运营部", "战略与市场部", "烽火技服", "湖北楚天云", "南京烽火星空", "烽火集成"];
        jobs.map((element) => {
            Depart.push(element.depart)
        })
        let newDepart = [...new Set(Depart)]
        return (
            <div className={styles.publicJob}>
                <div className={styles.depart}>
                    <div className={styles.left}>所属机构</div>
                    <input type="checkbox" name='' value='' />
                    <span>展开</span>
                    <div className={styles.right}>
                        {/* {jobsDepart} */}
                        <a href="javaScript:;" onClick={this.showAllJobsClick}>全部职位</a>
                        {newDepart.map((element, index) => {
                            return <a key={index} onClick={() => this.handleDepartClick(element)}>{element}</a>
                        })}
                    </div>
                    {/* <input type="checkbox" name='' value='' /> */}
                    {/* <div className={styles.right}> */}
                    {/* <input type="checkbox" name='' value='' />
                    <span>展开</span> */}
                    {/* </div> */}
                   
                </div>
                <Table columns={columns} dataSource={jobs}
                    pagination={
                        {
                            defaultCurrent: 1,
                            defaultPageSize: 7
                        }
                    }
                />
                {/* <Pagination defaultPageSize='1' /> */}
                {
                    // 手撕写法。。。
                /* <table className={styles.section}>
                    <tbody>
                        <tr>
                            <th>职位</th>
                            <th>薪资</th>
                            <th>机构</th>
                            <th>工作地点</th>
                            <th>发布时间</th>
                            <th>操作</th>
                        </tr>
                        {
                            jobs.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><a href="JavaScript:;">{item.position}</a> </td>
                                        <td>{item.salary}</td>
                                        <td>{item.depart}</td>
                                        <td>{item.address}</td>
                                        <td>{item.date}</td>
                                        <td><button>我要投递</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
            </div>
        )
    }
}
