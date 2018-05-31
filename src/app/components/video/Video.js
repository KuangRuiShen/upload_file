import React from 'react';
import { Input, Table, Row, Col, Icon, Modal,Button,Switch,Tooltip,Form} from 'antd';

import {Pagination} from '../../../utils/util'; //页面

export default class Video extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            name:"",
            dataSource:[],
            loading:false,
            showAddVideo:false,
		}
    }
    
    nameInputChange = (e) => {
		this.setState({
			name: e.target.value
		});
    }
    
    
	componentWillMount() {
		this.initLoadData();
	}

    //默认加载数据
    initLoadData=()=>{

    }

    
    //表格内修改按钮-修改角色按钮
    editOnClick = (record) => {
        this.setState({
            showAddVideo: true,
            editData: record,
        })
    }

        //单一删除
        delete = (record) => {
            let ids = [];
            ids.push(record.jsbh)
            const deleteUsers = this.deleteUsers;
            Modal.confirm({
                title: "删除提示",
                content: "确定删除所选该视频?",
                okText: "删除",
                onOk() {
                    deleteUsers(ids)
                }
            })
        }
    

    render(){

        const columns = [,{
            title: '序号',
            dataIndex: 'index'
          },{
            title: '类别名称',
            dataIndex: 'name',
          }, {
            title: '说明',
            dataIndex: 'remark',
          },{
            title: '图片',
            dataIndex: 'imgUrl',
          },  {
            title: '操作',
            key: 'operate',
            render: (text, record, index) => (
                <div>   
                    <Tooltip title="修改">
                            <Icon type="edit" style={{ fontSize: 16, cursor: 'pointer', color: '#03aaf4', marginRight: '10px' }} 
                            onClick={() => this.editOnClick(record)} />
                     </Tooltip>                
                    <Tooltip  title="删除">
                            <Icon type="delete" style={{ fontSize: 16, cursor: 'pointer', color: '#03aaf4' }} onClick={() => this.delete(record)} />
                    </Tooltip>              
                </div>
            ),
        }];

        const FormItem = Form.Item;


        return(<div className="new_div_context">  

         <Form layout="inline" style={{padding:'20px 0px 0px 20px'}} >
					<FormItem label="视频名称：">
					<Input
						style={{ width: '200px' }}
						onChange={this.nameInputChange} value={this.state.name} />  
                    </FormItem>

					<FormItem >				
						<Button  type="primary" icon="search" onClick={this.onSearch}>查询</Button>				
                    </FormItem>

					<FormItem  style={{ float: 'right', marginLeft: '20px' }}>	
				</FormItem>
                <FormItem  style={{ float: 'right', marginLeft: '20px' }}>
                  
                        <Button  type="primary" icon='plus' style={{ marginLeft: '10px', backgroundColor: '#1dc3b0', border: 'none' }}
                                onClick={() => {
                                    this.setState({ showEditDialog: true, editData: {} });
                        }}>新增</Button>   
                   
                     <Button type="primary" icon='delete' style={{ marginLeft: '10px', background: '#ffa54c', border: 'none' }} onClick={this.handleDelete}>删除</Button>
                </FormItem>
              
			</Form>

           <div className="div_space_table" >
            <Table
                dataSource={this.state.dataSource}
                columns={columns}
                loading={this.state.loading}
                pagination={Pagination}
            />
          </div>
           
        </div>)
    }

}
