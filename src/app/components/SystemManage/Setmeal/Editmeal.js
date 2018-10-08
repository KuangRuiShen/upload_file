import React from 'react'
import { Modal, Form,  InputNumber } from 'antd';
import OwnFetch from '../../../api/OwnFetch';//封装请求
import { min } from 'moment';

@Form.create()
export default  class Editmeal extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading:false,
      }
    }

      //点击确定按钮
    handleCreate = () => {
        const {form,editData,closePage,refresh} = this.props;   
    
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
           //修改
           this.setState({loading:true})
                 values.id = editData.id;
                 OwnFetch("setmeal_edit",values)
                    .then(res=>{    
                      if (res && res.code ==200) {                               
                            form.resetFields();          
                            closePage();              
                            refresh();
                        } 
                        this.setState({loading:false})       
                    })                 
        });
    }



  handleCancel = (e) => {
    const {form} = this.props;   
    form.resetFields();   
    this.props.closePage();
  }


  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const {editData} = this.props;

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
          title={"修改套餐"}
          visible={true}
          onOk={this.handleCreate}
          width={450}
          confirmLoading={this.state.loading}
          onCancel={this.handleCancel}
        >
          <Form  className="login-form" style={{ textAlign: 'center' }}>
        
          <FormItem label="费用(分)" {...formItemLayout} >
                        {getFieldDecorator('one', {
                            initialValue: editData.one,
                            rules: [{
                                required: true, message: '不能为空!'
                            }]
                        }
                        )(
                          <InputNumber   max={99999} min={0} />
                            )}
            </FormItem>

              {/* <FormItem label="包年(分)" {...formItemLayout} >
                        {getFieldDecorator('two',{ initialValue: editData.two ,
                            rules: [{
                                required: true, message: '不能为空'
                            }]
                         })(
                          <InputNumber max={99999} />
                        )}
                    </FormItem>  
                    
              <FormItem label="永久(分)" {...formItemLayout} >
                        {getFieldDecorator('three',{ initialValue: editData.three ,
                            rules: [{
                                required: true, message: '不能为空'
                            }]
                         })(
                          <InputNumber  max={99999} />
                        )}
                    </FormItem>   */}
          </Form>
        </Modal>
      </div>
    );
  }

}



