import React,{Component} from 'react'
import { Modal,Button,Row,Col,Icon,Transfer } from 'antd';
import OwnFetch from '../../../api/OwnFetch';//封装请求



export default class AssignRoleDialog extends React.Component {
 
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      visible: true,
      noAssignData: [],  //所有角色数据
      AssignData: [],   //已分配角色数据
      userId: this.props.userId,
      key: 0,
    }
  }


    //加载所有的角色
    componentWillMount() { 

     //加载已选的角色
      let userId = this.props.userId
      OwnFetch("SYSTEM_USER_SELECTROLE","yhbh="+userId).then(res=>{
      if(res != undefined){
        let {AssignData,noAssignData} = res.data;
        this.setState({AssignData,noAssignData})
      }
    }) 

    }

    



  handleOk = () => {
    let leftData  = this.state.noAssignData;       //所有角色数据
    let userId = this.state.userId
    let rightData = this.state.AssignData;      //已分配角色数据
    let params ={};
    params.userId =  userId;
    params.roleIds =  rightData;
    this.setState({loading:true})
    OwnFetch("SYSTEM_USER_SETUSER",params).then(res=>{
       if(res != undefined){
          this.setState({loading:false})
          Modal.success({ title: '操作成功', content: "分配角色成功"});
          this.props.setDialogClose()
       }
     })      
  }

  handleCancel = () => {
    this.props.setDialogClose()
  }

  handleChange = (AssignData) => {
    this.setState({ AssignData });
  }

  render() {
    const { visible, loading, noAssignData, AssignData} = this.state
    return (
      <div>
        <Modal
          visible={visible}
          title='用户分配角色'
          width={650}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>,
            <Button key="submit" type="primary"  loading={loading} onClick={this.handleOk}>确定</Button>
          ]}
        >     
        {this.state.visible && <Transfer
            loading={false}
            dataSource={noAssignData}
            showSearch
            listStyle={{
              width: 250,
              height: 300,
            }}
            searchPlaceholder={"查找"}
            notFoundContent={""}
            titles={['未分配角色','已分配角色']}
            operations={[ '配置','取消']}
            targetKeys={AssignData}
            onChange={this.handleChange}
            render={item => item.value}
          />
          }
          
        </Modal>
      </div>
    )
  }
}
