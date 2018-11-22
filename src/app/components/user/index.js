import React from "react";
import { connect } from "react-redux";
import UserInfo from './UserInfo';//代理信息
import User from './User';//用户信息
import { Button, Modal } from "antd";
import Top from '../../../plugins/header'

@connect(state => {
  let { dispatch, login } = state;
  return { dispatch, login };
})
export default class UserIndex extends React.Component {
  state = {
    user: {},
    showinfo: true,//展示当个信息
    // userId: 1,
  };



  componentWillMount() {
    let user = this.props.login.data;
    if (user) {
      this.setState({ user });
      if (user.type == 2) {
        this.setState({ showinfo: false })
      } else {
        this.setState({ showinfo: true })
      }
    } else {
      location.href = "#/login";
    }
  }

  //默认加载
  initLoadData = () => {

  }

  onDown = () => {
    // console.info(this.state.user)
    if (this.state.user.url) {
      location.href = `${this.state.user.url}`;
    } else {
      Modal.info({ title: "下载apk没有上传！" })
    }
  }



  render() {
    //表单数据操作
    return (
      <div>
        <Top />
        <div style={{ padding: '10px' }}>
          <Button type="primary" icon="down" onClick={this.onDown}>下载apk</Button>
        </div >
        <div style={{overflow:'auto'}}>
          {this.state.showinfo ? <User userId={this.state.user.user_id} /> : <UserInfo userId={this.state.user.user_id} />}
        </div>
      </div>
    )
  }
}
