import React  from 'react'
import { Form, Modal,InputNumber,Input,Select,Icon} from 'antd'

import OwnFetch from '../../api/OwnFetch';//封装请求

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class Addvideo extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            visible:true,
            categorys:[],
        }
    }
    

       
	componentWillMount() {
        OwnFetch('category_all').then(res=>{
            if(res && res.code == 200){
                this.setState({categorys:res.data})
            }
        })
	}
  

  
    //点击确定按钮
   handleCreate = () => {  

    const {editData,refresh,closePage} = this.props;

    this.props.form.validateFields((err, values) => {
        if (err) {
            return;
        }


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
            width={600}
            maskClosable={false}
            visible={this.state.visible}
            title={editData.id ? '修改视频':'新增视频'}
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
        >
            <Form >
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


                  <FormItem label="视频描述" {...formItemLayout} >
                    {getFieldDecorator('remark',{ initialValue: editData.remark
                     })(
                    <Input type="textarea"  rows={4} placeholder="描述" />
                    )}
                </FormItem>  

            </Form>

        </Modal>)
    }
}