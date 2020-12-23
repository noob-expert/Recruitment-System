import React, { Component } from 'react'

import { Link } from "react-router-dom"

// 引入样式
import "./leftnav.less"
import Logo from "../../assets/image/fh.jpg"

export default class LeftNav extends Component {
    state = {
        show: true
    }

    handleClick = () => {
        let { show } = this.state;
        show = !show
        this.setState({ show })
    }


    render() {
        const { show } = this.state
        const display = show ? "none" : "block"
        return (
            <div>
                <div className="footer">
                    <img src={Logo} alt="logo" />
                    <div className="title">
                        <div><Link style={{ color: 'white' }} to="/Recommend">内部推荐</Link></div>
                        <div><Link style={{ color: 'white' }} to="/Recruit">内部招聘</Link></div>
                        <div onClick={this.handleClick}>个人中心</div>
                        <div className="showonly" style={{ display: display }}>
                            <div><Link style={{ color: 'white' }} to="/BasicInfo">基本信息</Link></div>
                            <div><Link style={{ color: 'white' }} to="/RecordRecru">投递记录</Link></div>
                            <div><Link style={{ color: 'white' }} to="/RecordRecom">推荐记录</Link></div>
                        </div>
                        <div><Link style={{ color: 'white' }} to="/user">用户管理</Link></div>
                        <div><Link style={{ color: 'white' }} to="/role">角色管理</Link></div> 
                        <div><Link style={{ color: 'white' }} to="/job">职位管理</Link></div> 
                    </div>
                </div>
            </div>
        )
    }
}
