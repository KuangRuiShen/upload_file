

import React from 'react'
import {Table,Button} from 'antd';
import OwnFetch from '../../../api/OwnFetch'; //封装请求

export default class MenoyTab extends React.Component {

    state={
        loading:false,
        dataSource:[],
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
    

    columns = [{
		title: '管理员Id',
		dataIndex: 'id',
	}, {
		title: '邀请的人数',
		dataIndex: 'people',
	}, {
		title: '总金额(元)',
        dataIndex: 'total',
        render:(text, record, index) => Number(text / 100) 
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
       
        </div>
    }

}