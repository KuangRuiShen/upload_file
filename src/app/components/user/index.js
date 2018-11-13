import React from "react";
import Top from "../../../plugins/header";
import { Breadcrumb, Table, Button, Form, DatePicker, Select } from "antd";
import OwnFetch from "../../api/OwnFetch"; //封装请求
import { connect } from "react-redux";

@connect(state => {
  let { dispatch, login } = state;
  return { dispatch, login };
})
export default class UserIndex extends React.Component {
  state = {
    role: {}
  };



  componentWillMount() {
    if (this.props.login.data) {
      console.info(this.props.login.data)
      this.setState({ id: this.props.login.data.id }, this.initLoadData);
    } else {
      location.href = "#/login";
    }
  }

  //默认加载
  initLoadData = () => {

  }



  render() {
    //表单数据操作

    return (
      <div>



      </div>)
  }
}
