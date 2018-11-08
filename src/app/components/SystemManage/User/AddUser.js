import React from 'react'
import { Form, Modal, Input } from 'antd'

import OwnFetch from '../../../api/OwnFetch';//封装请求

const FormItem = Form.Item;

@Form.create()
export default class AddUser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }


    //点击确定按钮
    handleCreate = () => {
        const { refresh, closePage } = this.props;

        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            //修改
            OwnFetch("user_addmaster", values).then(res => {
                if (res && res.code == '200') {
                    this.props.form.resetFields();
                    refresh()
                    closePage();
                }
            })

        });


    }


    onClearFrom = () => {
        this.props.form.resetFields();//清楚表单数据
        this.props.closePage();
    }





    render() {
        const { getFieldDecorator } = this.props.form;


        const { editData } = this.props;


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


        return (<Modal
            width={600}
            maskClosable={false}
            visible
            title={'新增用户'}
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
        >
            <Form >


                <FormItem label="用户id" {...formItemLayout} hasFeedback>
                    {getFieldDecorator('id', {
                        initialValue: editData.id,
                        rules: [{
                            required: true, message: '用户id不能为空!'
                        }]
                    }
                    )(
                        <Input placeholder="用户id" />
                    )}
                </FormItem>

            </Form>

        </Modal>)
    }
}