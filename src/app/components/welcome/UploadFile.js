import { Upload, message, Button, Icon } from 'antd';
import React from 'react';
import OwnFetch from '../../api/OwnFetch';//封装请求

export default class UploadFile extends React.Component {

    state = {
        fileList: [],
        loading:false,
    }

    //上传前處理
    componentDidMount(){

    }

    onChange = (info) => {
        this.setState({ fileList: info.fileList })
        this.uploading(true);
        if (info.file.status !== 'uploading') {
            this.uploading(false)
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            // this.uploading(false)
            message.success(`上传成功!`);
        } else if (info.file.status === 'error') {
            message.error(`上传失败!`);
        }
    }

    uploading=(loading)=>{
        this.setState({loading})
        //上传中
        if(this.props.setLoading){
            this.props.setLoading(loading);
        }
    }


    uploadButton = () => {

    }

    //上传前
    // beforeUpload = (file) => {
    //     const isJPG = file.type === 'image/jpeg';
    //     const isGIF = file.type === 'image/gif';
    //     const isPNG = file.type === 'image/png';
    //     if (!isJPG && !isGIF && !isPNG) {
    //         Modal.error({
    //             content: '必须是JPG/PNG/GIF格式文件',
    //         });
    //         return false;
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 10;

    //     if (!isLt2M) {
    //         Modal.error({
    //             content: '图片大小不能超过 10M!',
    //         });
    //         return false;
    //     }
    //     // this.setState({imageName:file.name,imageFile:file})
    //     return (isJPG || isGIF || isPNG) && isLt2M;
    // }



    render() {


        const uploadButton = (
            <div>
                <Button onClick={this.uploadButton}>
                    <Icon type="upload" />上传文件
                </Button>
            </div>
        );

        return (
            <Upload
                name='file'
                action={OwnFetch.preurl + "/upload/file"}
                headers={{ authorization: 'authorization-text' }}
                onChange={this.onChange}
            >
                {fileList.length == 1 ? null : uploadButton}

            </Upload>
        )
    }
}