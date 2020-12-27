import React, { Component } from 'react'

// 引入路由参数
import { Switch, Route, Redirect } from "react-router-dom"

// 引入子组件
import Recommend from "../../pages/recommend"
import Recruit from "../../pages/recruitment"
import BasicInfo from "../../pages/basicinfo"
import RecordRecom from "../../pages/recordrecom"
import RecordRecru from "../../pages/recordrecru"
import UserManagement from "../../pages/usermanagement"
import RoleManagement from "../../pages/rolemanagement"
import RecommendJobManagement from "../../pages/jobmanagementRecomd"
import RecruitJobManagement from "../../pages/jobmanagementRecruit"

// 引入css样式
import "./content.less"


export default class Content extends Component {
    render() {
        return (
            <div className="content">
                <Switch>
                    <Route path="/Recommend" component={Recommend}></Route>
                    <Route path="/Recruit" component={Recruit}></Route>
                    <Route path="/BasicInfo" component={BasicInfo}></Route>
                    <Route path="/RecordRecom" component={RecordRecom}></Route>
                    <Route path="/RecordRecru" component={RecordRecru}></Route>
                    <Route path="/User" component={UserManagement}></Route>
                    <Route path="/Role" component={RoleManagement}></Route>
                    <Route path="/jobRecom" component={RecommendJobManagement}></Route>
                    <Route path="/jobRecruit" component={RecruitJobManagement}></Route>
                    <Redirect to="/Recommend" />
                </Switch>
            </div>
        )
    }
}
