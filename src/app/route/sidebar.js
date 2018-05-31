import {allMenu} from "./menu";
import React from "react";
import {Layout, Icon, Menu} from 'antd';
import { Link } from 'react-router-dom'

export default class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: ['1'],
            theme: props.theme,
            selectedKeys: ['0101'],
        }
    }

    componentWillMount(){
        let curUrl = window.location.href.split('#')[1];
        let openKeys=[];
        let selectedKeys=[];
        allMenu.forEach(menu=>{
            if(menu.children){
                menu.children.forEach(item=>{
                    if(item.url == curUrl){
                        selectedKeys.push(item.key)
                        openKeys.push(menu.key)
                    }
                })
            }
        })
        this.setState({openKeys,selectedKeys})
        // console.info("ddd");

    }

    

    onOpenChange = (openKeys) => {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }

    getAncestorKeys = (key) => {
        const map = { key };
        return map[key] || [];
    }
    
    menuOnclik =(item)=>{
        let selectedKeys=[];
        selectedKeys.push(item.key)
        if(item.key.length == 1){      
            this.setState({selectedKeys,openKeys:[]})
        }else{
            this.setState({selectedKeys})
        }   
    }



    render(){
        const SubMenu = Menu.SubMenu;

        return(
            <Menu theme={this.state.theme}
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  openKeys={this.state.openKeys}
                  selectedKeys={this.state.selectedKeys}
                  onOpenChange={this.onOpenChange}
                  onClick={this.menuOnclik}
            >
                {allMenu.map((item, index) => {
                    if (item.children && item.children != '') {
                        let htmlct = [];
                        let menuItem = item.children.map((itemM, index) => {
                            return <Menu.Item key={itemM.key}><Link key={1}
                                                                    to={itemM.url}><Icon
                                type={itemM.icon}/>
                                <span>{itemM.name}</span></Link></Menu.Item>
                        })
                        htmlct.push(<SubMenu key={item.key} title={<span><Icon
                            type={item.icon}/><span>{item.name}</span></span>}>{menuItem}</SubMenu>)
                        return htmlct
                    } else {
                        return <Menu.Item key={item.key}><Link key={1} to={item.url}><Icon
                            type={item.icon}/> <span>{item.name}</span></Link></Menu.Item>
                    }
                })}
            </Menu>
        )
    }
}