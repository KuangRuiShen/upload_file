import React, { Component, PropTypes } from 'react';
import { Form, Icon, Modal, Input, Button, Checkbox, Tabs, Row, Col } from 'antd';
import { connect } from 'react-redux';
import {userLogin} from "../../redux/actions/login";
// import {decode} from '../../utils/util';//加密
const FormItem = Form.Item;

import styles from './index.css';
// import logo from '../../../assets/images/logo-l.png';
import bg from '../../../assets/images/bg.jpg';

@connect((state) => {
    let { dispatch } = state
    return { dispatch }
})


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: {},
            count: 0,
            code:"",
        };
    }

    componentWillMount () {
        // console.log(hex_md5('Lianyi123456'));
    }
    
    handleAccountSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let userName = values.userName;
            let password = values.password;
            // console.info('userName',userName,'password:',password)
            this.props.dispatch(userLogin(userName, password))
            // location.href = '#/index';
        })
    }


    render() {
        const { type, count } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.container} style={{backgroundImage:`url(${bg})`}}>
                <div className={styles.content}>
                    <header style={{fontSize:'60px', marginBottom: 40, textAlign: 'center' }}>
                        <a href="javascript:;"> 
                           {/*<img alt="logo" src={login} />*/}
                          管理平台
                        </a>
                    </header>
                    <div className={styles.main}>
                                    <Form onSubmit={this.handleAccountSubmit}>
                                        <FormItem>
                                            {getFieldDecorator('userName', {
                                                rules: [{ required: true, message: '请输入您的账号！' }],
                                            })(
                                                <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: '请输入密码！' }],
                                            })(
                                                <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                                            )}
                                    </FormItem>
                              
                                        <FormItem>
                                            <Button className={styles.submit} type="primary" size="large" htmlType="submit">
                                                登录
                                            </Button>
                                            <a style={{ float: 'right' }} href="javascript:;">注册</a>
                                        </FormItem>
                                    </Form>
                    </div>
                </div>
            </div>
        )
    }
}
const Login = Form.create()(LoginPage);
export default Login
