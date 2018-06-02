import {fetchStart} from './fetchError'
import OwnFetch from '../../app/api/OwnFetch'; //封装请求
import {Modal} from 'antd'

export const REQUEST_USERINFO = 'REQUEST_USERINFO'
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO'
export const CLEAR_USERINFO = 'CLEAR_USERINFO'

// const SERVICE_URL = 'http://127.0.0.1:8080';

const requestUserInfo = ()=> ({
    type:REQUEST_USERINFO,
    data: null
})

export const clearUserInfo = () => ({
    type:CLEAR_USERINFO,
    data: null
})

const receiveUserInfo = (data) => ({
    type:RECEIVE_USERINFO,
    data: data
})

 
         
export const userLogin = (username, password) =>{
    return dispatch=>{
    //登录中
    dispatch(requestUserInfo());
    OwnFetch('login', {username,password}).then(res=>{
        if(res && res.code == '200'){
            let user = res.data;
            // console.info(user);
            sessionStorage.setItem("userLogin",JSON.stringify(user));
            dispatch(receiveUserInfo(user)) 
        // }else{
        //     Modal.error({ title: '登录失败', content: res.message});
        //     dispatch(clearUserInfo()) 
        }
     })
    }
}    
//     post(SERVICE_URL+"/Guest/login", {userName,userPassword}).then(res=>{
//         if(res.statusCode == '000000'){
//                 //相应成功
//                 if(res && res.statusCode == '000000'){
//                 	sessionStorage.setItem("userID",res.userID);
//                     //所有用户权限
//                     let user = res.data.user;           
//                     let userPerms = res.data.userGn.map(item=>item.perms);
//                     let allMenu = getUserMenu(res.data.userMenu,-1);
//                     let access_key = res.data.access_key;        
                    
//                     // location.href = '#/index';.
//                     // sessionStorage.setItem("access_key",JSON.stringify(res.access_token)).
// //                  sessionStorage.setItem("access_key",JSON.stringify(access_key))            
// //                  sessionStorage.setItem("userLogin",JSON.stringify({user,userPerms,allMenu}))
//                     dispatch(receiveUserInfo({user,userPerms,allMenu}))                   
//                 }else{                
//                     dispatch(clearUserInfo())
//                 }            
//         }else{
// //          Modal.error({ title: '登录失败', content: res.message});
//             dispatch(clearUserInfo())
//         }
//     })




export const userLogout = (dispatch) => {
    sessionStorage.removeItem("userLogin");
    sessionStorage.removeItem("access_key");
    dispatch(clearUserInfo());
}
