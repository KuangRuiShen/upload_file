import React from 'react';

import { Upload, Modal, Button, Icon } from 'antd'
import OwnFetch from '../../api/OwnFetch';//封装请求

export default class Welcome extends React.Component {
    state = {
        fileList: [],
        previewImage: '',
        previewVisible: false,
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
    saveImg = () => {

        const { fileList } = this.state;
        //处理图片
        let imgurls = [];
        fileList.map(item=>{
            if (item.percent == 100) {
                imgurls.push(item.response);
            }
        })
      
        OwnFetch("saveImgs",imgurls).then(res=>{
            if(res && res.code == 200){
                Modal.success({title:'保存成功！'})
            }
        })


    }

    render() {

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', margin: '0 auto' }}>
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
                <div>
                    <Button type="primary" onClick={this.saveImg}>保存</Button>
                </div>
            </div>
        )
    }

}