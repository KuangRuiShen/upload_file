

import React from 'react'
import {Table,Tooltip,Icon} from 'antd';
import OwnFetch from '../../../api/OwnFetch'; //封装请求
import Editmeal from './Editmeal';

export default class Setmeal extends React.Component {

    state={
        loading:false,
        dataSource:[],
        showPage:false,
        editData:{},
    }


    componentWillMount() {
		this.initLoadData();
	}

	//默认加载
	initLoadData = () => {
		this.setState({loading: true})
		OwnFetch("setmeal_list")
			.then(res => {
				if(res && res.code == "200") {
					this.setState({dataSource: res.data})
				}
				this.setState({loading: false})
			})
    }

    editOnClick=(record)=>{
        this.setState({showPage:true,editData:record})
    }

    closePage=()=>{
        this.setState({showPage:false})
    }

    getText=()=>{

    }

    

    columns = [{
		title: 'id',
		dataIndex: 'id',
	},{
		title: '等级',
        dataIndex: 'name',
    },{
		title: '对应的充值',
        dataIndex: 'text',
        // render:(text, record, index) => this.getText(record.id)
    },{
		title: '费用(元)',
        dataIndex: 'one',
        render:(text, record, index) => Number(text / 100) 
    } 
    // ,{
	// 	title: '包年(元)',
    //     dataIndex: 'two',
    //     render:(text, record, index) => Number(text / 100) 
	// }, {
	// 	title: '永久(元)',
    //     dataIndex: 'three',
    //     render:(text, record, index) => Number(text / 100) 
    // }
    ,{
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
            {this.state.showPage && <Editmeal editData={this.state.editData} closePage={this.closePage} refresh={this.initLoadData}/> }
        </div>
    }

}