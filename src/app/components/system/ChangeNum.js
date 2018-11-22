import React from 'react'
import { Modal, Form, InputNumber } from 'antd'
import OwnFetch from '../../api/OwnFetch';//封装请求

class ChangeNum extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            num: 1,
        }
    }

    componentDidMount() {
        OwnFetch('system_num', {}).then(res => {
            if (res && res.code == 200) {
                this.setState({ num: res.data })
            }
        })
    }

    handleCreate = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            OwnFetch('system_saveNum', values).then(res => {
                if (res && res.code == 200) {
                    Modal.success({ title: '操作成功', content: "修改成功" });
                    this.props.closePage();
                }
            })

        })
    }


    onClearFrom = () => {
        this.props.form.resetFields();//清楚表单数据
        this.props.closePage();
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
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



        return (
            <Modal
                maskClosable={false}
                width={600}
                visible={true}
                title={"修改扣量"}
                onCancel={this.onClearFrom}
                onOk={this.handleCreate}
            >
                <Form >

                    <FormItem label="起始扣量" {...formItemLayout}>
                        {getFieldDecorator('num', {
                            initialValue: this.state.num,
                            rules: [{
                                required: true, message: '不能为空!'
                            }]
                        }
                        )(
                            <InputNumber max={999} min={1} />
                        )}
                    </FormItem>

                </Form>


            </Modal>

        )


    }


}

const ChangeNumPage = Form.create()(ChangeNum);

export default ChangeNumPage;
