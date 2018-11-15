import React,{Component} from 'react'
import { Modal, Form, Input } from 'antd'
import OwnFetch from '../../app/api/OwnFetch';//封装请求

 class PasswordFrom extends React.Component {
 
  constructor(props){
    super(props)
    this.state = {
     confirmDirty: false,
    }
  }

     handleCreate = () => {
        const {form,user} = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.password =values.pass;
            values.id = user.id;
            OwnFetch('user_password',values).then(res=>{
                if(res && res.code ==200){
                     Modal.success({ title: '操作成功', content:"密码修改成功"});
                     this.props.closePage();
                }
            })
            
         })
    }

      //重复输入密码
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    
    //验证密码
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('pass')) {
            callback('两次输入的密码不一致');
        } else {
            if(value && value.length < 8 ) {
                callback('输入的密码长度不能少于8位');
            }else{
                callback();
            }
        }
    }

    //验证重复密码
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

     onClearFrom = () => {
        this.props.form.resetFields();//清楚表单数据
        this.props.closePage();
    }

       render() {
        const  {close, form, role } = this.props;
        const  {getFieldDecorator } = form;
        const FormItem = Form.Item;

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


        
        return(
               <Modal
                maskClosable={false}
                width={600}
                visible={true}
                title={"修改密码"}
                onCancel={this.onClearFrom}
                onOk={this.handleCreate}
            >
              <Form >

                <FormItem label="用户账号" {...formItemLayout}>   
                        <Input disabled={true} value={this.props.user.username}/>
                    </FormItem> 
                <FormItem label="原始密码" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('lastpassword', {                 
                            rules: [{ required: true, message: '请输入你的原始密码!', },
                           ]
                        }
                        )(
                            <Input type="password" />
                           )}
                    </FormItem>     

                <FormItem label="密码" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('pass', {                 
                            rules: [{ required: true, message: '请输入你的密码!', },
                            { validator: this.checkConfirm, }]
                        }
                        )(
                            <Input type="password" />
                            )}
                    </FormItem>                   
                    <FormItem {...formItemLayout} label="重复输入密码" hasFeedback >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '重复密码不能为空!',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                    </FormItem> 
                  </Form>
            
               
            </Modal>

        )

    
    }


}

const PasswordPage = Form.create()(PasswordFrom);

export default PasswordPage;
