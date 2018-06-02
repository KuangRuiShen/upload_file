import React  from 'react'
import {Upload, Form, Modal,InputNumber,Input,Select,Icon} from 'antd'

import OwnFetch from '../../api/OwnFetch';//封装请求

const FormItem = Form.Item;
const Option = Select.Option;

import MyEditor from './MyEditor';

@Form.create()
export default class Addvideo extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            visible:true,
            categorys:[],
            fileList:[],
            html:"",
        }
    }
    

       
	componentWillMount() {
        OwnFetch('category_all').then(res=>{
            if(res && res.code == 200){
                this.setState({categorys:res.data})
            }
        })


        //有图片
        // console.info("dfsfsd",this.props.editData.imgurl)
        if(this.props.editData.imgurl){
            let fileList = [];
            fileList.push({uid: -1,status: 'done',url:this.props.editData.imgurl});
            this.setState({fileList});
            // console.info("fileList",fileList)
        }
        
    }
    
    //获取富文本框内容
    getText=(html)=>{
        this.setState({html})
    }
  

  
    //点击确定按钮
   handleCreate = () => {  

    const {editData,refresh,closePage} = this.props;
    const {fileList} = this.state;

    this.props.form.validateFields((err, values) => {
        if (err) {
            return;
        }

        //不修改图片
       if(editData.imgurl && fileList.length != 0 ){
            values.imgurl = editData.imgurl;
        }

        //处理图片
        if(fileList.length == 1){
            if(fileList[0].percent == 100){
                values.imgurl = fileList[0].response; 
            }
        }

        //给说明赋值
        values.remark = this.state.html;

        //修改
        if(editData.id){  
              values.id = editData.id;
              OwnFetch("video_update",values)
                .then(res=>{    
                    if(res && res.code=='200'){                                
                        this.props.form.resetFields();
                        refresh()                
                        closePage();
                        //刷新数据    
                              
                    }        
                })
        }else{  //新增 
             OwnFetch("video_add",values)
                .then(res=>{    
                    if(res && res.code=='200'){                                 
                        this.props.form.resetFields();
                        refresh()                
                        closePage();                  
                    }        
                })      
         }           
     });
    

    }

    
    onClearFrom = () => {
        this.props.form.resetFields();//清楚表单数据
        this.props.closePage();
    }


    //显示图片
    handlePreview = (file) => {
        // console.info(file)
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleCancel = () => this.setState({ previewVisible: false })


    handleChange = ({ file,fileList,event }) =>{
        this.setState({ fileList })
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isGIF && !isPNG) {
          Modal.error({
            content: '必须是JPG/PNG/GIF格式文件',
          });
          return false;
        }
        const isLt2M = file.size /1024/1024  < 10 ;

        if (!isLt2M) {
          Modal.error({
            content: '图片大小不能超过 10M!',
          });
          return false;
        }
        // this.setState({imageName:file.name,imageFile:file})
        return (isJPG || isGIF || isPNG) && isLt2M;
      }





    render(){
        const { getFieldDecorator } = this.props.form;
       

        const {editData } = this.props;
        const Option = Select.Option;

        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
          );

        return(<Modal
            width={760}
            maskClosable={false}
            visible={this.state.visible}
            title={editData.id ? '修改视频':'新增视频'}
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
        >
            <Form >

                <FormItem label="上传主图" {...formItemLayout} >
                 <div className="clearfix">
                        <Upload
                            action="upload/image"
                            listType="picture-card"
                            fileList={fileList}
                            // data={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            beforeUpload={this.beforeUpload}
                        >
                        {fileList.length == 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img  style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </FormItem>  


                <FormItem label="视频名称" {...formItemLayout} hasFeedback>
                    {getFieldDecorator('name', {
                        initialValue: editData.name,
                        rules: [{
                            required: true, message: '类别名称不能为空!'
                        }]
                    }
                    )(
                        <Input placeholder="类别名称不能为空" />
                        )}
                </FormItem>

                      
                <FormItem label="视频类型" {...formItemLayout} hasFeedback >
                    {getFieldDecorator('cid', {
                        initialValue: editData.cid,
                        rules: [{
                            required: true, message: '视频类型不能为空!'
                        }]
                    }
                    )(
                        <Select placeholder="选择视频类型">
                        {this.state.categorys.map((item) => {
                        return <Option key={item.key}>{item.value}</Option>
                        })}
                    </Select>
                        )}
                </FormItem>
                     
                <FormItem label="序号" {...formItemLayout} >
                    {getFieldDecorator('px', {
                        initialValue: editData.px || 1,
                        rules: [{
                            required: true, message: '序号不能为空!'
                        }]
                    }
                    )(
                        <InputNumber min={1} max={99999} />
                        )}
                </FormItem>

                 <FormItem label="试看分钟数" {...formItemLayout} >
                    {getFieldDecorator('watch', {
                        initialValue: editData.watch || 1,
                        rules: [{
                            required: true, message: '序号不能为空!'
                        }]
                    }
                    )(
                        <InputNumber min={1} max={59} />
                        )}
                </FormItem>

                        <p style={{textAlign: 'center'}}>视频说明:</p>
                     <MyEditor text={editData.remark} getText={this.getText}/>
             

            </Form>

        </Modal>)
    }
}