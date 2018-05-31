import { Input, Table, Row, Col, Icon, Modal,Button,Switch,Tooltip,Form} from 'antd';
import { connect } from 'react-redux'
import React from 'react'
import {Pagination, getSize} from '../../../../utils/util'; //页面
import OwnFetch from '../../../api/OwnFetch'; //封装请求



export default class UserTab extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			disabled: false, //启用和停用点击时，按钮禁止
			dataSource: [],
			name: '', //用户名称	
			loading: false,
		}
	}

	//搜索的条件
	userInputChange = (e) => {
		this.setState({
			user: e.target.value
		});
	}
	nameInputChange = (e) => {
		this.setState({
			name: e.target.value
		});
	}

	//重置
	onRest = () => {
		this.setState({
			user: '',
			name: '',
			selectedRowKeys: []
		})
	}

	componentWillMount() {
		this.initLoadData();
	}

	//默认加载
	initLoadData = () => {
		this.setState({loading: true})

		let params = "username=" + this.state.user
		OwnFetch("/user/list", params)
			.then(res => {
				if(res && res.code == "200") {
					this.setState({dataSource: res.data})
				}
				this.setState({loading: false})
			})

	}

	//搜索
	onSearch = () => {
		// let {name,user} = this.state;
		// let params ={yhzh:user,yhxm:name}; 
		this.initLoadData();
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

	//关闭用户新增修改页面
	cancelAdd = () => {
		this.setState({
			showAddUserPage: false,
			showUpload: false
		})
	}

	columns = [{
		title: '序号',
		dataIndex: 'index',
		key: 'index',
		render: (text, record, index) => (
			<div><span>{index + 1}</span></div>
		)
	}, {
		title: '用户账号',
		dataIndex: 'username',
		key: 'username',
	}, {
		title: '用户姓名',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '操作',
		key: 'action',
		render: (text, record, index) => {
			return<div></div>
		},
	}]
	render() {
		//表单数据操作
		const rowSelection = {
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRows,
					selectedRowKeys
				})
			},
		};
		const FormItem = Form.Item;


		return(
			<div className="new_div_context">     
				 <Form layout="inline" style={{padding:'20px 0px 0px 20px'}} >
					<FormItem label="用户名称：">
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
            pagination={Pagination}
          />
        </div>

      </div>
		)
	}

}