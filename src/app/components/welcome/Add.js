import React from 'react'
import { Upload, Form, Modal, InputNumber, Input, Icon } from 'antd'

import OwnFetch from '../../api/OwnFetch';//封装请求
import UploadFile from './UploadFile';//上传文件

const FormItem = Form.Item;

@Form.create()
export default class Add extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            // imgurl:'',//图片地址
            previewVisible: false,
            previewImage: '',
            fileList: [],
            inputLoading: false
        }
    }

    componentDidMount() {
        //有图片
        // console.info("dfsfsd",this.props.editData.imgurl)
        if (this.props.editData.imgurl) {
            let fileList = [];
            fileList.push({ uid: -1, status: 'done', url: this.props.editData.imgurl });
            this.setState({ fileList });
        }

    }


    handlePreview = (file) => {
        // console.info(file)
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }


    handleChange = ({ file, fileList, event }) => {
        this.setState({ fileList })
    }


    handleCancel = () => this.setState({ previewVisible: false })



    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isGIF && !isPNG) {
            Modal.error({
                content: '必须是JPG/PNG/GIF格式文件',
            });
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isLt2M) {
            Modal.error({
                content: '图片大小不能超过 10M!',
            });
            return false;
        }
        // this.setState({imageName:file.name,imageFile:file})
        return (isJPG || isGIF || isPNG) && isLt2M;
    }




    //点击确定按钮
    handleCreate = () => {

        const { editData, refresh, closePage } = this.props;
        const { fileList } = this.state;
        // console.info("sfsdfs",this.state.fileList)

        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

            //不修改图片
            if (editData.imgurl && fileList.length != 0) {
                values.imgurl = editData.imgurl;
            }

            //处理图片
            if (fileList.length == 1) {
                if (fileList[0].percent == 100) {
                    values.imgurl = fileList[0].response;
                }
            }

            //修改
            if (editData.id) {
                values.id = editData.id;
                OwnFetch("welcome_update", values)
                    .then(res => {
                        if (res && res.code == '200') {
                            this.props.form.resetFields();
                            refresh()
                            closePage();
                            //刷新数据    

                        }
                    })
            } else {  //新增 
                OwnFetch("welcome_add", values)
                    .then(res => {
                        if (res && res.code == '200') {
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


    //上传中
    setLoading = (loading) => {
        this.setState({ inputLoading: loading })
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

        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (<Modal
            width={"75%"}
            maskClosable={false}
            visible={this.state.visible}
            title={editData.id ? '修改' : '新增'}
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
        >
            <Form >
                <FormItem label="主图" {...formItemLayout} >
                    <div className="clearfix">
                        <Upload
                            action={OwnFetch.preurl + "/upload/image"}
                            listType="picture-card"
                            fileList={fileList}
                            // data={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            beforeUpload={this.beforeUpload}
                        >
                            {fileList.length == 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </FormItem>

                {/* <FormItem label="上传文件" {...formItemLayout} >             
                        <UploadFile getUrl={editData.url} setLoading={this.setLoading} />       
                </FormItem> */}

                <FormItem label="访问地址" {...formItemLayout} hasFeedback>
                    {getFieldDecorator('url', {
                        initialValue: editData.url,
                        rules: [{
                            required: true, message: '访问地址不能为空!'
                        }]
                    }
                    )(
                        <Input placeholder="访问地址不能为空" disabled={this.state.inputLoading} />
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





            </Form>

        </Modal>)
    }
}