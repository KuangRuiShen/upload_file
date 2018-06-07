import React from 'react';
import { Upload, Button, Icon,message,Modal,Progress } from 'antd';
import OwnFetch from '../../api/OwnFetch';//封装请求
import $ from 'jquery'

export default class NewUpload extends React.Component{

    state={
        loading:false,//是否正在上传
        fileList: [],
        vid :'',
        chucknum:0,//当前分片
        chuckSize:1,//分片总数
        preUploadPercent:0,//上传百分比
        videourl:null,
    }

    componentWillMount() {
        // console.info(this.props.editData);
        let editData = this.props.editData;
        this.setState({vid:this.props.editData.id});
        if(editData.videourl){
            this.setState({videourl:editData.videourl})
        }
    }

    
    deleteFile=()=>{
        OwnFetch("delete_file",{id:this.state.vid});
    }


    handleUpload = () => {   
        const { fileList,chucknum,chuckSize,vid} = this.state;
        if(fileList.length == 1){  
            let file = fileList[0];
            let filetypes =[".mp4",".avi",".mkv",".flv",".vob",".wmv",".rm",".rmvb",".ram",".3gp",".m4v"];  
            let filename = file.name.toLowerCase();
            let types = filename.substring(filename.indexOf("."));  
            let obj = filetypes.find(item=>item == types);
            if(!obj){
                Modal.error({title:"不支持该类型上传"})
               return;
            }  
            this.setState({ loading: true});
            this.upload(file);
        }
    }

         upload = (file) => {
            let { fileList,chucknum,chuckSize,vid} = this.state;
            let preUploadPercent = Number((chucknum / chuckSize * 100).toFixed(0));
            let formData = new FormData();//初始化一个FormData对象
            let blockSize = 5 * 1024 * 1024;//每块的大小
            let nextSize = Math.min((chucknum + 1) * blockSize, file.size);//读取到结束位置      
            let total = Math.ceil(file.size / blockSize);  //总片数  

            if(chuckSize !=total){
                this.setState({chuckSize:total})
            }
            // console.info(file);
            let fileData = file.slice(chucknum * blockSize, nextSize);//截取 部分文件 块
            formData.append("file", fileData);//将 部分文件 塞入FormData      
            formData.append("vid", vid);//保存文件名字
            formData.append("fileName", file.name);//保存文件名字
            formData.append("chucknum", chucknum);//保存文件名字
            formData.append("chuckSize", total); //总片数
            $.post({
                url: "/api/upload/video",
                data: formData,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success : (data)=> {  
                    // console.info(data)                
                    if (file.size <= nextSize) {//如果上传完成，则跳出继续上传
                        this.setState({loading:false,chucknum:0})
                        message.info("上传完成");
                        this. getVideurl();
                        return;
                    }
                    this.setState({chucknum:chucknum + 1,preUploadPercent},()=>this.upload(file));//递归调用
                }
            });
        };
    
  
    
        

        beforeUpload = (file) => {
            this.setState({fileList: [file]});
            return false;
          }
      
    
          onRemove= (file) => {
              if(!this.state.loading){
                this.setState({fileList:[]})
              }else{
                message.info("上传中...,请勿关闭")
              }
             
          }

          getVideurl=()=>{
            OwnFetch('get_videurl',{id:this.state.vid}).then(res=>{
                if(res && res.code == 200){
                    this.setState({videourl:res.data})
                }
            })
        }
    

          onClearFrom =()=>{
              this.deleteFile();
            this.props.closePage();
            this.props.refresh();
        }
           
  

    render(){
        // console.info(this.state.vid)
        const { loading} = this.state;

        const uploadButton = (
            <Button>
               <Icon type="upload" /> 上传
            </Button>
          );

        return(<Modal
            width={600}
            maskClosable={false}
            visible={true}
            title={'上传视频'}
            footer={null}
            data={{vid:this.state.vid}}
            onCancel={this.onClearFrom}
            onOk={this.onClearFrom}
            >  
             <Upload  
             beforeUpload={this.beforeUpload}
             onRemove={this.onRemove}
             fileList={this.state.fileList}
             action ={ OwnFetch.preurl+'/image/video'}
             >
                {(!this.state.loading||this.state.fileList.length ==0) ? uploadButton :null}
            </Upload>

                 <Button
                    style={{marginTop:20}}
                    onClick={this.handleUpload}
                    disabled={this.state.fileList.length === 0}
                    loading={loading}
                    >
                    {loading ? '上传中' : '开始上传' }
                    </Button>

                        {this.state.loading && <Progress percent={this.state.preUploadPercent} />}
                    {this.state.videourl ? <div style={{width:'100%',marginTop: '20px'}}>
                        <p>已有上传视频</p>
                        <video  
                    src={this.state.videourl}  
                    autoPlay loop controls
                    /> </div>: <div style={{width:'100%',height:"300px",marginTop: '20px'}}>视频还没有上传</div>}     

        </Modal>)
    }
}
