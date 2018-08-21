import React  from 'react'
import { Upload,Form, Modal,InputNumber,Input,Select,Icon} from 'antd'

import OwnFetch from '../../api/OwnFetch';//封装请求

const FormItem = Form.Item;

@Form.create()
export default class AddStar extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            visible:true,
        }
    }
  
    componentDidMount(){
    
    }


    handlePreview = (file) => {
        // console.info(file)
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
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


        //修改
        if(editData.id){  
              values.id = editData.id;
              OwnFetch("label_update",values)
                .then(res=>{    
                    if(res && res.code=='200'){                                
                        this.onClearFrom();
                    }        
                })
        }else{  //新增 
             OwnFetch("label_add",values).then(res=>{    
                    if(res && res.code=='200'){ 

                        this.onClearFrom()
                    }
                }) 
         }           
     });

    }

    
    onClearFrom = () => {
        this.props.form.resetFields();//清楚表单数据
        this.props.refresh() ;
        this.props.closePage();
    }





    render(){
        const { getFieldDecorator } = this.props.form;
       

        const {editData } = this.props;


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

        // const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
          );

        return(<Modal
            width={600}
            maskClosable={false}
            visible={this.state.visible}
            title={editData.id ? '修改标签':'新增标签'}
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
        >
            <Form >
                <FormItem label="标签" {...formItemLayout} hasFeedback>
                    {getFieldDecorator('name', {
                        initialValue: editData.name,
                        rules: [{
                            required: true, message: '标签名不能为空!'
                        }]
                    }
                    )(
                        <Input placeholder="标签名不能为空" />
                        )}
                </FormItem>
                     

            </Form>

        </Modal>)
    }
}