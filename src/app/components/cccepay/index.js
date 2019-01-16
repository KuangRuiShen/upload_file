import React from "react";
import { Button, Form, Modal, Input, InputNumber, Checkbox } from "antd";

import OwnFetch from "../../api/OwnFetch"; //封装请求

const FormItem = Form.Item;

@Form.create()
export default class CccePayIndex extends React.Component {
    state = {
        editData: {},
        loading: false
    };

    componentDidMount() {
        this.getData();
    }

    //获取数据
    getData = () => {
        OwnFetch("cccePay_list", {}).then(res => {
            if (res && res.code == 200) {
                this.setState({ editData: res.data });
            }
        });
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            Modal.confirm({
                title: "确定修改",
                content: "请确保填写的信息无误!",
                okText: "确认",
                cancelText: "取消",
                onOk: () => {
                    this.setState({ loading: true });
                    OwnFetch("cccePay_update", values).then(res => {
                        if (res && res.code == 200) {
                            Modal.success({ title: "修改成功" });
                        }
                        this.setState({ loading: false });
                    }).catch(error => this.setState({ loading: false }));
                }
            });
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let editData = this.state.editData;
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            }
        };
        return (
            <div className="new_div_context">
                <Form onSubmit={this.handleSubmit} style={{ padding: 100 }}>

                    <FormItem label="接口url" {...formItemLayout} hasFeedback>
                        {getFieldDecorator("url", {
                            initialValue: editData.url,
                            rules: [
                                {
                                    required: true,
                                    message: "接口url不能为空!"
                                }
                            ]
                        })(<Input placeholder="接口url不能为空" />)}
                    </FormItem>


                    <FormItem label="微信秘钥" {...formItemLayout} hasFeedback>
                        {getFieldDecorator("wkey", {
                            initialValue: editData.wkey,
                            rules: [
                                {
                                    required: true,
                                    message: "key不能为空!"
                                }
                            ]
                        })(<Input placeholder="key不能为空" />)}
                    </FormItem>

                    <FormItem label="微信商户号" {...formItemLayout} hasFeedback>
                        {getFieldDecorator("wmerno", {
                            initialValue: editData.wmerno,
                            rules: [
                                {
                                    required: true,
                                    message: "不能为空!"
                                }
                            ]
                        })(<Input placeholder="商户名不能为空" />)}
                    </FormItem>

                    <FormItem label="支付宝秘钥" {...formItemLayout} hasFeedback>
                        {getFieldDecorator("zkey", {
                            initialValue: editData.zkey,
                            rules: [
                                {
                                    required: true,
                                    message: "key不能为空!"
                                }
                            ]
                        })(<Input placeholder="key不能为空" />)}
                    </FormItem>

                    <FormItem label="支付宝商户号" {...formItemLayout} hasFeedback>
                        {getFieldDecorator("zmerno", {
                            initialValue: editData.zmerno,
                            rules: [
                                {
                                    required: true,
                                    message: "不能为空!"
                                }
                            ]
                        })(<Input placeholder="商户名不能为空" />)}
                    </FormItem>

                    <FormItem style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={this.state.loading}
                        >
                            修改
            </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
