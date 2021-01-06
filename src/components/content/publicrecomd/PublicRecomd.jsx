import React, { Component } from 'react'

// 引入CSS样式
import styles from "./PublicJob.module.css"

import "./iii.css"

// 引入职位请求模块
import { Recomds, RecomdsFindByDepart } from "../../../network/index"

// 引入antd表单组件table
import { Table,Modal } from 'antd';

// const {confirm}=Modal

export default class PublicJob extends Component {

    state = {
        recomds: [],
        isModalVisible:false
    }

    // 加载所有请求函数
    RecomdsAll = async () => {
        let recomds = await Recomds()
        recomds = recomds.data
        this.setState({ recomds })
    }

    componentWillMount() {
        this.RecomdsAll()
    }

    // 处理点击全部时显示所有职位
    showAllClick = () => {
        this.RecomdsAll()
    }

    // 定义点击所属机构时显示对应职位名称
    handleRecomdDepartClick = async (depart) => {
        // 获取当前点击的机构名字
        console.log(depart)
        // 在数据库中查找对应职位，并返回值，设置给state
        const recomdsFindDepart = await RecomdsFindByDepart(depart)
        const recomds = recomdsFindDepart.data
        // 赋值给state
        this.setState({ recomds })
    }

    handleOk=()=>{
        console.log("确定");
        this.setState({
            isModalVisible:false
        })
    }

    handleCancel=()=>{
        console.log("取消");
        this.setState({
            isModalVisible:false
        })
    }


    // 确认推荐
    handleSendRecommend=()=>{
        // console.log("投递简历");
        this.setState({
            isModalVisible:true
        })
    }

    render() {
        const { recomds, isModalVisible } = this.state
        // console.log(recomds);
        let Depart = ["烽火通信", "网络产出线", "烽火超微", "宽带业务产出线", "线缆产出线", "成都大唐", "烽火海洋网络设备有限公司", "公共研发部", "微电子部", "国内销售部", "系统设备制造部", "云计算研发中心", "烽火网络", "烽火云创", "光谷智慧", "人力资源部", "科技与运营部", "战略与市场部", "烽火技服", "湖北楚天云", "南京烽火星空", "烽火集成"];
        recomds.map((element) => {
            Depart.push(element.depart)
        })
        let newDepart = [...new Set(Depart)]
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
                    <button onClick={this.handleSendRecommend}>我要推荐</button>
                ),
            },
        ];
        // const jobsDepart = []
        // const arr=[{depart:'ws'},{depart:'qs'},{depart:'wes'},{depart:'wds'}]
        return (
            <div className={styles.publicJob}>
                <div className={styles.depart}>
                    <div className={styles.left}>所属机构</div>
                    <input type="checkbox" name='' value='' />
                    <span>展开</span>
                    <div className={styles.right}>
                        {/* {jobsDepart} */}
                        <a href="" onClick={this.showAllClick}>全部职位</a>
                        {newDepart.map((element, index) => {
                            return (
                                <a key={index} onClick={() => this.handleRecomdDepartClick(element)}>{element}</a>
                            )
                        })}
                    </div>
                </div>

                <Table
                    className={styles.section}
                    columns={columns} dataSource={recomds}
                    pagination={
                        {
                            defaultCurrent: 1,
                            defaultPageSize: 7
                        }
                    }
                />

                <Modal title="推荐人信息" visible={isModalVisible}
                onOk={this.handleOk} onCancel={this.handleCancel}>
                    <span>姓名:</span><input type="text" placeholder="请输入推荐人姓名"/><br/>
                    <span>ID:</span><input type="text" placeholder="请输入推荐员工ID"/><br/>
                    <span>邮箱:</span><input type="text" placeholder="请输入推荐员工邮箱"/><br/>
                    <span>手机号码:</span><input type="text" placeholder="请输入推荐员工手机号码"/>
                </Modal>
                {
                // 手撕的代码。。。
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
                            recomds.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><a href="JavaScript:;">{item.position}</a> </td>
                                        <td>{item.salary}</td>
                                        <td>{item.depart}</td>
                                        <td>{item.address}</td>
                                        <td>{item.date}</td>
                                        <td><button>我要推荐</button></td>
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
