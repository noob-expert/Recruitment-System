import React, { Component } from 'react'

// 从antd中引入tabs
import { Tabs } from "antd";

// 引入css样式
import "./basicinfo.less"

// 引入子组件
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const { TabPane } = Tabs;

export default class BasicInfo extends Component {


    // 定义tabs onChange函数
    callback = (key) => {
        console.log(key);
    }

    render() {
        return (
            <div className="myProfile123">
                <div className="tab">
                    <Tabs defaultActiveKey="1" onChange={this.callback}
                    centered='true'>
                    <TabPane tab="个人信息" key="1"
                    style={{position:'relative'}}>
                            <ProfileInfo />
                    </TabPane>
                        <TabPane tab="账号绑定" key="2">
                            账号绑定
                    </TabPane>
                        <TabPane tab="修改密码" key="3">
                            <div className="passwd">原密码: <input type="password" placeholder="请输入原密码"/></div>
                            <div className="passwd">新密码: <input type="password" placeholder="请输入新密码"/></div> 
                            <div className="passwd">确认密码: <input type="password" placeholder="请输入确认密码"/></div> 
                            <button>保存</button>
                    </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
