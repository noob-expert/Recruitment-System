import React, { Component } from 'react'

// 引入CSS样式
import styles from "./PublicJob.module.css"

export default class PublicJob extends Component {
    render() {
        return (
            <div className={styles.publicJob}>
                <div className={styles.depart}>
                    <div className={styles.left}>所属机构</div>
                    <div className={styles.center}>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
                        <p>所属机构</p>
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

                        <tr>
                            <td><a href="JavaScript:;">电力网络 高级/资深客户经理</a> </td>
                            <td>面议</td>
                            <td>烽火网络有限责任公司</td>
                            <td>北京市</td>
                            <td>2020-05-08</td>
                            <td><button>我要推荐 </button></td>
                        </tr>
                        <tr>
                            <td><a href="JavaScript:;">电力网络 高级/资深客户经理</a> </td>
                            <td>面议</td>
                            <td>烽火网络有限责任公司</td>
                            <td>北京市</td>
                            <td>2020-05-08</td>
                            <td><button>我要推荐 </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
