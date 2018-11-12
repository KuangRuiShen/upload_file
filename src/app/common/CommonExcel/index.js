/**
 * 单一文件上传
 */

import React from 'react';
import { Button, Icon, message, Modal } from "antd";
import { Ajax } from "yui-for-react";
import Upload from '../CommonUpload';

export default class CommonExcelIndex extends React.Component {
    //设置可以传递参数的默认值
    static defaultProps = {
        title: undefined,//导入控件的标题
        url: undefined,//提交的路径
        fileName: undefined,//导入模板名称
        onCancel: undefined,//关闭Excel导入控件的回调事件
        onSuccess: undefined,//导入成功时的回调事件
        // formItemList:undefined,//自定义参数表单，格式：[{label:'类型',key:'key',required:true,message:'错误信息提示',initialValue:'1',render:()=>{ return <Input></Input>}}]
        description: undefined,//描述，格式：['第一行的提示','第二行的提示']
    }

    constructor(props) {
        super(props);
        this.state = {
            title: '导入模板',
            visible: false,
            url: props.url,//提交的url
            fileName: props.fileName,//
            description: '',
            fileId: '',
            loading: false,
        }
    }


    //显示模板
    show = () => {
        if (this.props.title) {
            this.setState({ title: this.props.title })
        }

        if (this.props.description) {
            this.setState({ description: this.props.description })
        }

        this.setState({ visible: true })
    }

    onc


    //提交
    handleCreate = () => {
        let { fileId, url } = this.state;
        if (fileId) {
            this.setState({ loading: false }, () => {        
                Ajax.query(url, { fileId }).then(res => {
                    if (res && res.code == 200) {
                        Modal.success({ title: '导入成功!' })
                        //成功后处理
                        if (this.props.onSuccess) {
                            this.props.onSuccess();
                        }
                        // this.onCancel();
                    } else {
                        this.setState({ loading: false })
                    }
                })
            })
        } else {
            Modal.info({ title: "请先上传文件" })
        }
    }

    fileOnChange = (fileId) => {
        this.setState({ fileId });
    }


    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.setState({ visible: false })
    };


    //下载模板
    ondown = () => {
        // location.href = baseUrl + url + paramStr;
        window.location.href = `${window.location.origin}/api/template` + "?fileName=" + this.state.fileName
    }

    render() {
        return (
            <Modal
                width={600}
                key={this.state.visible}
                visible={this.state.visible}
                maskClosable={false}
                confirmLoading={this.state.loading}
                title={this.state.title}
                onCancel={this.onCancel}
                onOk={this.handleCreate}
            >
                <div style={{ margin: '10px 0', padding: '10px 0' }}>
                    <div>上传文件需要按照模板上传，如果还没有模板，可以先点击下载</div>
                    <div>{this.state.description}</div>
                    <Button type="primary" icon="download" onClick={this.ondown} style={{ margin: '20px 0px' }}>下载模板</Button>
                    <Upload onChange={this.fileOnChange} />


                </div>
            </Modal>
        )
    }
}
