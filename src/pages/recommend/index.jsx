import React, { Component } from 'react'

import ContentBg from "../../components/content/contentbg/contentbg"

// 引入公共组件
import PublicJob from "../../components/content/publicjob/PublicJob"


export default class Recommend extends Component {
    render() {
        return (
            <div>
                <ContentBg />
                <PublicJob />
            </div>
        )
    }
}
