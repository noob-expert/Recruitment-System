import React, { Component } from 'react'

// 引入局部CSS样式
import styles from "./jobmanegement.module.css"

// 引入职位请求和删除函数1
import { Jobs, JobsDelete, JobsAdd } from "../../network/index"


import { message } from 'antd'

export default class JobManagement extends Component {
    // 状态管理
    state = {
        jobs: [],
        depart: '',
        position: '',
        salary: undefined,
        address: undefined
    }

    // 重新渲染函数
    rerender = () => {
        Jobs().then((results) => {
            const jobs = results.data;
            this.setState({ jobs })
        })
    }

    // 生命周期函数中引入
    componentDidMount() {
        this.rerender()
    }

    // 生命周期函数中定义每次更新时重新渲染
    // componentDidUpdate(){
    //     Recomds().then((results) => {
    //         const recommds = results.data;
    //         this.setState({ recommds })
    //     })
    //     Jobs().then((results) => {
    //         const jobs = results.data;
    //         this.setState({ jobs })
    //     })
    // }


    // 设置招聘职位新增时受控表单的值更改
    handleDepart = (event) => {
        let { depart } = this.state;
        depart = event.target.value;
        this.setState({ depart });
    }
    handlePosition = (event) => {
        let { position } = this.state;
        position = event.target.value;
        this.setState({ position });
    }
    handleSalary = (event) => {
        let { salary } = this.state;
        // salary=event.target.value
        salary = event.target.value
        console.log(salary)
        this.setState({ salary });
    }
    handleAddress = (event) => {
        let { address } = this.state;
        address = event.target.value
        this.setState({ address });
    }

    // 定义招聘职位新增
    jobsAddHandle = (event) => {
        // 阻止默认提交行为
        event.preventDefault()
        // 获取受控表单的输入值
        const { depart, position, salary, address } = this.state;
        console.log(depart, position, salary, address)
        // 调用招聘职位新增请求更改
        JobsAdd(depart, position, salary, address).then(res => {
            // 重置输入
            this.setState({
                depart: '',
                position: '',
                salary: '',
                address: ''
            })
            // 重新渲染JOBS.RECOMMDS
            this.rerender()
        }, err => {
            console.log(err)
        })
    }

    // 定义招聘职位删除
    jobsDelete = (id) => {
        JobsDelete(id).then(result => {
            console.log(result)
            message.success("删除成功")
            this.rerender()
        })
    }

    render() {
        const { jobs } = this.state

        // 设置受控表单的值
        const { depart, position, salary, address } = this.state;

        return (
            <div className={styles.allJobs}>
                <div className={styles.jobs}>
                    <h2>内部招聘职位管理</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>职位</th>
                                <th>机构</th>
                                <th>发布时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.position}</td>
                                            <td>{item.depart}</td>
                                            <td>{item.date}</td>
                                            <td><input type="submit" onClick={() => this.jobsDelete(item._id)} value="删除" /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <form action="/JobsAdd" onSubmit={this.jobsAddHandle}>
                    机构:<input type="text" value={depart} onChange={this.handleDepart} /><br />
                    职位:<input type="text" value={position} onChange={this.handlePosition} /><br />
                    薪水:<input type="text" value={salary} onChange={this.handleSalary} /><br />
                    工作地点:<input type="text" value={address} onChange={this.handleAddress} /><br />
                    <input type="submit" value="新增" />
                </form>
            </div>
        )
    }
}
