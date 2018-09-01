import React from 'react';
import { Input, Table, Select , Icon, Modal,Button,Switch,Tooltip,Form,message } from 'antd';

import OwnFetch from '../../api/OwnFetch';//封装请求
import Addvideo from './Addvideo';
import BatchImg from './BatchImg';//批量图片上传
import UploadVideo from './NewUpload';

const Option = Select.Option;
export default class Video extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            name:"",
            dataSource:[],
            loading:false,
            showAddVideo:false,
            page:1,
            pageSize:10,
            selects:[],
            total:0,
            cid:'0',
            imgurl:"",
            showImg:false,
            showBatchImg:false,
            showUploadVideo:false,
            levels:[],
            level:'all',
            categorys:[],
            category:'0',
            types:[],//页面类型
            type:'0',//类型
            stars:[],
            star:'0',

		}
    }


    
    nameInputChange = (e) => {
		this.setState({
			name: e.target.value
		});                                                                                                                             
    }
    
    
	componentWillMount() {
        //查询所有
        OwnFetch('category_all').then(res=>{
            if(res && res.code == 200){
                let {categorys,types,levels} = res.data;
                this.setState({categorys,types,levels})
            }
        })

        OwnFetch('star_all').then(res=>{
            if(res && res.code == 200){
                this.setState({stars:res.data})
            }
        })

		this.initLoadData();
	}

    //默认加载数据
    initLoadData=()=>{
        this.setState({loading:true})
        let param = {name:this.state.name,page:this.state.page,pageSize:this.state.pageSize};
        if(this.state.cid != 0 ){
            param.cid = this.state.cid;
        }
        if(this.state.level != 'all'){
            param.level = this.state.level;
        }

        if(this.state.type != 0){
            param.type = this.state.type;
        }
        if(this.state.star != 0){
            param.sid = this.state.star;
        }
        OwnFetch('video_list',param).then(res=>{
            if(res && res.code == 200){
                this.setState({dataSource:res.data,selects:[],total:res.total})
            }
            this.setState({loading:false})
        })
    }

    onSearch=()=>{
        this.setState({page:1},()=>this.initLoadData())   
    }

    onRest=()=>{
        this.setState({
            name:"",
            cid:'0',
            level:'all',
            category:'0',
            type:'0',//类型
            star:'0',
            page:1,
        },this.onSearch)
      
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
            ids.push(record.id)
            // const deleteUsers = this.deleteUsers;
            Modal.confirm({
                title: "删除提示",
                content: "确定删除所选该视频?",
                okText: "删除",
                onOk:()=> {
                    this.deleteAll(ids)
                }
            })
        }

         //批量删除
         handleDelete=()=>{
            if (this.state.selects.length) {
                Modal.confirm({
                    title: "确定删除",
                    content: "确定删除所选" +this.state.selects.length + "条的数据? 删除后不可恢复!",
                    okText: "确认删除",
                    cancelText: '取消',
                    onOk: () => {
                        this.deleteAll(this.state.selects)
                    }
                })
            } else {
                message.warning("请选择删除记录");
            }

        }

        deleteAll=(ids)=>{
            OwnFetch('video_delete',ids).then(res=>{
                if(res && res.code==200){
                    Modal.success({title:"删除成功"})
                    this.onSearch();
                }
            })
        }

        onSelectChange = (selectedRowKeys, selectedRows) => {
            // console.info("selectedRowKeys",selectedRowKeys,selectedRows)
            this.setState({ selects: selectedRowKeys });
        }

        pageChange = (page, pageSize) => {
            this.setState({ page, pageSize },  this.initLoadData);
        }
    
        closePage=()=>{
            this.setState({showAddVideo:false,showBatchImg:false,showUploadVideo:false})
        }
    
        //选择类别
        handleChange =(value)=>{
            // console.log(`selected ${value}`);
            this.setState({cid:value})
          }
          //会员等级
        levelChange =(value)=>{
            // console.log(`selected ${value}`);
            this.setState({level:value})
          }
               //会员等级
        starChange =(value)=>{
            // console.log(`selected ${value}`);
            this.setState({star:value})
          }

        //页面类型
        typeChange=(value)=>{
            this.setState({type:value})
        }

        imgOnClick=(url)=>{
            if(url){
                this.setState({showImg:true,imgurl:url})
            }       
        }
          
        uploadImg=(record)=>{
            this.setState({editData:record,showBatchImg:true})

        }

        uploadVideo=(record)=>{
            this.setState({editData:record,showUploadVideo:true})
        }

        categoryText=(record)=>{
            let text ="";
            if(record.categorys.length>0){
                record.categorys.map(item=>{
                    text = text +","+item.name;
                })
            }
            text = text.substring(1);
            return <div style={{overflow:'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap',width:'100px'}}>{text}</div>;
        }    

    render(){

        const columns = [{
            title: '序号',
            dataIndex: 'px'
          },{
            title: '视频名称',
            dataIndex: 'name',
            render: (text, record, index) => text+"("+record.quality+")"
          },{
            title: '类别名称',
            dataIndex: 'cname',
            render: (text, record, index) => this.categoryText(record)
          },{
            title: '所属明星',
            dataIndex: 'sname',
          }, {
            title: '试看',
            dataIndex: 'watch',
            render: (text, record, index) =>  (text?text:0)+" 分钟",
            width:80,
          }, {
            title: '时长',
            dataIndex: 'time',
            render: (text, record, index) => (text?text:0)+" 分钟",
            width:80,
          },{
            title: '视频主图',
            dataIndex: 'imgurl',
            render: (text, record, index) =>  <div style={{height:'50px',cursor:text?'pointer':''}} onClick={()=>this.imgOnClick(record.imgurl)}>
                              <img style={{height:'50px'}} src={record.imgurl} />
                    </div>
          },{
            title: '视频缩略图',
            width:150,
            dataIndex: 'imgs',
            render:(text, record, index) =>  <Button type="primary" icon='file-jpg' onClick={()=>this.uploadImg(record)}>上传图片</Button>
          }, {
            title: '会员等级',
            dataIndex: 'levelText',
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
        
        //     title: '视频',
        //     width:150,
        //     dataIndex: 'videourl',
        //     render:(text, record, index) =>  <Button type="primary" icon='play-circle' onClick={()=>this.uploadVideo(record)}>上传视频</Button>
        //   

        const FormItem = Form.Item;


        return(<div className="new_div_context">  

         <Form layout="inline" style={{padding:'20px 0px 0px 20px'}} >
             <FormItem label="视频名称：">
					<Input
						style={{ width: '200px' }}
						onChange={this.nameInputChange} value={this.state.name} />  
                    </FormItem>

              <FormItem label="页面类型">
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    onChange={this.typeChange}
                    value={this.state.type}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option key="0">所有</Option>
                    {this.state.types.map(item=> <Option key={item.key}>{item.value}</Option>)}
                </Select>
                    </FormItem>
					
                    <FormItem label="所属视频分类">
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                    value={this.state.cid}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option key="0">所有</Option>
                    {this.state.categorys.map(item=> <Option key={item.key}>{item.value}</Option>)}
                </Select>
                    </FormItem>

                     <FormItem label="会员等级">
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    onChange={this.levelChange}
                    value={this.state.level}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option key="all">所有</Option>
                    {this.state.levels.map(item=> <Option key={item.key}>{item.value}</Option>)}
                </Select>
                    </FormItem>

                    <FormItem label="明星">
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    onChange={this.starChange}
                    value={this.state.star}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option key="0">所有</Option>
                    {this.state.stars.map(item=> <Option key={item.key}>{item.value}</Option>)}
                </Select>
                    </FormItem>

              

					<FormItem >				
						<Button  type="primary" icon="search" onClick={this.onSearch}>查询</Button>			
                        <Button type="Default"  icon="reload" onClick={this.onRest} style={{ marginLeft: '10px' }}  >重置</Button>	
                    </FormItem>

					<FormItem  style={{ float: 'right', marginLeft: '20px' }}>	
				</FormItem>
                <FormItem  style={{ float: 'right', marginLeft: '20px' }}>
                  
                    <Button  type="primary" icon='plus' style={{ marginLeft: '10px', backgroundColor: '#1dc3b0', border: 'none' }}
                            onClick={() => {
                                this.setState({ showAddVideo: true, editData: {} });
                    }}>新增</Button>  
             
                                       
                     <Button type="primary" icon='delete' style={{ marginLeft: '10px', background: '#ffa54c', border: 'none' }} onClick={this.handleDelete}>删除</Button>
                </FormItem>
              
			</Form>

           <div className="div_space_table" >
           
            <Table
                size="small"
                rowKey="id"
                rowSelection={{
                    selectedRowKeys: this.state.selects,
                    onChange: this.onSelectChange
                }}
                dataSource={this.state.dataSource}
                columns={columns}
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

           {this.state.showAddVideo && <Addvideo levels={this.state.levels} categorys={this.state.categorys} closePage={this.closePage}  editData={this.state.editData} refresh={this.onSearch}/>}
           {this.state.showBatchImg && <BatchImg closePage={this.closePage}  editData={this.state.editData} refresh={this.onSearch}/>}
           {this.state.showUploadVideo && <UploadVideo closePage={this.closePage}  editData={this.state.editData} refresh={this.onSearch}/>}

          <Modal visible={this.state.showImg} footer={null} onCancel={()=>this.setState({showImg:false})}>
                        <img  style={{ width: '100%' }} src={this.state.imgurl} />
            </Modal>
            

        </div>)
    }

}
