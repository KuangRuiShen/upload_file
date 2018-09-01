import React from 'react';
import { Upload, Button, Icon, message, Modal, Progress,Input,Form} from 'antd';
import OwnFetch from '../../api/OwnFetch';//封装请求
import $ from 'jquery'

//新的上传文件组件
export default class NewUpload extends React.Component {

    state = {
        loading: false,//是否正在上传
        fileList: [],
        errorList: [],
        vid: '',
        chucknum: 0,//当前分片
        chuckSize: 1,//分片总数
        preUploadPercent: 0,//上传百分比
        videourl: null,
        preurl:undefined,//  前置url
    }

    componentWillMount() {
        // console.info(this.props.editData);
        let editData = this.props.editData;

        if(editData.id){
            this.setState({ vid: this.props.editData.id });
        }else{
            this.setState({ vid:this.getUUID() });  
        }
        if (editData.videourl) {
            this.setState({ videourl: editData.videourl })
        }
        this.getpreUrl();
    }

    getpreUrl=()=>{
        OwnFetch('upload_getpreurl',{}).then(res=>{
            if(res && res.code == 200){
                this.setState({preurl:res.data})
            }
        })
    }





    getUUID=()=>{
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        // s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        // s[8] = s[13] = s[18] = s[23] = "-";    
        var uuid = s.join("");
        return uuid;
    }


    deleteFile = () => {
        OwnFetch("delete_file", { id: this.state.vid });
    }


    handleUpload = () => {
        const { fileList, chucknum, chuckSize, vid } = this.state;
        if (fileList.length == 1) {
            let file = fileList[0];
            var filetypes = [".mp4", ".avi", ".mkv", ".flv", ".vob", ".wmv", ".rm", ".rmvb", ".ram", ".3gp", ".m4v"];
            let filename = file.name.toLowerCase()
            let types = filename.substring(filename.indexOf("."));
            let obj = filetypes.find(item => item == types)
            if (!obj) {
                Modal.error({ title: "不支持该类型上传" })
                return;
            }
            this.setState({ loading: true });
            this.upload(file);
        }
    }





    upload = (file) => {
        let { fileList, chucknum, chuckSize, vid, errorList } = this.state;
        let preUploadPercent = Number((chucknum / chuckSize * 100).toFixed(0));
        let formData = new FormData();//初始化一个FormData对象
        let blockSize = 5 * 1024 * 1024;//每块的大小
        let nextSize = Math.min((chucknum + 1) * blockSize, file.size);//读取到结束位置      
        let total = Math.ceil(file.size / blockSize);  //总片数  

        if (chuckSize != total) {
            this.setState({ chuckSize: total })
        }
        // console.info(file);
        let fileData = file.slice(chucknum * blockSize, nextSize);//截取 部分文件 块
        formData.append("file", fileData);//将 部分文件 塞入FormData      
        formData.append("vid", vid);//保存文件名字
        formData.append("fileName", file.name);//保存文件名字
        formData.append("chucknum", chucknum);//保存文件名字
        formData.append("chuckSize", total); //总片数
        let url = OwnFetch.preurl + "/upload/video";
        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
            // dataType:'json', 
            success: (data) => {
                //  console.info(data)    
                if (errorList.length > 0) {
                    this.setState({ loading: false, chucknum: 0, errorList: [] })
                    Modal.error({title:"上传失败,请重新上传"});
                }
                if (file.size <= nextSize) {//如果上传完成，则跳出继续上传
                    this.setState({ loading: false, chucknum: 0, errorList: [] })
                    Modal.success({title:"上传完成"});
                    this.getVideurl();
                    return;
                }
                this.setState({ chucknum: chucknum + 1, preUploadPercent }, () => this.upload(file));//递归调用
            }, error: () => {
                //错误做处理
                errorList.push(chucknum);
            }
        });
    };

    //重新上传
    reupload = (file, chucknum) => {
        let { chuckSize, vid, errorList } = this.state;
        let preUploadPercent = Number((chucknum / chuckSize * 100).toFixed(0));
        let formData = new FormData();//初始化一个FormData对象
        let blockSize = 5 * 1024 * 1024;//每块的大小
        let nextSize = Math.min((chucknum + 1) * blockSize, file.size);//读取到结束位置      
        let total = Math.ceil(file.size / blockSize);  //总片数  

        if (chuckSize != total) {
            this.setState({ chuckSize: total })
        }
        // console.info(file);
        let fileData = file.slice(chucknum * blockSize, nextSize);//截取 部分文件 块
        formData.append("file", fileData);//将 部分文件 塞入FormData      
        formData.append("vid", vid);//保存文件名字
        formData.append("fileName", file.name);//保存文件名字
        formData.append("chucknum", chucknum);//保存文件名字
        formData.append("chuckSize", total); //总片数
        let url = OwnFetch.preurl + "/upload/video";
        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
            // dataType:'json', 
            success: (data) => {
                let newData = errorList.map(item => {
                    if (item != chucknum) {
                        return item;
                    }
                })
                this.setState({ errorList: newData })
            }, error: () => {
                //错误做处理
                this.reupload(file, chucknum)
            }
        });
    }





    beforeUpload = (file) => {
        this.setState({ fileList: [file] });
        return false;
    }


    onRemove = (file) => {
        if (!this.state.loading) {
            this.setState({ fileList: [] })
        } else {
            message.info("上传中...,请勿关闭")
        }

    }

    getVideurl = () => {
        OwnFetch('get_videurl', { id: this.state.vid }).then(res => {
            if (res && res.code == 200) {               
                this.setState({ videourl: res.data });
                this.props.geturl( res.data);
                this.deleteFile();
            }
        })
    }

    getInputvideourl=()=>{
        let videourl = this.state.videourl;
        if(videourl){
            videourl  = videourl.substring(videourl.lastIndexOf("\/") + 1, videourl.length);
        }  
        return videourl;
    }

    inputonChange=(e)=>{
        let videourl = this.state.preurl+e.target.value;
        this.props.geturl(videourl);
        this.setState({ videourl}); 
    }


    render() {
        // console.info(this.state.vid)
        const { loading } = this.state;
        const FormItem = Form.Item;

        const uploadButton = (
            <Button>
                <Icon type="upload" /> 上传
            </Button>
        );

        
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
            <div>
                <FormItem label="视频播放名称" {...formItemLayout} hasFeedback >
                    <Input placeholder="直接修改视频播放地址" 
                        value={this.getInputvideourl()} 
                        disabled={this.state.loading}
                        onChange={this.inputonChange} />
                </FormItem>
               
                <Upload
                    beforeUpload={this.beforeUpload}
                    onRemove={this.onRemove}
                    fileList={this.state.fileList}
                    action={OwnFetch.preurl + '/upload/video'}
                >
                    {(!this.state.loading || this.state.fileList.length == 0) ? uploadButton : null}
                </Upload>

                <Button
                    style={{ marginTop: 20 }}
                    onClick={this.handleUpload}
                    disabled={this.state.fileList.length === 0}
                    loading={loading}
                >
                    {loading ? '上传中' : '开始上传'}
                </Button>

                {this.state.loading && <Progress percent={this.state.preUploadPercent} />}
                {this.state.videourl ? <div style={{ width: '100%', marginTop: '20px' }}>
                    <p>已有上传视频</p>
                    <video
                        style={{ width: '100%' }}
                        src={this.state.videourl + "?_t=" + Date.parse(new Date()) / 1000}
                        autoPlay  controls
                    /> </div> : <div style={{ width: '100%', height: "300px", marginTop: '20px' }}>视频还没有上传</div>}

            </div>)
    }
}
