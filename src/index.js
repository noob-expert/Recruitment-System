import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "antd/dist/antd.less"

import "./assets/css/normalize.css"

// 引入路由器
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
// 使用Router来管理整个应用
<Router><App /></Router>
, document.getElementById('root'));

