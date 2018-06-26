
import React from 'react'
import {  Modal,Table,Select } from 'antd'
import OwnFetch from '../../../api/OwnFetch'; //封装请求

const Option = Select.Option;
export default class MoneyPage extends React.Component {
    state={
        dataSource:[],
        loading:false,
        uid:'',  
        result:'1'
      }


	componentWillMount() {
        let uid = this.props.uid;
       this.setState({uid},this.getDate)
        
    }
    
    getDate=()=>{
        let uid = this.state.uid;
        let  result = this.state.result;
        this.setState({loading:true})
        OwnFetch('user_menoy',{uid,result}).then(res=>{
            if(res && res.code == 200){
                this.setState({dataSource:res.data})
            }
            this.setState({loading:false})
        })
    }



    columns = [{
		title: '商户单号(交易)',
		dataIndex: 'trade_no',
	},{
		title: '系统订单',
		dataIndex: 'out_trade_no',
	}, {
		title: '充值说明',
		dataIndex: 'body',
	}, {
		title: '订单创建时间',
		dataIndex: 'start_time',
	}, {
		title: '充值方式',
        dataIndex: 'trade_type',
        render:(text, record, index) => text =="WX"?'微信支付':'支付宝支付'
	},{
		title: '订单金额(元)',
        dataIndex: 'total_fee',
        render:(text, record, index) => Number(text / 100)   
	},{
		title: '订单结束时间',
		dataIndex: 'end_time',
	},{
		title: '实际金额(元)',
        dataIndex: 'act_fee',
        render:(text, record, index) => text ?Number(text / 100) : 0
	}]
    
  
    //选择类别
    handleChange =(value)=>{
      // console.log(`selected ${value}`);
      this.setState({result:value},this.getDate)
    }


    

   


    render(){
        const resutls =[{key:'0',value:'未完成订单'},{key:'1',value:'已完成订单'}];

        return (<Modal
            width={"80%"}
            maskClosable={false}
            visible={true}
            title={'充值记录'}
            onCancel={this.props.closePage}
           footer={null}
        >

            {/* <Select
                    showSearch
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                    value={this.state.result}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {resutls.map(item=> <Option key={item.key}>{item.value}</Option>)}
                </Select> */}

         <Table
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



       </Modal>)
    }

}