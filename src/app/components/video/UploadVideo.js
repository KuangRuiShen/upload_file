import React from 'react';
import { Upload, Button, Icon,message,Modal } from 'antd';
import OwnFetch from '../../api/OwnFetch';//封装请求


export default class UploadVideo extends React.Component{

    state={
        loading:false,//是否正在上传
        vid :'',
        videourl:null,
        fileList:[],
    }

    componentWillMount() {
        let editData = this.props.editData;
        this.setState({vid:this.props.editData.id});
        if(editData.videourl){
            this.setState({videourl:editData.videourl})
        }
        
    }

           
    fileChange = (info) =>{
        this.setState({ fileList})
        this.setState({fileList:info.fileList});   
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }  
        if(info.file.response && info.file.status === 'done'){
            this.setState({ loading: false,videourl:info.file.response});
            Modal.success({title:"已经上传成功"});
        }      
     }


    onClearFrom =()=>{
        this.props.closePage();
        this.props.refresh();
    }

    beforeUpload = (file) => {
        this.setState({loading:true})     
        return true;
      }


    render(){
        // console.info(this.state.vid)

        const fileList = [];  
        const uploadButton = (
            <Button>
               <Icon type="upload" /> 上传
            </Button>
          );

        return(<Modal
            width={600}
            maskClosable={false}
            visible={true}
            title={this.props.editData.videourl?'修改视频':'上传视频'}
            footer={null}
            data={{vid:this.state.vid}}
            onCancel={this.onClearFrom}
            onOk={this.onClearFrom}
            >  
            <Upload 
                action={OwnFetch.preurl+"/upload/video"}
                listType='video'
                data={{vid:this.state.vid}}
                defaultFileList={fileList}
                onChange={this.fileChange}
                beforeUpload={this.beforeUpload}
                >
                {(!this.state.loading||this.state.fileList.length ==0) ? uploadButton :null}
            
        </Upload>
        {this.state.videourl ? <div style={{width:'100%',marginTop: '20px'}}>
            <p>已有上传视频</p>
            <video  
           src={this.state.videourl}  
           controls="controls"
           /> </div>: <div style={{width:'100%',height:"300px",marginTop: '20px'}}>视频还没有上传</div>}                   
        </Modal>)
    }
}
