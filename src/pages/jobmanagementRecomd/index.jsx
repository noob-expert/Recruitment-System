import React, { Component } from 'react'

// 引入局部CSS样式
import styles from "./jobmanegement.module.css"

// 引入职位请求和删除函数1
import { Recomds, RecomdsDelete, RecomdsAdd } from "../../network/index"

export default class JobManagement extends Component {
    // 状态管理
    state = {
        recommds: [],
        depart: '',
        position: '',
        salary: '',
        address: ''
    }

    // 重新渲染函数
    rerender=()=>{
        Recomds().then((results) => {
            const recommds = results.data;
            this.setState({ recommds })
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

    // 定义推荐职位删除
    recommdsDelete = (id) => {
        RecomdsDelete(id).then(result => {
            console.log(result)
            this.rerender()
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
        // 优化，如果未输入值则将undefined传入，使用默认参数（salary="面议",address="武汉"）
        const salary = this.salary.value ? this.salary.value : undefined;
        const address = this.address.value ?this.address.value:undefined
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
            this.rerender()
        }, err => {
            console.log(err)
        })
    }

    render() {
        const { recommds } = this.state

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
            </div>
        )
    }
}
