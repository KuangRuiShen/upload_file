import { Tabs } from 'antd';
import React from 'react'

import UserTab from './UserTab';
import MenoyTab from './MenoyTab';
import Setmeal from '../Setmeal/Setmeal'
import Order from '../Order/Order';
import Charging from '../Charging/Charging';



const TabPane = Tabs.TabPane;
export default class ManageTab extends React.Component {
    state={
        key :'1',
    }

    callback=(key) =>{
       this.setState({key})
      }




    render(){
        return (<Tabs activeKey={this.state.key} style={{marginBottom:0}} onChange={this.callback}>
                <TabPane tab="所有用户" key="1">{this.state.key =='1' && <UserTab  />}</TabPane>
                <TabPane tab="所有商户单号" key="4">{this.state.key =='4'&&<Order />}</TabPane>
                <TabPane tab="管理员统计" key="2">{this.state.key =='2'&&<MenoyTab />}</TabPane>

                <TabPane tab="套餐费用设置" key="3">{this.state.key =='3'&& <Setmeal />}</TabPane>
                <TabPane tab="收费统计" key="5">{this.state.key =='5'&& <Charging />}</TabPane>
        </Tabs>)
    }

}