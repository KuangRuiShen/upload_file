import React from 'react';
import { Upload, Button, Icon,message,Modal } from 'antd';
import './Upload.css';
import OwnFetch from '../../api/OwnFetch';//封装请求

export default class BatchImg extends React.Component{
    constructor(props) {
		super(props)
        this.state={
            vid :'',
            fileList:[],
        }
    }
 

    componentWillMount() { 
        let editData = this.props.editData;
        if(this.props.editData){
            this.setState({vid:editData.id});
        }
        if(editData.imgs && editData.imgs.length > 0){
            let fileList = editData.imgs.map((item,index)=>{
                return {url:item,uid:index, status: 'done',};
            })
            this.setState({fileList});
        }

    }


    onClearFrom=()=>{
        this.props.closePage();
        // this.props.refresh();
    }

          
    fileChange = ({file,fileList,event}) =>{
       let newData = fileList.filter(element =>{
        if(element.status =='removed'){
            return false;
        }else{
            if( !element.url && element.status =='done'){
                element.url = element.response;
            }
            return true;
        }
       }  
    )   
        this.setState({ fileList:newData})
    }

    
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
        const isLt2M = file.size /1024/1024  < 10 ;

        if (!isLt2M) {
          Modal.error({
            content: '图片大小不能超过 10M!',
          });
          return false;
        }
        // this.setState({imageName:file.name,imageFile:file})
        return (isJPG || isGIF || isPNG) && isLt2M;
      }

      //确定
      handleCreate = () => {
          const {vid,fileList} = this.state; 
          let imgs = fileList.map(item=>{
              if(item.url){
                return item.url;
              }
          })
          OwnFetch("video_addrelation",{id:vid,imgs}).then(res=>{
              if(res && res.code==200){          
                this.props.refresh();
                this.props.closePage();
              }
          })

      }




    render(){

          const {vid,fileList} = this.state;

        return(<Modal
            width={500}
            maskClosable={false}
            visible={true}
            title={'上传图片'}      
            onCancel={this.onClearFrom}
            onOk={this.handleCreate}
            >
            <div   style={{maxHeight: '480px',overflow: 'auto'}}  >
                <Upload 
                 className='upload-list-inline'
                 action={OwnFetch.preurl+"/upload/image"}
                 listType='picture'
                 multiple={true}
                 fileList={fileList}
                 onChange={this.fileChange}
                 beforeUpload={this.beforeUpload}
                 >
                    <Button>
                        <Icon type="upload" /> upload
                    </Button>
            </Upload>
            </div>
        </Modal>)
    }
}