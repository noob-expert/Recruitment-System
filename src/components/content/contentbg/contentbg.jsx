import React, { Component } from 'react'

// 引入图片
import contentbg from "../images/adminbg.jpg"

// 引入css样式
import "./contentbg.less"

export default class ContentBg extends Component {
    render() {
        return (
            <div className="bg">
                <img src={contentbg} alt=""/>
                <div className="searchban">
                <input className="search" type="text" placeholder="搜索职位" />
                <button>搜索</button>  
                </div>
                
                             

            </div>
        )
    }
}
