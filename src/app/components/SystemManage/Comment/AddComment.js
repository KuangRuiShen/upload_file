import React  from 'react'
import { Upload,Form, Modal,Input,Select,Icon} from 'antd'
import OwnFetch from '../../../api/OwnFetch'; //封装请求

const TextArea= Input.TextArea;
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
export default class AddCategory extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            visible:true,
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }
  
    componentDidMount(){
        //有图片
        // console.info("dfsfsd",this.props.editData.imgurl)
        if(this.props.editData.imgurl){
            let fileList = [];
            fileList.push({uid: -1,status: 'done',url:this.props.editData.imgurl});
            this.setState({fileList});
            // console.info("fileList",fileList)
        }
    
    }


    handlePreview = (file) => {
        // console.info(file)
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }


    handleChange = ({ file,fileList,event }) =>{
        this.setState({ fileList })
    }
       
   
    handleCancel = () => this.setState({ previewVisible: false })



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



  
    //点击确定按钮
   handleCreate = () => {  

    const {editData,refresh,closePage} = this.props;
    const {fileList} = this.state;
    // console.info("sfsdfs",this.state.fileList)
    
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

        //修改
        if(editData.id){  
              values.id = editData.id;
              OwnFetch("comment_update",values)
                .then(res=>{    
                    if(res && res.code=='200'){                                
                        this.props.form.resetFields();
                        refresh()                
                        closePage();
                        //刷新数据    
                              
                    }        
                })
        }else{  //新增 
             OwnFetch("comment_add",values)
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

        const roles =['管理员','普通用户']

        return(<Modal
            width={600}
            maskClosable={false}
            visible={this.state.visible}
            title={editData.id ? '修改评论':'新增评论'}
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
        >
            <Form >
                <FormItem label="上传用户头像" {...formItemLayout} >
                 <div className="clearfix">
                        <Upload
                            action={OwnFetch.preurl+"/upload/image"}
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
                <FormItem label="用户名称" {...formItemLayout} hasFeedback>
                    {getFieldDecorator('username', {
                        initialValue: editData.username,
                        rules: [{
                            required: true, message: '用户名不能为空!'
                        }]
                    }
                    )(
                        <Input placeholder="用户名不能为空" />
                        )}
                </FormItem>
                     
                <FormItem label="评论内容" {...formItemLayout} >
                    {getFieldDecorator('remark', {
                        initialValue: editData.remark
                    }
                    )(
                        <TextArea  rows={4}/>
                        )}
                </FormItem>


                  <FormItem label="发言人" {...formItemLayout} >
                    {getFieldDecorator('role',{
                        initialValue: editData.role|| '普通用户',
                        rules: [{
                            required: true, message: '发言人不能为空!'
                        }]
                    }
                    )(
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {roles.map(item=> <Option key={item}>{item}</Option>)}
                    </Select>
                    )}
                </FormItem>  

               
            </Form>

        </Modal>)
    }
}