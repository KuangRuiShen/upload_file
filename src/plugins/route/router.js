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

import Welcome from '../../app/components/welcome';//欢迎页

/********************以下是自己写的业务模块开始***************************/
import User from '../../app/components/user';

import Star from '../../app/components/Star/Star';//人
import Video from '../../app/components/video/Video';//视频
import Category from '../../app/components/video/Category';//分类
import Label from '../../app/components/Label';

//系统管理
import UserLogin from '../../app/components/system/UserPage';
import Pay from '../../app/components/pay'
import CccePay from '../../app/components/CccePay'
import UserTab from '../../app/components/SystemManage/User/ManageTab';
import Comment from '../../app/components/SystemManage/Comment/Comment';


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
            theme:'dark',
            isadmin:false,
        }
    }

  
    componentWillMount() {
        window.dispatch = this.props.dispatch;
        // this.goLogin();
    }

    componentWillUpdate(newProps,newState) {
        //已经登录
        // if(newProps.login.data){
        //     // history.replace
        //     let user = newProps.login.data;
        //     // console.info("newProps.login.data",user)
        //     if(user.username == 'admin'){
                
        //         if(!this.state.isadmin){
        //             this.setState({isadmin:true})
        //         }

        //         let url = window.location.href.split("#")[1];
        //         if ((url==="/login") || (url==="login") || (url==="/")) {
        //             history.replace({pathname:'/index'})              
        //         }
        //     }else{
        //         if(this.state.isadmin){
        //             this.setState({isadmin:false})
        //         }
        //         history.replace({pathname:'/user'})
        //     }
        // }else{
        //     history.replace({pathname:'/login'})
        // }

    }


    goLogin=()=>{
         
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
                                    <Route location={location} path="/user" render={() => <User location={location}/>}/>    
                                    <Route location={location} render={({location}) => {
                                        return (<div style={{height: '100%'}}>
                                                <Layout style={{minHeight: '100vh'}}>
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
                                                         
                                                            <SideBar theme={this.state.theme} collapsed={this.state.collapsed} />   
                                                                                              
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
                                                                    <Route location={location} path="/comment" render={() => <Comment location={location}/>}/>
                                                                    <Route location={location} path="/star" render={() => <Star location={location}/>}/>
                                                                    <Route location={location} path="/label" render={() => <Label location={location}/>}/>
                                                                    <Route location={location} path="/welcome" render={() => <Welcome location={location}/>}/>
                                                                    <Route location={location} path="/login_user" render={() => <UserLogin location={location}/>}/>           
                                                                    <Route location={location} path="/pay" render={() => <Pay location={location}/>}/>  
                                                                    <Route location={location} path="/cccepay" render={() => <CccePay location={location}/>}/>                                                                                                      
                                                                    <Route location={location} render={() => <Redirect to='/login' />} /> 
                                                
                                                            </Switch>                                                                                    
                                                            </Content>                                                      
                                                        </Scrollbars>
                                                    </Layout>
                                                </Layout>
                                            </div>
                                   )}}/>                         
                                   
                                </Switch>
                            </div>                                     
                    )
                }} />
            </Router>
        );
    }
}