import React, { Component, PropTypes } from 'react';
import {  Breadcrumb } from 'antd';

class NavigationBar extends React.Component{
    constructor() {
        super()
        this.state = {

        }
    }
    render(){
        let allMenu=this.props.allMenu;
        const curUrl = window.location.href.split('#')[1];
        let breadcrumbList = [];
        for (let i = 0; i < allMenu.length; i++) {
            if (allMenu[i].children) {
                for (let j = 0; j < allMenu[i].children.length; j++) {
                    if (allMenu[i].children[j].url == curUrl) {
                        breadcrumbList.push(allMenu[i], allMenu[i].children[j]);
                        document.title=allMenu[i].children[j].name+'-'+'管理平台'
                    }
                }
            } else {
                if (allMenu[i].url == curUrl) {
                    breadcrumbList.push(allMenu[i]);
                    document.title=allMenu[i].name+'-'+'管理平台'
                }
            }
        }
        return(
            <div id='Breadcrumb'>
                <Breadcrumb>
                    {breadcrumbList.map(item => (
                        <Breadcrumb.Item key={item.key}>{item.name}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        )
    }
}
export default NavigationBar;