import React from 'react'
import { Modal, Form, Input } from 'antd';
import OwnFetch from '../../api/OwnFetch';//封装请求

@Form.create()
export default class EditMenoy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  //点击确定按钮
  handleCreate = () => {
    const { form, editData, closePage, refresh } = this.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //修改
      this.setState({ loading: true })
      values.id = editData.id;
      OwnFetch("user_changeinfo", values)
        .then(res => {
          if (res && res.code == 200) {
            form.resetFields();
            closePage();
            refresh();
          }
          this.setState({ loading: false })
        })
    });
  }



  handleCancel = (e) => {
    const { form } = this.props;
    form.resetFields();
    this.props.closePage();
  }


  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { editData } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    return (
      <div>
        <Modal
          maskClosable={false}
          title={"修改管理员信息"}
          visible={true}
          onOk={this.handleCreate}
          width={450}
          confirmLoading={this.state.loading}
          onCancel={this.handleCancel}
        >
          <Form className="login-form" style={{ textAlign: 'center' }}>

            <FormItem label="管理员名称" {...formItemLayout} hasFeedback>
              {getFieldDecorator('name', {
                initialValue: editData.name,
                rules: [{
                  required: true, message: '管理员名称不能为空!'
                }]
              }
              )(
                <Input style={{ fontSize: 13 }} />
              )}
            </FormItem>

            <FormItem label="电话" {...formItemLayout} hasFeedback>
              {getFieldDecorator('phone', {
                initialValue: editData.phone,
                rules: [{
                  required: true, message: '电话不能为空'
                }]
              })(
                <Input style={{ fontSize: 13 }} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }

}



