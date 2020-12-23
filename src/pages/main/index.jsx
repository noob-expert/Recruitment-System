import React, { Component } from 'react'

// 引入less/css样式
import "./index.less"

// 引入子组件
import LeftNav from "../../components/leftNav"
import Content from "../../components/content"

export default class main extends Component {
    render() {
        return (
            <div className="admin">
                <div className="left-nav">
                    <LeftNav />
                </div>
                <div className="content">
                    <Content />
                </div>
            </div>
        )
    }
}
