import React from "react";
import Top from "../../../plugins/header";
import { Breadcrumb, Table, Button, Form, DatePicker, Select } from "antd";
import OwnFetch from "../../api/OwnFetch"; //封装请求
import { connect } from "react-redux";

@connect(state => {
  let { dispatch, login } = state;
  return { dispatch, login };
})
export default class User extends React.Component {
  state = {
    collapsed: false,
    dataSource: [],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
    way: "all", //支付方式,
    id: ""
  };

  //菜单收缩
  toggle = () => {
    // this.setState({
    //     collapsed: !this.state.collapsed,
    // });
  };

  changeTheme = e => {
    this.setState({
      theme: e
    });
  };

  componentWillMount() {
    if (this.props.login.data) {
      // console.info(this.props.login.data)
      this.setState({ id: this.props.login.data.id }, this.initLoadData);
    } else {
      location.href = "#/login";
    }
  }

  //默认加载
  initLoadData = () => {
    this.setState({ loading: true });
    OwnFetch("system_total", { id: this.state.id }).then(res => {
      if (res && res.code == "200") {
        let { list, total } = res.data;
        // console.info("aaaa",res.data)
        if (list) {
          this.setState({ dataSource: list, total });
        }
      }
      this.setState({ loading: false });
    });
  };

  columns = [
    {
      title: "用户id",
      dataIndex: "id"
    },
    {
      title: "交费日期",
      dataIndex: "recharge_time"
    },
    {
      title: "到期日期",
      dataIndex: "valid_time"
    },
    {
      title: "用户等级",
      dataIndex: "roleText"
    },
    {
      title: "推广人id",
      dataIndex: "invite_id"
    },
    {
      title: "推广人",
      dataIndex: "name"
    },
    {
      title: "支付方式",
      dataIndex: "trade_type",
      render: (text, record, index) =>
        text == "WX" ? "微信支付" : "支付宝支付"
    }
    // {
    //   title: "总充值金额(元)",
    //   dataIndex: "total",
    //   render: (text, record, index) => Number(text / 100)
    // }
  ];

  payChange = value => {
    this.setState({ way: value });
  };

  //重置
  onRest = () => {
    this.setState(
      {
        way: "all"
      },
      this.initLoadData
    );
  };

  //获取当前统计数
  getTotal = value => {
    let style = { color: "red", marginLeft: "5px" };
    if (!value) {
      return <span style={style}>0 元</span>;
    }
    return <span style={style}>{value + "元"}</span>;
  };

  render() {
    //表单数据操作
    const FormItem = Form.Item;
    const { RangePicker } = DatePicker;
    const Option = Select.Option;
    let totalData = this.state.totalData;

    return (
      <div>
        <Top
          collapsed={this.state.collapsed}
          toggle={this.toggle}
          changeTheme={this.changeTheme}
        />
        <div id="Breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item key={1}>{"用户信息查看"}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="new_div_context">
          {/* <div style={{margin:"10px"}}> 
				  <Button style={{marginRight:15}} onClick={()=>this.getChangeDate(1)}>今天</Button>
				  <Button style={{marginRight:15}} onClick={()=>this.getChangeDate(2)}>昨天</Button>
				  <Button style={{marginRight:15}} onClick={()=>this.getChangeDate(3)}>本月至今</Button>
				  <Button style={{marginRight:15}} onClick={()=>this.getChangeDate(4)}>上个月</Button>  
				  </div> */}
          {/* <Form layout="inline" style={{ marginLeft: 10 }}>
            <FormItem label="交费时间">
              <RangePicker
                // showTime={{ format: 'HH:mm:ss' }}
                value={this.state.time}
                onChange={this.timeonChange}
                format="YYYY-MM-DD"
              />
            </FormItem>

            <FormItem label="支付方式">
              <Select
                style={{ width: 200 }}
                value={this.state.way}
                onChange={this.payChange}
              >
                <Option key="all">所有</Option>
                <Option key="WX">微信</Option>
                <Option key="ALI">支付宝</Option>
              </Select>
            </FormItem>

            <FormItem>
              <Button type="primary" icon="search" onClick={this.onSearch}>
                查询
              </Button>
              <Button
                type="Default"
                icon="reload"
                onClick={this.onRest}
                style={{ marginLeft: "10px" }}
              >
                重置
              </Button>
            </FormItem>

            <FormItem style={{ float: "right", marginLeft: "20px" }} />
          </Form> */}
          <div style={{ margin: "10px" }}>
            <Button type="primary" icon="search" onClick={this.initLoadData}>
              查询
            </Button>
          </div>

          <div>
            <div style={{ fontSize: "18px", margin: "15px 0px" }}>
              <span style={{ margin: "18px" }}>
                总金额:
                {this.getTotal(this.state.total)}
              </span>
              {/* <span style={{ margin: "18px" }}>
                包周:
                {this.getTotal(totalData.r1)}
              </span>
              <span style={{ margin: "18px" }}>
                包月:
                {this.getTotal(totalData.r2)}
              </span>
              <span style={{ margin: "18px" }}>
                包季:
                {this.getTotal(totalData.r3)}
              </span>
              <span style={{ margin: "18px" }}>
                包年:
                {this.getTotal(totalData.r4)}
              </span>
              <span style={{ margin: "18px" }}>
                永久:
                {this.getTotal(totalData.r5)}
              </span> */}
            </div>
            <Table
              size="small"
              rowKey={(record, index) => index}
              dataSource={this.state.dataSource}
              columns={this.columns}
              loading={this.state.loading}
              pagination={{
                // current: this.state.page,
                pageSize: 15,
                // total: this.state.total,
                showTotal: (total, range) =>
                  `当前${range[0]}-${range[1]}条 总数${total}条`
                // showQuickJumper: true,
                // onChange: this.pageChange,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
