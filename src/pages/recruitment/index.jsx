import React, { Component } from 'react'

import ContentBg from "../../components/content/contentbg/contentbg"

// 引入公共组件
import PublicJob from "../../components/content/publicjob/PublicJob"

// 引入css样式
import "./recurIndex.css"


export default class Recommend extends Component {
    render() {
        return (
            <div className="recurIndex">
                <ContentBg />
                <PublicJob />
            </div>
        )
    }
}
