import { Tabs } from 'antd';
import React from 'react'

import UserTab from './UserTab';
import MenoyTab from './MenoyTab';



const TabPane = Tabs.TabPane;
export default class ManageTab extends React.Component {






    render(){
        return (<Tabs defaultActiveKey="1"  style={{marginBottom:0}}>
                <TabPane tab="所有用户" key="1"><UserTab /></TabPane>

                <TabPane tab="管理员统计" key="2"><MenoyTab /></TabPane>
        </Tabs>)
    }

}