import React, { Component } from 'react'

// 引入局部CSS样式
import styles from "./jobmanegement.module.css"

// 引入职位请求和删除函数1
import { Jobs, Recomds, JobsDelete, RecomdsDelete, RecomdsAdd, JobsAdd } from "../../network/index"

export default class JobManagement extends Component {
    // 状态管理
    state = {
        recommds: [],
        jobs: [],
        depart: '',
        position: '',
        salary: '',
        address: ''
    }

    // 生命周期函数中引入
    componentWillMount() {
        Recomds().then((results) => {
            const recommds = results.data;
            this.setState({ recommds })
        })
        Jobs().then((results) => {
            const jobs = results.data;
            this.setState({ jobs })
        })
    }

    // 定义推荐职位删除
    recommdsDelete = (id) => {
        RecomdsDelete(id).then(result => {
            console.log(result)
            Recomds().then((results) => {
                const recommds = results.data;
                this.setState({ recommds })
            })
            Jobs().then((results) => {
                const jobs = results.data;
                this.setState({ jobs })
            })
        })
    }

    // 定义推荐职位新增
    recommdsAddHandle = (event) => {
        // 阻止默认提交行为
        event.preventDefault();
        // 获取不受控组件的输入值
        // console.log(this.depart.value)
        const depart = this.depart.value;
        const position = this.position.value;
        const salary = this.salary.value;
        const address = this.address.value
        console.log(typeof depart, position, salary, address)
        // 执行新增操作
        RecomdsAdd(depart, position, salary, address).then(res => {
            console.log(res);
            // 重置输入
            this.depart.value = ''
            this.position.value = ''
            this.salary.value = ''
            this.address.value = ''
            // 重新渲染
            Recomds().then((results) => {
                const recommds = results.data;
                this.setState({ recommds })
            })
            Jobs().then((results) => {
                const jobs = results.data;
                this.setState({ jobs })
            })
        }, err => {
            console.log(err)
        })
    }

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
        salary = event.target.value;
        this.setState({ salary });
    }
    handleAddress = (event) => {
        let { address } = this.state;
        address = event.target.value;
        this.setState({ address });
    }

    // 定义招聘职位新增
    jobsAddHandle = (event) => {
        // 阻止默认提交行为
        event.preventDefault()
        // 获取受控表单的输入值
        const {depart,position,salary,address}=this.state;
        console.log(depart,position,salary,address)
        // 调用招聘职位新增请求更改
        JobsAdd(depart, position, salary, address).then(res => {
            // 重置输入
            this.setState({
                depart:'',
                position:'',
                salary:'',
                address:''
            })
            // 重新渲染JOBS.RECOMMDS
            Recomds().then((results) => {
                const recommds = results.data;
                this.setState({ recommds })
            })
            Jobs().then((results) => {
                const jobs = results.data;
                this.setState({ jobs })
            })
        }, err => {
            console.log(err)
        })
    }

    // 定义招聘职位删除
    jobsDelete = (id) => {
        JobsDelete(id).then(result => {
            console.log(result)
            Recomds().then((results) => {
                const recommds = results.data;
                this.setState({ recommds })
            })
            Jobs().then((results) => {
                const jobs = results.data;
                this.setState({ jobs })
            })
        })
    }

    render() {
        const { recommds, jobs } = this.state

        // 设置受控表单的值
        const { depart, position, salary, address } = this.state;

        return (
            <div className={styles.allJobs}>
                <div className={styles.recommds}>
                    <h2>内部推荐职位管理</h2>
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
                                recommds.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.position}</td>
                                            <td>{item.depart}</td>
                                            <td>{item.date}</td>
                                            <td><input type="submit" onClick={() => this.recommdsDelete(item._id)} value="删除" /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <form action="/RecommdsAdd" onSubmit={this.recommdsAddHandle}>
                    机构:<input type="text" ref={input => { this.depart = input }} /><br />
                                职位:<input type="text" ref={input => { this.position = input }} /><br />
                                薪水:<input type="text" ref={input => { this.salary = input }} /><br />
                                工作地点:<input type="text" ref={input => { this.address = input }} /><br />
                    <input type="submit" value="新增" />
                </form>
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
                            {/* <button>新增</button> */}
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
