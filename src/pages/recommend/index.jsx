import React, { Component } from 'react'

import ContentBg from "../../components/content/contentbg/contentbg"

// 引入公共组件
import PublicRecomds from "../../components/content/publicrecomd/PublicRecomd"


export default class Recommend extends Component {
    render() {
        return (
            <div>
                <ContentBg />
                <PublicRecomds />
            </div>
        )
    }
}
