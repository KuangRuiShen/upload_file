import { Modal, Message, Form, Input, Radio,form} from 'antd'
import React from 'react'
import OwnFetch from '../../../api/OwnFetch';//封装请求
import {decode} from '../../../../utils/util'; //加密

class AddUserPageFrom extends React.Component {
    state = {
        confirmDirty: false,
        visible:true,
    }

    //点击确定按钮
    handleCreate = () => {      
        const {editData} = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }    
            //添加 
            if(editData.yhbh == undefined ){
                // let str= Md5("abcdef");
                // console.info("13123131",str)  
                 //密码加密
                 values.yhmm = decode(values.yhmm);
                  OwnFetch("SYSTEM_USER_ADD",values)
                    .then(res=>{    
                        if(res && res.code=='200'){                                
                            this.props.form.resetFields();
                            this.props.cancelAdd();
                            this.props.refresh();                        
                        }        
                    })
            }else{  //修改
                 values.yhbh = editData.yhbh;
                 OwnFetch("SYSTEM_USER_UPDATA",values)
                    .then(res=>{    
                        if(res && res.code=='200'){                                 
                            this.props.form.resetFields();
                            this.props.cancelAdd();
                            this.props.refresh();                      
                        }        
                    })
            }
                   
        });
    }


    //重复输入密码
    handleConfirmBlur = (e) => {
        let value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    
    //验证密码
    checkPassword = (rule, value, callback) => {
        if (value && value !==  this.props.form.getFieldValue('yhmm')) {
            callback('两次输入的密码不一致');
        }else{
            callback();
        }
    }

    //验证重复密码
    checkConfirm = (rule, value, callback) => {
        if (value && this.state.confirmDirty) {
            this.props.form.validateFields(['confirm'], { force: true });
        }
        if(value && value.length < 8 ) {
            callback('输入的密码长度不能少于8位');
        }else{
            callback();
        }
     
    }

    //邮箱验证
    checkEmail = (rule, value, callback) =>{
    var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (value && !re.test(value)) {
        callback('输入的邮箱有误');
        } else {
        callback();
        }
    }

    //手机号码验证
    checkPhone = (rule, value, callback) =>{
    var re = /^1[34578]\d{9}$/;
        if (value && !re.test(value)) {
        callback('输入的手机号码有误');
        } else {
        callback();
        }
    }

    onClearFrom = () => {
        this.props.form.resetFields();//清楚表单数据
        this.props.cancelAdd();
    }




    render() {
        const { cancelAdd, editData } = this.props;
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        const RadioGroup = Radio.Group;

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


        return (
            <Modal
                width={600}
                maskClosable={false}
                visible={this.state.visible}
                title={editData.yhxm == undefined ?'新增用户':'修改用户'}
                onCancel={this.onClearFrom}
                onOk={this.handleCreate}
            >
                <Form >
                    <FormItem label="账号" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('yhzh', {
                            initialValue: editData.yhzh,
                            rules: [{
                                required: true, message: '账号不能为空!'
                            }]
                        }
                        )(
                            <Input placeholder="用户名不能为空" />
                            )}
                    </FormItem>
                      { editData.yhxm == undefined &&  <div><FormItem label="密码" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('yhmm', {                 
                            rules: [{ required: true, message: '请输入你的密码!', },
                            { validator: this.checkConfirm }]
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
                    </FormItem>     </div>      
                   }    
                   
                    <FormItem label="姓名" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('yhxm', {
                            initialValue: editData.yhxm,
                            rules: [{
                                required: true, message: '用户名不能为空!'
                            }]
                        }
                        )(
                            <Input placeholder="用户名不能为空" />
                            )}
                    </FormItem>

                     <FormItem label="联系号码" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('lxfs',{initialValue: editData.lxfs ,
                            rules: [{required: true, message: '联系号码不能为空!'},{validator:this.checkPhone}]}
                            )(<Input  />)
                        }
                    </FormItem>

                    <FormItem label="邮件" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('yhyx', { initialValue: editData.yhyx ,
                        rules: [{required: true, message: '邮件不能为空!'},
                        { validator: this.checkEmail }]
                         })(
                            <Input  />
                        )}
                    </FormItem> 

                    <FormItem label="职位" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('zw', { initialValue: editData.zw ,
                         })(
                            <Input  />
                        )}
                    </FormItem>     

                      <FormItem label="用户描述" {...formItemLayout} >
                        {getFieldDecorator('yhms',{ initialValue: editData.yhms
                         })(
                        <Input type="textarea"  rows={4} placeholder="描述" />
                        )}
                    </FormItem>          

                </Form>

            </Modal>

        )
    }

}

const AddUserPage = Form.create()(AddUserPageFrom);

export default AddUserPage;