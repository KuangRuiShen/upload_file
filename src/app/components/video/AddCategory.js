import React  from 'react'
import { Form, Modal,InputNumber,Input,Select} from 'antd'

import OwnFetch from '../../api/OwnFetch';//封装请求

const FormItem = Form.Item;

@Form.create()
export default class AddCategory extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            visible:true,
            imgurl:'',//图片地址
        }
    }
  
    componentWillMount(){
    
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
              OwnFetch("category_update",values)
                .then(res=>{    
                    if(res && res.code=='200'){                                
                        this.props.form.resetFields();
                        refresh()                
                        closePage();
                        //刷新数据    
                              
                    }        
                })
        }else{  //新增 
             OwnFetch("category_add",values)
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


        return(<Modal
            width={600}
            maskClosable={false}
            visible={this.state.visible}
            title={editData.id ? '修改类别':'新增类别'}
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
        >
            <Form >
                <FormItem label="用户组名称" {...formItemLayout} hasFeedback>
                    {getFieldDecorator('name', {
                        initialValue: editData.name,
                        rules: [{
                            required: true, message: '用户组名称不能为空!'
                        }]
                    }
                    )(
                        <Input placeholder="用户组名称不能为空" />
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


                  <FormItem label="用户组描述" {...formItemLayout} >
                    {getFieldDecorator('remark',{ initialValue: editData.remark
                     })(
                    <Input type="textarea"  rows={4} placeholder="描述" />
                    )}
                </FormItem>  

            </Form>

        </Modal>)
    }
}