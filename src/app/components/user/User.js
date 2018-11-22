import React from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import UserInfo from './UserInfo';
import Proxy from './Proxy';

@connect(state => {
  let { dispatch, login } = state;
  return { dispatch, login };
})

export default class User extends React.Component {
  state = {
    key: '1',
    userId: "",
  };

  componentDidMount() {
    // if (this.props.userId) {
    //   this.setState({ userId: this.props.userId })
    // }
  }



  callback = (key) => {
    this.setState({ key })
  }


  render() {
    const TabPane = Tabs.TabPane;
    return (
      <Tabs activeKey={this.state.key} style={{ marginBottom: 0 }} onChange={this.callback}>
        <TabPane tab="个人信息" key="1">{this.state.key == '1' && <UserInfo userId={this.props.userId} />}</TabPane>
        <TabPane tab="代理信息" key="2">{this.state.key == '2' && <Proxy userId={this.props.userId}  />}</TabPane>
      </Tabs>
    );
  }
}
