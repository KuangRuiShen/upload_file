import { Modal,Icon,Upload} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { changeUserImage } from '../../../actions/login'


@connect(store=>{
  let {login} = store
  return {login}
})

export default class UploadPage extends React.Component {
    constructor(props) { 
    super(props)
    // console.info('user',)
		this.state = {
            user:this.props.user,//显示上传图片的页面
            visible:true,
            imageUrl:this.props.user.imageUrl,//图片的链接
            imageFile:{},//保存的文件
            imageName:'',
        }
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
        const isLt2M = file.size / 1024  < 100 ;
        console.info('file.size', file.size / 1024 )
        if (!isLt2M) {
          Modal.error({
            content: '图片大小不能超过 100KB!',
          });
          return false;
        }
        this.setState({imageName:file.name,imageFile:file})
        return (isJPG || isGIF || isPNG) && isLt2M;
      }
   



      handleChange = (info) => {
          // console.info("ssss",info);
        if (info.file.status === 'done') {
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
      }


      getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

      oncancel=()=>{
        this.props.closeUploadPage();
        // console.info(this.props.login.user)
        if(this.state.imageName){
          //如果修改当前用户则保存用户的图片
          if(this.state.user.yhbh = this.props.login.user.yhbh){
            let user =  this.props.login.user;
            user.imageUrl =this.state.imageUrl;
            this.props.dispatch(changeUserImage(user))
          }        
          //刷新用户列表
          if( this.props.refresh){
              this.props.refresh();
          }
         
        }
      
      }
     

    render(){
        const actionUrl = "/api/system/userInfo/uploadImage";
        const {imageUrl,imageFile,imageName} = this.state

        return(
            <Modal
            width={400}
            maskClosable={false}
            visible={this.state.visible}
            title={"用户图片上传"}
            onCancel={this.oncancel}
            footer={false}
        >
        <div style={{height:130}}>
            <Upload
                                uid="upload"
                                key="upload"
                                name="上传头像"
                                showUploadList={false}
                                data={{yhbh:this.state.user.yhbh,imageFile,imageName}}
                                action={actionUrl}                    
                                accept="image/jpg,image/jpeg,image/png,image/bmp"
                                beforeUpload={this.beforeUpload}      
                                onChange={this.handleChange}           
                                withCredentials={true}
                                style={{marginLeft:15}}
                              >
                                {/* {this.state.fileList.length >= 1 ? null : <div style={{textAlign:'center'}}>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">Upload</div>
                                    </div>} */}
                                    {
                                        imageUrl ?
                                        <img src={imageUrl} alt=""  style={{height: '58px',marginLeft:20,marginTop: 25,width: 58,overflow:'hidden'}}/> :
                                        <Icon type="plus" style={{ width: 100, height: 100,border: '1px dashed #d9d9d9',borderRadius: 6,cursor: 'pointer',
                                        display: 'table-cell',verticalAlign:'middle',fontSize:28,color: '#999' }} />
                                    }
                      </Upload>
                    <div style={{float:'right', marginRight:30,marginTop: 12}}>
                        <h2>图片上传说明</h2>
                        <p>图片大小不能超过100kb</p>
                        <p>必须是JPG/PNG/GIF格式文件</p>
                        <p>图片的像素约定大小58 X 58</p>                      
                    </div>

          </div>
         
        </Modal>
        )

    }




}