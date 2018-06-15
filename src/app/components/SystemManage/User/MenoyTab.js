

import React from 'react'
import {Table,Tooltip,Icon} from 'antd';
import OwnFetch from '../../../api/OwnFetch'; //封装请求
import EditMenoy from './EditMenoy';

export default class MenoyTab extends React.Component {

    state={
        loading:false,
        dataSource:[],
        showMenoy:false,
        editData:{},
    }


    componentWillMount() {
		this.initLoadData();
	}

	//默认加载
	initLoadData = () => {
		this.setState({loading: true})
		OwnFetch("user_mange")
			.then(res => {
				if(res && res.code == "200") {
					this.setState({dataSource: res.data})
				}
				this.setState({loading: false})
			})
    }

    editOnClick=(record)=>{
        this.setState({showMenoy:true,editData:record})
    }

    closePage=()=>{
        this.setState({showMenoy:false})
    }

    

    columns = [{
		title: '管理员Id',
		dataIndex: 'id',
	},{
		title: '管理员名称',
		dataIndex: 'name',
    },{
		title: '联系方式',
		dataIndex: 'phone',
    } ,{
		title: '邀请的人数',
		dataIndex: 'people',
	}, {
		title: '总金额(元)',
        dataIndex: 'total',
        render:(text, record, index) => Number(text / 100) 
    },{
        title: '操作',
        key: 'operate',
        render: (text, record, index) => (  <Tooltip title="修改">
                        <Icon type="edit" style={{ fontSize: 16, cursor: 'pointer', color: '#03aaf4', marginRight: '10px' }} 
                        onClick={() => this.editOnClick(record)} />
                 </Tooltip>                
        
        ),
    }]

    render(){

        return  <div className="new_div_context">      
               
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
       {this.state.showMenoy && <EditMenoy editData={this.state.editData} closePage={this.closePage} refresh={this.initLoadData}/> }
        </div>
    }

}