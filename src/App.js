import React, {Component} from 'react';
import './App.css';

// 引入子组件
import Login from "./pages/login"
import Main from "./pages/main"

// 引入网络处理模块，进行验证
// import {request} from "./network/request"
// 引入antd，进行验证
// import {Button} from "antd"

import {Switch,Route} from "react-router-dom"

class App extends Component {

  // 前后端交互验证成功
// handleClick=()=>{
//   request({url:"/aaa"}).then(res=>{
//     console.log(res);
//   },err=>{
//     console.log(err);
//   })
// }

  render() {
    return (
      <div className="App">
        <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Main}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
