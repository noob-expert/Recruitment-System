import React, { Component } from 'react'

// 引入CSS样式
import "./index.css";
import { Form, Input, Button, Checkbox, message } from "antd";

// react中img引入logo图片方式，不可以直接在jsx中相对路径引入
import logo from "./images/fh.jpg";

// 引入表单
import { Login } from "../../network/index"

export default class login extends Component {
    onFinish = async values => {
        const { username, password } = values;
        const result = await Login(username, password)
        // const result=await LoginPOST(username,password)
        if (!result.data) {
            message.error("邮箱/密码错误")
        } else {
            // 跳转页面
            message.success("登录成功")
            this.props.history.replace('/')
        }
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            // antd Form表单引入
            <div className="login-index">
                <img src={logo} alt="logo" />
                <div className="header">
                    <h2>密码登录</h2>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入邮箱' },
                                {
                                    type: 'email',
                                    message: '这不是一个有效的邮箱',
                                    
                                },
                                {
                                    // 正则表达式判断
                                    pattern: /^[a-zA-Z0-9@.]*$/, message: "请输入合法字符"
                                }
                                //  {
                                //     min: 4, message: "用户名至少4位"
                                // }
                            ]}
                        >
                            <Input placeholder="请输入用户名/邮箱" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox style={{ 'fontSize': '0.6rem' }}>记住账号</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button block='false' type="primary" shape="round"
                                htmlType="submit" style={{ 'fontSize': '0.7rem', 'width': '10rem', 'height': '2rem' }}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <footer>
                    <p>@2020 Liubaojun.ltd</p>
                    <p>个人前端项目测试网站</p>
                    <a href={"http://beian.miit.gov.cn"}>晋ICP备2020013886号</a>
                </footer>
            </div>
        )
    }
}

