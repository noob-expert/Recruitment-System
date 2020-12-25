import React, { Component } from 'react'

// 引入CSS样式
import styles from "./PublicJob.module.css"

// 引入职位请求模块
import { Jobs } from "../../../network/index"

export default class PublicJob extends Component {

    state = {
        jobs: []
    }

    componentDidMount() {
        Jobs().then(res => {
            const jobs = res.data;
            this.setState({ jobs })
        })
    }

    render() {
        const { jobs } = this.state
        console.log(jobs);
        // const jobsDepart = []
        // const arr=[{depart:'ws'},{depart:'qs'},{depart:'wes'},{depart:'wds'}]
        return (
            <div className={styles.publicJob}>
                <div className={styles.depart}>
                    <div className={styles.left}>所属机构</div>
                    <div className={styles.center}>
                        {/* {jobsDepart} */}
                        {jobs.map((element, index) => {
                            return <p key={index}>{element.depart}</p>
                        })}
                    </div>
                    <div className={styles.right}>展开</div>
                </div>
                <table className={styles.section}>
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
                </table>
            </div>
        )
    }
}
