import { Input, Table,Button,Form,DatePicker,Modal } from 'antd';
import React from 'react'
import OwnFetch from '../../../api/OwnFetch'; //封装请求

import MoneyPage from './MoneyPage';
// import moment from 'moment';

export default class UserTab extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			disabled: false, //启用和停用点击时，按钮禁止
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
		let {time,page,name } = this.state;
 		let param =  {name,page}
		if (time.length == 2) {
            let bTime = time[0].format("YYYY-MM-DD HH:mm:ss");
			let eTime = time[1].format("YYYY-MM-DD HH:mm:ss");
			param.bTime = bTime;
			param.eTime = eTime;
		}
		OwnFetch("user_list",param)
			.then(res => {
				if(res && res.code == "200") {
					this.setState({dataSource: res.data,total:res.total})
				}
				this.setState({loading: false})
			})

	}

	//搜索
	onSearch = () => {
		// let {name,user} = this.state;
		// let params ={yhzh:user,yhxm:name}; 
		this.setState({page:1},()=>	this.initLoadData())	
	}


	//所有窗口关闭
	setDialogClose = () => {
		this.setState({
			showAssignRoleDialog: false,
			showPasswordPage: false, //关闭修改密码页面
			showAssetAccredit: false,
			showDomainAccredit: false,
		})
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
		title: '用户id',
		dataIndex: 'id',
	}, {
		title: '邀请id',
		dataIndex: 'invite_id',
	}, {
		title: '创建时间',
		dataIndex: 'create_time',
	}, {
		title: '最新充值时间',
		dataIndex: 'recharge_time',
	}, {
		title: '到期时间',
		dataIndex: 'valid_time',
	},{
		title: '用户等级',
		dataIndex: 'roleText',
	},{
		title: '总充值金额(元)',
		dataIndex: 'money',
		render:(text, record, index) => Number(text / 100)
	}, {
		title: '操作',
		key: 'action',
		render: (text, record, index) =>  <Button type="primary" onClick={()=>this.setState({uid:record.id,showMoneyPage:true})} >查看充值记录</Button>
	}]
	render() {
		//表单数据操作
		const FormItem = Form.Item;
		const { RangePicker } = DatePicker;


		return(
			<div className="new_div_context">     
				 <Form layout="inline" style={{padding:'20px 0px 0px 20px'}} >
					<FormItem label="用户ID/邀请ID">
					<Input
						style={{ width: '200px' }}
						onChange={this.nameInputChange} value={this.state.name} />
                    </FormItem>

					<FormItem label="充值时间">
                        <RangePicker
                            showTime={{ format: 'HH:mm:ss' }}
                            value={this.state.time}
                            onChange={this.timeonChange}
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </FormItem>

					<FormItem >				
						<Button  type="primary" icon="search" onClick={this.onSearch}>查询</Button>			
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
	{this.state.showMoneyPage && <MoneyPage closePage={this.closePage} uid={this.state.uid}/>}
      </div>
		)
	}

}