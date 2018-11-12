import React from 'react'
import { connect } from 'react-redux'
import { setTransition } from '../../../actions'


import usrimg from './images/userimg.png'
import logo from './images/logo.png'
import tuichu from './images/tuichu.png'
import tongzhi from './images/tongzhi.png'
import { clearUserInfo } from '../../../actions/login';
import UploadPage from './UploadPage';

@connect(store=>{
  let {login} = store
  return {login}
})

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuActive: 0,
      showUpload:false,//显示上传图片的页面
      user:{},
    }
  }


  exit = () =>{
    this.props.dispatch(clearUserInfo())
  }


  //关闭页面
  cancelAdd =()=>{
    this.setState({showUpload:false});
  }

  onClickUpload = ()=>{
    const{user} = this.props.login;
    this.setState({showUpload:true,user});
  }

  showImage=()=>{
    const{user} = this.props.login;
      if(user && user.imageUrl){
        return 	<img src={user.imageUrl} style={{margin:'0',width:'48px',height:'48px',cursor:'pointer'}} onClick={this.onClickUpload}/>
      }
      return 	<img src={usrimg} style={{margin:'0',width:'auto',height:'48px',borderRadius: '50%',cursor:'pointer'}} onClick={this.onClickUpload}/>
  }


  render() {
  
    // console.info('user',user)
    return (
    	<div>
	      <div className='index_header_l'>
	         <div style={{marginTop:5, marginLeft:5}}>
	         	   <img src={logo}/>
	         </div>
	      </div>
				<div className='index_header_r'>
				   您好,{this.props.login.user ? this.props.login.user.yhxm:""}
					<img src={tuichu} onClick = {this.exit} style={{cursor:'pointer',marginRight:15} }/>
					<div style={{float:'right',height:48,width: 48,marginTop: 6,overflow: 'hidden'}}>
            {this.showImage()}
					</div>
				</div>

        {this.state.showUpload && <UploadPage user={this.state.user} closeUploadPage={this.cancelAdd} />}
			</div>
    );
  }
}


