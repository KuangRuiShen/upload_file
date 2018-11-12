import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import {fetchHomePageData} from '../actions'
import { Layout, Menu, Breadcrumb, Icon, DatePicker, Button } from 'antd'
import Header from '../../../components/common/Header/Header'
import getSize from '../../../utils/getSize'
import css from './bar.css'

import baobiao from './images/baobiao-normal.png'
import duanwang from './images/duanwang-normal.png'
import rizhi from './images/rizhi-normal.png'
import shangwang from './images/shangwang-normal.png'
import home from './images/home-normal.png'
import xitong from './images/xitong-normal.png'
import zhankai from './images/zhankai-normal.png'
import zichang from './images/zichang-normal.png'

@connect(state => ({hashUrl:state.hashUrl}))
class LeftNavBar extends Component {
	constructor() {
        super()
        this.state = {
			theme: 'dark',
			keynum:['1'],
			openKeys: [''],
			collapsed: false,
        }
    }
	setMenuActive = (currentUrl) => {
		let list=[];
		for(var i in this.tablist){
			let listdata={}
			if(this.tablist[i].children){
				let b=this.tablist[i].children
				for(var i in b){
					let c={};
					c.url=b[i].LinkTo;
					c.key=b[i].key;
					list.push(c);
				}
			}else{
				listdata.url=this.tablist[i].LinkTo
				listdata.key=this.tablist[i].key;
				list.push(listdata);
			}
		}
		for(var e in list){
			if(currentUrl.indexOf(list[e].url)>-1){
				let n=list[e].key;
				let li=[];
				li.push(n);
			  	this.setState({ keynum: li });
			  	if(n.indexOf('-')<0){
			  		this.setState({openKeys:['']});
			  	}else{
			  		let f=[];
			  		f.push((n.split('-'))[0]);
			  		this.setState({openKeys:f});
			  	}
			  	return false;
			}
		}
	}
	onOpenChange = (openKeys) => {
	    const state = this.state;
	    let nextOpenKeys = [];
	    if(openKeys.length>1){
	       nextOpenKeys.push(openKeys[openKeys.length-1]);  
	    }else{
	       nextOpenKeys=openKeys;
	    }
	    if(this.state.collapsed==true){
	    	this.toggle();
	    }
	    this.setState({ openKeys: nextOpenKeys });
  	} 
  	toggle = () => {
  		let n=!this.state.collapsed;
	    this.setState({
	      collapsed: !this.state.collapsed,
	      openKeys:['']
	    });
	    this.props.callbackParent(n);
	  }
	tablist = [{
				title:'总览',LinkTo:'/home',img:home,key:'1'
			},
			{
				title:'主机管理',LinkTo:'/cloudHost',img:home,key:'2'
			},{
				title:'空间管理',LinkTo:'/space',img:duanwang,key:'3'   					
			},{
				title:'项目管理',img:duanwang,key:'41',children:[
   					{title:'基线版本',LinkTo:'/project',img:'',key:'41-1'},
   					{title:'项目版本',LinkTo:'/branch',img:'',key:'41-2'}
   				]
			},{
				title:'镜像管理',img:duanwang,key:'5',LinkTo:'/image'
			},{
				title:'应用管理',img:shangwang,key:'6', children:[
				   {title:'基线版本',LinkTo:'/AppBasicVersion',key:'6-1'},
				   {title:'项目版本',LinkTo:'/AppProjectVersion',key:'6-2'},
				]
			},{
				title:'部署管理', LinkTo:'/deployment', img:shangwang,key:'7'
			},
			{
				title:'容器管理',LinkTo:'/container',img:home,key:'8'
			},
			{
				title:'存储管理',LinkTo:'/storage',img:home,key:'9'
			},{
				title:'服务管理',img:home,key:'10',children:[
				    {title:'服务注册',LinkTo:'/register',key:'10-1'},
					{title:'服务监控',LinkTo:'/service',key:'10-2'},
					{title:'参数配置',LinkTo:'/conf',key:'10-3'},
				]
			},{
				title:'数据源管理',LinkTo:'/DbResource',img:zichang,key:'11'
			},
			{
				title:'接口管理',img:xitong,key:'12',children:[
					{title:'接口编排',LinkTo:'/interfaceTab',key:'12-1'},
					{title:'接口监控',LinkTo:'/monitorInterface',key:'12-3'},
					{title:'接口跟踪',LinkTo:'/interfaceTrace',key:'12-4'},
					{title:'安全策略',LinkTo:'/interfacePolicy',key:'12-5'},
					{title:'第三方应用管理',LinkTo:'/third',key:'12-6'},
				]
			},
			{
				title:'调度管理',LinkTo:'/schedule',img:home,key:'13'
			},		
			{
				title:'系统管理',img:baobiao,key:'14',children:[
  					{title:'组织机构管理',LinkTo:'/organization',key:'14-1'},
  					{title:'用户组管理',LinkTo:'/userGroup',key:'14-2'},
  					{title:'用户管理',LinkTo:'/userInfo',key:'14-3'},
  					{title:'角色管理',LinkTo:'/roleInfo',key:'14-4'},
					{title:'授权管理',LinkTo:'/accreditInfo',key:'14-5'},
					{title:'参数设置',LinkTo:'/home',key:'14-6'},
					{title:'用户反馈',LinkTo:'/feedBack',key:'14-7'},
					{title:'策略管理',LinkTo:'/strategyInfo',key:'14-8'}
  				]
			},{
				title:'账户中心', img:xitong,key:'15',children:[
				{title:'我的账户',LinkTo:'/myAccount',key:'15-1'},
				{title:'我的团队',LinkTo:'/team',key:'15-2'},
				{title:'充值中心',LinkTo:'/recharge',key:'15-3'},
				{title:'消费记录',LinkTo:'/consume',key:'15-4'},
				{title:'充值记录',LinkTo:'/record',key:'15-5'},
				]
			},{
				title:'预警管理',img:xitong,key:'16',children:[
					{title:'预警策略',LinkTo:'/logQuery',key:'16-2'},
					{title:'预警日志',LinkTo:'/logAnalysis',key:'16-3'},
				]
			},{
				title:'日志分析',img:xitong,key:'17',children:[
					{title:'日志查询',LinkTo:'/logQuery',key:'17-1'},
					{title:'日志分析',LinkTo:'/logAnalysis',key:'17-2'},
					{title:'日志审计',LinkTo:'/logAudit',key:'17-3'},
				]
			},{
				title:'拓扑图(待删除)',LinkTo:'/topo',img:home,key:'18'
			}
	]
	componentWillMount() {
		this.setMenuActive(this.props.hashUrl.currentUrl);
		let n=getSize().windowW;
		if(n<1280){
			 this.setState({collapsed: !this.state.collapsed});
			 this.props.callbackParent(!this.state.collapsed);
		}
	}
	componentWillUpdate(newProps,nextState) {
		if (this.props.hashUrl.currentUrl != newProps.hashUrl.currentUrl) {
			this.setMenuActive(newProps.hashUrl.currentUrl)
    	}
  } 
  render() {
    var cardData = this.props.initObj;
		const { SubMenu } = Menu;
		const { dispatch, menuState, hashUrl } = this.props;
		const { Content, Footer, Sider, Header } = Layout;
		
    return (
    	 <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
    	<div>
		    	<li className={css.tabbtn}>
		    		<Icon
			              className={css.tigger}
			              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
			              onClick={this.toggle}
			            />
		    	</li>
  				<Menu       
	                theme={this.state.theme}
	               	mode='vertical'   
	                style={{ height: '660px',backgroundColor:'#272a33'}}
	                onOpenChange={this.onOpenChange}
	                defaultSelectedKeys={['1']}
	                selectedKeys={this.state.keynum}
	                openKeys={this.state.openKeys}
	                onClick={(item,key)=>{
	                	if(item.key.indexOf('-')<0){
	                		this.setState({openKeys:['']})
	                	}
	                }
	              }
	                  >
	                 {
	                 	this.tablist.map((i,index)=>{
	                 		if(i.children){
	                 			return 	<SubMenu key={i.key} title={<span><img src={i.img} style={{ verticalAlign: 'middle',marginRight:'10px'}}/><span>{i.title}</span></span>}>
	                 						{
	                 							i.children.map((c,index)=>{
	                 								return <Menu.Item key={c.key}>
								                 				<Link to={c.LinkTo}>
										                 				<span>
										                 					<img src={c.img} style={{ verticalAlign: 'middle',marginRight:'10px'}}/>
										                 					{c.title}
										                 				</span>
										                 		</Link>
															</Menu.Item> 
	                 							})
	                 						}
								        </SubMenu>	
	                 			
	                 		}else{
		                 		return <Menu.Item key={i.key}>
			                 				<Link to={i.LinkTo}>
					                 				<span>
					                 					<img src={i.img} style={{ verticalAlign: 'middle',marginRight:'10px'}}/>
					                 					{i.title}
					                 				</span>
					                 		</Link>
										</Menu.Item>	
	                 		}
	                 		
	                 	})
	                 }
                </Menu>
        </div>
          </Sider>
    )
  }
}

export default LeftNavBar;
