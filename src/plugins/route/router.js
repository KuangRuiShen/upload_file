import React from 'react'
import { connect } from 'react-redux'
import { Route, Router, Link, Redirect, Switch } from 'react-router-dom'
import {Layout, Icon, Menu} from 'antd';
import createHistory from 'history/createHashHistory'
import { Scrollbars } from 'react-custom-scrollbars';
import SideBar from '../../app/route/sidebar'

/*工具类*/
import {getSize} from '../../utils/util'

/*公用组件*/
import NavigationBar from '../navigationBar/index'
import Top from '../header/index'

/*数据*/
import { allMenu } from '../../app/route/menu' //左侧菜单数据

/*模块*/
import Login from '../login/index'//登录

import login_tu from  '../../../assets/images/login.png';


/********************以下是自己写的业务模块开始***************************/

//
import Video from '../../app/components/video/Video';//视频
import Category from '../../app/components/video/Category';//分类

//系统管理
import UserTab from '../../app/components/SystemManage/User/UserTab';

/********************以上是自己写的业务模块结束***************************/

const { Sider, Content } = Layout;
const history = createHistory()

@connect((state) => {
    const { login,dispatch } = state
    return { login,dispatch}
})

export default class GlobalRoute extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            expandedKeys: [],
            theme:'light',
        }
    }

  
    componentWillMount() {
        window.dispatch = this.props.dispatch;
        this.goLogin();
    }

    componentWillUpdate(newProps,newState) {
    
        //已经登录
        if(newProps.login.data){
            // history.replace
            let url = window.location.href.split("#")[1];
            if ((url==="/login") || (url==="login") || (url==="/")) {
                  history.replace({pathname:'/index'})              
            }
        }else{
            history.replace({pathname:'/login'})
        }

       
    }


    goLogin=()=>{
        if(this.props.login.data){
            let url = window.location.href.split("#")[1];
            if ((url==="/login") || (url==="login") || (url==="/")) {
                  history.replace({pathname:'/index'})              
            }
        }else{
            history.replace({pathname:'/login'})
        }
    }


    //菜单收缩
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    changeTheme=(e)=>{
        this.setState({
            theme:e
        })
    }

    render() {
        const { SubMenu } = Menu;

        return (
            <Router history={history}>
                <Route render={({ location }) => {
                    return (<div style={{ width: '100%', height: '100%',overflow:'hidden' }}>
                                <Switch location={location}>
                                    <Route location={location} exact path="/" render={() => (<Redirect to="/login"/>)}/>
                                    <Route location={location} path="/login" render={() => <Login/>}/>
                                    <Route location={location} render={({location}) => {
                                        return (<div style={{height: '100%'}}>
                                                <Layout style={{height: '100%'}}>
                                                    {/* 左侧菜单栏 */}                                              
                                                   <Sider
                                                        trigger={null}
                                                        collapsible
                                                        collapsed={this.state.collapsed}
                                                        width={200}
                                                        className='sider_menu' >
                                                            <div className="logo">
                                                           { this.state.collapsed ? <img style={{height:64}} src={login_tu} />: 
                                                           <span style={{fontSize:'20px',color:'white'}}>管理平台</span> }      

                                                            </div>
                                                         <Scrollbars>
                                                            <SideBar theme={this.state.theme} collapsed={this.state.collapsed} />   
                                                        </Scrollbars >                                          
                                                    </Sider>                                                                               
                                                    <Layout>                                                
                                                        {/* 头部公用组件 */}
                                                        <Top collapsed={this.state.collapsed} toggle={this.toggle}
                                                             changeTheme={this.changeTheme}/>
                                                            <NavigationBar allMenu={allMenu}/>
                                                            <Scrollbars >  
                                                            <Content style={{minHeight: getSize().windowH - 108}}>  

                                                            <Switch location={location} key={location.pathname.split('/')[1]}>

                                                                    <Route location={location} path="/index" render={() => <Category location={location} />} />
                                                                    <Route location={location} path="/video" render={() => <Video location={location}/>}/>
                                                                    <Route location={location} path="/userTab" render={() => <UserTab location={location}/>}/>
                                            
                                                
                                                            </Switch>                                                                                    
                                                            </Content>                                                      
                                                        </Scrollbars>
                                                    </Layout>
                                                </Layout>
                                            </div>
                                        )
                                    }}/>
                                </Switch>
                            </div>                                     
                    )
                }} />
            </Router>
        );
    }
}