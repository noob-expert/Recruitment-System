import React, { Component } from 'react'

import { Link, withRouter } from "react-router-dom"

// 引入模态框
import { Modal } from "antd"

// 引入时间戳
import {formatDate} from "../../utils/timestamp.js"

// 引入样式
import "./leftnav.less"
import Logo from "../../assets/image/fh.jpg"

// 引入本地localStorage
import methods from "../../utils/storageUtils"

// 定义模态框函数
const { confirm } = Modal

let Interval

class LeftNav extends Component {
    state = {
        show: true,
        currentUser: '',
        currentTime: ''
    }

    handleClick = () => {
        let { show } = this.state;
        show = !show
        this.setState({ show })
    }


    handlexitClick = (event) => {
         // 去掉默认行为
         event.preventDefault()
        confirm({
            title: '你确定要退出登录吗',
            onOk: () => {
                console.log('OK');
                // 移除用户名
                methods.removeUser()
                // 跳转至首页
                // console.log(this.props);
                this.props.history.replace('/login')
            },
            onCancel:()=> {
                console.log('Cancel');
            },
        });
    }

    getTime=()=>{
        const currentTime=formatDate(Date.now())
        this.setState({currentTime})
    }

    componentWillMount() {
        // console.log(methods.getUser())
        let currentUser = methods.getUser()
        if (JSON.stringify(currentUser) == '{}') {
            // 为空则跳转至登录页
            this.props.history.replace('/login')
        } else {
            this.setState({ currentUser })
        }
        this.getTime()
    }

    componentDidMount(){
        Interval=setInterval(()=>{
            this.getTime()
        },1000)
    }

    componentWillUnmount(){
        clearInterval(Interval)
    }

    render() {
        const { show } = this.state
        const display = show ? "none" : "block"
        const { currentUser,currentTime} = this.state
        return (
            <div>
                <div className="footer">
                    <img src={Logo} alt="logo" className="logo" />
                    <div className="title">
                        <div><Link style={{ color: 'white' }} to="/Recommend">内部推荐</Link></div>
                        <div><Link style={{ color: 'white' }} to="/Recruit">内部招聘</Link></div>
                        <div onClick={this.handleClick} className="profile">个人中心</div>
                        <div className="showonly" style={{ display: display }}>
                            <div><Link style={{ color: 'white' }} to="/BasicInfo">基本信息</Link></div>
                            <div><Link style={{ color: 'white' }} to="/RecordRecru">投递记录</Link></div>
                            <div><Link style={{ color: 'white' }} to="/RecordRecom">推荐记录</Link></div>
                        </div>
                        <div><Link style={{ color: 'white' }} to="/user">用户管理</Link></div>
                        <div><Link style={{ color: 'white' }} to="/role">角色管理</Link></div>
                        <div><Link style={{ color: 'white' }} to="/job">职位管理</Link></div>
                    </div>
                    <div className="user">
                        <div className="user-top">
                            <span>你好, {currentUser}</span>
                            <a href="javascript;;" onClick={this.handlexitClick}>退出</a>
                        </div>
                        <div className="user-bottom">
                            <p>{currentTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftNav)
