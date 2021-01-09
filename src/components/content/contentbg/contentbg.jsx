import React, { Component } from 'react'

// 引入图片
import contentbg from "../images/adminbg.jpg"

//引入发布与订阅方式
import PubSub from "pubsub-js" 

// 引入css样式
import "./contentbg.less"

export default class ContentBg extends Component {

    // 点击搜索后获取当前内容，并返回后台查询
    handleClickSearchJob=()=>{
        // console.log(this.searchJob.value);
        PubSub.publish("SearchJob",this.searchJob.value)
    }


    render() {
        return (
            <div className="bg">
                <img src={contentbg} alt=""/>
                <div className="searchban">
                <input style={{outline:'none'}} className="search" type="text" placeholder="搜索职位" ref={input=>this.searchJob=input}/>
                <button style={{outline:'none'}} onClick={this.handleClickSearchJob}>搜索</button>  
                </div>
                
                             

            </div>
        )
    }
}
