import React from 'react'
import { Modal, Form, Input, Select, InputNumber } from 'antd'
import OwnFetch from '../../api/OwnFetch';//封装请求
import { decode } from '../../../utils/util'; //加密
import Upload from '../../common/CommonUpload'
const Option = Select.Option;


@Form.create()
export default class AddUserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            visible: true,
            users: [],
        }
    }


    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        const { editData } = this.props;
        let param = {};
        if (editData.id) {
            param.userId = editData.user_id
        }
        OwnFetch("system_users",param).then(res => {
            if (res && res.code == 200) {
                this.setState({ users: res.data })
            }
        })
    }

    //点击确定按钮
    handleCreate = () => {
        const { editData } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            //添加 
            if (editData.id == undefined) {
                // let str= Md5("abcdef");
                // console.info("13123131",str)  
                //密码加密
                values.password = decode(values.password);
                OwnFetch("system_add", values)
                    .then(res => {
                        if (res && res.code == '200') {
                            this.onClearFrom();
                            this.props.refresh();
                        }
                    })
            } else {  //修改
                values.id = editData.id;
                OwnFetch("system_edit", values)
                    .then(res => {
                        if (res && res.code == '200') {
                            this.onClearFrom();
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
        if (value && value !== this.props.form.getFieldValue('password')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }

    //验证重复密码
    checkConfirm = (rule, value, callback) => {
        if (value && this.state.confirmDirty) {
            this.props.form.validateFields(['confirm'], { force: true });
        }
        if (value && value.length < 8) {
            callback('输入的密码长度不能少于8位');
        } else {
            callback();
        }

    }

    // //邮箱验证
    // checkEmail = (rule, value, callback) =>{
    // var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    //     if (value && !re.test(value)) {
    //     callback('输入的邮箱有误');
    //     } else {
    //     callback();
    //     }
    // }

    // //手机号码验证
    // checkPhone = (rule, value, callback) =>{
    // var re = /^1[34578]\d{9}$/;
    //     if (value && !re.test(value)) {
    //     callback('输入的手机号码有误');
    //     } else {
    //     callback();
    //     }
    // }

    onClearFrom = () => {
        this.props.form.resetFields();//清楚表单数据
        this.props.closePage();
    }




    render() {
        const { editData } = this.props;
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        const users = this.state.users;


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
                visible={true}
                title={editData.yhxm == undefined ? '新增用户' : '修改用户'}
                onCancel={this.onClearFrom}
                onOk={this.handleCreate}
            >
                <Form >
                    <FormItem label="账号" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('username', {
                            initialValue: editData.username,
                            rules: [{
                                required: true, message: '账号不能为空!'
                            }]
                        }
                        )(
                            <Input placeholder="用户名不能为空" disabled={editData.id != undefined} />
                        )}
                    </FormItem>

                    {editData.id == undefined && <div><FormItem label="密码" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('password', {
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
                        </FormItem>    </div>}


                    <FormItem label="所属管理员" {...formItemLayout} hasFeedback >
                        {getFieldDecorator('user_id', {
                            initialValue: editData.user_id ?`${editData.user_id}`:undefined,
                            rules: [{
                                required: true, message: '不能为空!'
                            }]
                        }
                        )(<Select >
                            {users.map((item) => {
                                return <Option key={item.key} >{item.value}</Option>
                            })}
                        </Select>
                        )}
                    </FormItem>

                    <FormItem label="总金额(元)" {...formItemLayout} >
                        {getFieldDecorator('total', {
                            initialValue: editData.total,
                            rules: [{
                                required: true, message: '不能为空!'
                            }]
                        }
                        )(
                            <InputNumber min={0} />
                        )}
                    </FormItem>

                    <FormItem label="邀请人数" {...formItemLayout} >
                        {getFieldDecorator('people', {
                            initialValue: editData.people,
                            rules: [{
                                required: true, message: '不能为空!'
                            }]
                        }
                        )(
                            <InputNumber max={99999} min={0} />
                        )}
                    </FormItem>

                    <FormItem label="apk上传" {...formItemLayout} >
                        {getFieldDecorator('fileId', {
                            initialValue: editData.fileId,
                        }
                        )(
                            <Upload />
                        )}
                    </FormItem>


                    <FormItem label="用户描述" {...formItemLayout} >
                        {getFieldDecorator('remark', {
                            initialValue: editData.remark
                        })(
                            <Input.TextArea rows={4} placeholder="描述" />
                        )}
                    </FormItem>

                </Form>

            </Modal>

        )
    }

}

