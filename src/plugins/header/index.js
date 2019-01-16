import React from 'react'
import { Route, Router, Link } from 'react-router-dom'
import { Menu, Icon, Layout, Row, Col, Dropdown, Popover, Button, Avatar, Badge, List, Tabs, Tag } from 'antd'

import { connect } from 'react-redux'
import {userLogout} from "../../redux/actions/login"

import NoticeIcon from '../noticeIcon'

import touxiang from '../../../assets/images/Biazfanxmam.png'
import styles from './index.css'

import {themeUl} from '../../utils/util'//主题数据
import PassworkPage from './PasswordPage';

const { Header } = Layout
const TabPane = Tabs.TabPane;

@connect((state) => {
    let { dispatch,login } = state
    return { dispatch,login}
})

export default class Top extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '超级管理员',
            themeLi:themeUl,
            themeNum:0,
            passwork:false,
            user:{}
        }
    }
    componentWillMount(){    
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        // console.info(this.props.login);
        if(this.props.login.data){
            this.setState({
                user: this.props.login.data,
            })
            if(this.props.login.data.username != 'admin'){
                this.setState({username:'普通用户'})
            }else{
                this.setState({username:'超级管理员'})
            }
        } else{
        
        //    location.href="#/login";
        } 
    }

    closePage=()=>{
        this.setState({passwork:false})
    }

    handleClick=(e)=>{
        if(e.key == 'logout'){
            // post('/auth/logout').then(res=>{
            //     if(res && res.code == 200 ){
                    //退出
                     userLogout(this.props.dispatch);
                // }
            // })
        }
        if(e.key == "passwork"){
            this.setState({passwork:true})
        }
    }


    render() {
        const menu = (
            <Menu className='menu' selectedKeys={[]} onClick={this.handleClick}>
                <Menu.Item key="passwork"><Icon type="lock" />修改密码</Menu.Item>
                <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );

        return (
            <Header className='header'>
                <Row>
                    <Col span={12}>
                        <Icon
                            className="trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                            style={{ fontSize: 20, marginLeft: 20, cursor: 'pointer' }}
                        />
                    </Col> 
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <div className='top-nav'>
                            <Dropdown overlay={menu}>
                                <span className='action account'>
                                    <Avatar size="small" className='avatar' src={touxiang} />
                                    <span className='name'>{this.state.user.username}</span>
                                </span>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
                {this.state.passwork && <PassworkPage user={this.state.user} closePage={this.closePage}/>}
            </Header>
        )
    }
}