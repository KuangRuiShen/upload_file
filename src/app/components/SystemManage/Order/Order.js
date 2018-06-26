import { Input, Table,Button,Form } from 'antd';
import React from 'react'
import OwnFetch from '../../../api/OwnFetch'; //封装请求



export default class Order extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			name: '', //用户名称
			page:1,
            pageSize:10,
			loading: false,
			uid:'',//用户id
			showMoneyPage:false,
			time: [],
		}
	}

	//搜索的条件
	nameInputChange = (e) => {
		this.setState({
			name: e.target.value
		});
	}

	//重置
	onRest = () => {
		this.setState({
			name: '',
		})
	}

	componentWillMount() {
		this.initLoadData();
	}

	//默认加载
	initLoadData = () => {
		this.setState({loading: true})
		let {page,name } = this.state;
 		let param =  {name,page}
		OwnFetch("user_order",param)
			.then(res => {
				if(res && res.code == "200") {
					this.setState({dataSource: res.data,total:res.total})
				}
				this.setState({loading: false})
			})

	}

	//搜索
	onSearch = () => {
		this.setState({page:1},()=>	this.initLoadData())	
	}


	pageChange = (page, pageSize) => {
		this.setState({ page, pageSize }, ()=>this.initLoadData());
	}

	//关闭用户新增修改页面
	closePage = () => {
		this.setState({showMoneyPage: false,})
	}

	timeonChange = (dates, dateStrings) => {
        this.setState({ time: dates });
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
	},{
		title: '用户id',
        dataIndex: 'user_id',
	}]
    

	render() {
		//表单数据操作
		const FormItem = Form.Item;
	


		return(
			<div className="new_div_context">     
				 <Form layout="inline" style={{padding:'20px 0px 0px 20px'}} >
					<FormItem label="商户订单号">
					<Input
						style={{ width: '200px' }}
						onChange={this.nameInputChange} value={this.state.name} />
                    </FormItem>

					<FormItem >				
						<Button  type="primary" icon="search" onClick={this.onSearch}>查询</Button>			
                    </FormItem>

					<FormItem  style={{ float: 'right', marginLeft: '20px' }}>	
				</FormItem>

			</Form>

        <div className="div_space_table" >
          <Table
		    size="small"
            rowKey={record => record.id}
			dataSource={this.state.dataSource}
			columns={this.columns}
            loading={this.state.loading}
			pagination={{
				current: this.state.page,
				pageSize:this.state.pageSize,
				total: this.state.total,
				showTotal: (total, range) => `当前${range[0]}-${range[1]}条 总数${total}条`,
				showQuickJumper: true,
				onChange: this.pageChange,
			}}
          />
        </div>
      </div>
		)
	}

}