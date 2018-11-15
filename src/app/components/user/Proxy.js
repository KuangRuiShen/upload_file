

import React from 'react'
import { Table, Tooltip, Icon, Button, Modal } from 'antd';
import OwnFetch from '../../api/OwnFetch'; //封装请求
import EditMenoy from './EditMenoy';
import AddUser from './AddUser';
import UserInfo from './UserInfo';

export default class Proxy extends React.Component {

  state = {
    loading: false,
    dataSource: [],
    showMenoy: false,
    editData: {},
    userId: "",
    roleId: "",
    sign: true
  }


  componentDidMount() {
    if (this.props.userId) {
      this.setState({ userId: this.props.userId }, this.initLoadData)
    }

  }

  //默认加载
  initLoadData = () => {
    this.setState({ loading: true })
    OwnFetch("buckle/mange", { userId: this.state.userId })
      .then(res => {
        if (res && res.code == "200") {
          this.setState({ dataSource: res.data })
        }
        this.setState({ loading: false })
      })
  }

  editOnClick = (record) => {
    this.setState({ showMenoy: true, editData: record })
  }

  closePage = () => {
    this.setState({ showMenoy: false, showAdd: false })
  }


  onDelete = (record) => {
    Modal.confirm({
      title: "确定删除",
      content: "确定删除",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        OwnFetch("user_delete", { id: record.id }).then(res => {
          if (res && res.code == 200) {
            Modal.success({ title: "删除成功" });
            this.initLoadData();
          }
        });
      }
    });
  }

  onQuery = (record) => {
    if(record.people > 0){
      this.setState({ roleId: record.id, sign: false })
    }else{
      Modal.info({title:'没有邀请人数'});
    }
   
  }


  columns = [{
    title: '管理员Id',
    dataIndex: 'id',
  }, {
    title: '管理员名称',
    dataIndex: 'name',
  }, {
    title: '联系方式',
    dataIndex: 'phone',
  }, {
    title: '邀请的人数',
    dataIndex: 'people',
    render: (text, record, index) => <a onClick={() => this.onQuery(record)}>{text}</a>
  }, {
    title: '总金额(元)',
    dataIndex: 'total',
    render: (text, record, index) => Number(text / 100)
  }, {
    title: '操作',
    key: 'operate',
    render: (text, record, index) => (<div>
      <Tooltip title="修改信息">
        <Icon type="edit" style={{ fontSize: 16, cursor: 'pointer', color: '#03aaf4', marginRight: '10px' }}
          onClick={() => this.editOnClick(record)} />
      </Tooltip>
      <Tooltip title="删除">
        <Icon type="delete" style={{ fontSize: 16, cursor: 'pointer', color: '#03aaf4' }} onClick={() => this.onDelete(record)} />
      </Tooltip>
    </div>
    ),
  }]

  render() {

    return <div className="new_div_context">
      {this.state.sign ? <div>
        <div style={{ padding: '20px' }}>
          <Button type="primary" icon='plus'
            style={{ marginLeft: '10px', backgroundColor: '#1dc3b0', border: 'none' }}
            onClick={() => this.setState({ showAdd: true, editData: {} })}>新增管理员</Button>
        </div>
        <Table
          rowKey="id"
          size="small"
          dataSource={this.state.dataSource}
          columns={this.columns}
          loading={this.state.loading}
          pagination={{
            // current: this.state.page,
            // pageSize:this.state.pageSize,
            // total: this.state.total,
            showTotal: (total, range) => `当前${range[0]}-${range[1]}条 总数${total}条`,
            // showQuickJumper: true,
            // onChange: this.pageChange,
          }}
        />
        {this.state.showMenoy && <EditMenoy
          editData={this.state.editData}
          closePage={this.closePage}
          refresh={this.initLoadData} />}
        {this.state.showAdd && <AddUser
          userId={this.state.userId}
          editData={this.state.editData}
          closePage={this.closePage} refresh={this.initLoadData} />}
      </div> : <div>
          <div style={{ float: 'right', marginRight: '20px' }}>
            <Button type="primary"
              onClick={() => this.setState({ sign: true })}>返回</Button></div>
          <UserInfo userId={this.state.roleId} />
        </div>}


    </div>
  }

}