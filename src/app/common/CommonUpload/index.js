/**
 * 单一文件上传
 */

import React from 'react';
import { Upload, Button, Icon, message, Spin, Modal } from "antd";
import OwnFetch from '../../api/OwnFetch';

export default class CommonUploadIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileId: '',
            loading: false,
            fileList: [],
            text:'上传'
        }
    }

    componentDidMount() {
        
        if(this.props.defaultValue){
            this.setState({fileId:this.props.defaultValue});
        }

        if(this.props.text){
            this.setState({text:this.props.text})
        }
   

        //外界传进来
        this.setState({ loading: true }, () => {
            if (this.props.value) {
                //赋值
                // if (this.props.onChange) {
                //     this.props.onChange(this.props.value);
                // }
                //加载文件
                let fileList = [];
                OwnFetch('/file/query', { fileId: this.props.value }).then(res => {
                    if (res && res.code == 200 && res.data) {
                        let file = res.data;
                        fileList.push({
                            uid: file.fileId,
                            name: file.name,
                            status: 'done',
                            url: file.url,
                        })   
                    }
                    this.setState({ fileId: this.props.value, fileList, loading: false })
                })         
            } else {
                this.setState({ fileId: '', loading: false })
            }
        })

        //如果有文件则显示
        if (this.props.fileList) {
            this.setState({ fileList: this.props.fileList })
        }
    }

    //修改
    handleChange = (info) => {
        let fileList = info.fileList;
        this.setState({ fileList })

        //删除
        if(fileList.length == 0){
            if (this.props.onChange) {
                this.props.onChange('');
            }
        }

        // console.info("d", fileList)
        // 2. Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.data.url;
                //保存fjbh
                if (file.response.code == 200) {
                    if (this.props.onChange) {
                        this.props.onChange(file.response.data.fileId);
                    }
                    Modal.success({title:"上传成功"})
                    this.setState({ fileId: file.response.data.fileId });     
                }else{
                    Modal.success({title:"上传失败，请重新上传或者联系管理员!"})  
                }
            }
            return file;
        });
        // 3. Filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });
    }

    beforeUpload = (file) => {
        console.info(file.type)
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //   message.error('You can only upload JPG file!');
        // }
        // console.info("file.type", file.type);
        const isLt10M = file.size / 1024 / 1024 < 20;
        if (!isLt10M) {
            this.setState({ fileList: [] })
            message.error('文件大小不能超过20M!');
        }
        return isLt10M;
    }


    render() {
        return (
            <Spin tip="加载中..." spinning={this.state.loading}>
                <Upload
                    action='/api/file/upload'
                    fileList={this.state.fileList}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                    // placeholder="皮肤包文件(tar.gz)"
                    >
                    <Button disabled={this.state.fileList.length == 1}>
                        <Icon type="upload" /> {this.state.text}
                </Button>
                </Upload>
            </Spin>
        )
    }
}
