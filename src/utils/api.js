import axios from "axios";
import { Modal } from 'antd';
import {clearUserInfo} from '../redux/actions/login';
// import { connect } from 'react-redux';


axios.defaults.baseURL = '/api';

axios.defaults.withCredentials = true;
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';//Ajax get请求标识
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';//Ajax post请求标识
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';//POST请求参数获取不到的问题
axios.defaults.headers.put['X-Requested-With'] = 'XMLHttpRequest';//Ajax put请求标识
axios.defaults.headers.delete['X-Requested-With'] = 'XMLHttpRequest';//Ajax delete请求标识

axios.interceptors.response.use((response)=>{
    // console.info("ddd",response);
    // if(response.code==302){
    //     Modal.error({title:'操作错误', content:response.message});
    //     window.sessionStorage.removeItem('access_key');
    //     //window.indexRouter.push("/");
    //     if(window.casStatus){
    //         window.location =  window.location.origin + window.location.pathname +'auth?service=' + encodeURIComponent(window.location.origin+ window.location.pathname+'#/workspace');
    //     }else{
    //         history.push("/");
    //     }
    // }else if(response.code==401){
    //     Modal.error({title:'操作错误', content:response.message});
    // }
    if(response.data && response.data.code != 200){
        //登录超时
        Modal.error({title:'错误信息', content:response.data.message});
    }
    return response;
},(error)=>{
   
    // console.info("ddd",error.response);
    if(error.response.status == 504){
                //登录超时
             Modal.error({title:'系统错误', content:"请联系管理员！"});
            // window.dispatch(clearUserInfo());
        }
     return error.response;
    // if(error.response.status == 401 ){
    //     Modal.error({title:'登录超时', content:"请重新登录！"});
    //     window.dispatch(clearUserInfo());
    // }else if(error.response.status ==302){
    //     Modal.error({title:'没有该权限', content:error.response.data.message});    
    // }else if(error.response.status == 504){
    //         //登录超时
    //     Modal.error({title:'系统错误', content:"连接超时,请联系管理员！"});
    //     window.dispatch(clearUserInfo());
    // }
    // if(error.response.status == 302){//接口访问没有授权！
    //     Modal.error({title:'操作错误', content:error.response.message});
    //     window.sessionStorage.removeItem('access_key');
    //     //window.indexRouter.push("/");
    //     if(window.casStatus){
    //         window.location =  window.location.origin + window.location.pathname +'auth?service=' + encodeURIComponent(window.location.origin+ window.location.pathname+'#/workspace');
    //     }else{
    //         history.push("/");
    //     }
    // //接口没有授权
    
    // }else if(error.response.data.code ==510){
    //     Modal.error({title:'没有该权限', content:error.response.data.message});
    //     //  window.dispatch(clearUserInfo());
    // }else if(error.response.status == 500){//系统错误
    //     return error.response;
    // }else if(error.response.data.code == 510){//令牌已失效
    //     Modal.error({title:'登录超时', content:"请重新登录！"});
    //     window.dispatch(clearUserInfo()); 
    if(error.response.status == 504){
        //登录超时
        // Modal.error({title:'系统错误', content:"连接超时,请联系管理员！"});
        // window.dispatch(clearUserInfo());
    }
});

axios.interceptors.request.use((config) =>{
    let access_key = JSON.parse(window.sessionStorage.getItem('access_key'));
    // let Authorization=window.sessionStorage.getItem('Authorization');
    if(access_key!=null && access_key!=''){
        config.headers.delete['Authorization']= "Bearer " + access_key;
        config.headers.get['Authorization']= "Bearer " + access_key;
        config.headers.post['Authorization']= "Bearer " + access_key;
        config.headers.put['Authorization']= "Bearer " + access_key;
    // }else if(access_key != null){
    //       config.headers.delete['Authorization']= "Bearer " + access_key;
    //       config.headers.get['Authorization']="Bearer " + access_key;
    //       config.headers.post['Authorization']="Bearer " + access_key;
    //       config.headers.put['Authorization']="Bearer " + access_key;
    }
    if(config.method=='get'){
        config.params = {
            _t: Date.parse(new Date())/1000,
            ...config.params
        }
    } 
     return config;
});

export function query(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params:params}).then(res => {
            if(res){
                resolve(res.data)
            }     
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url,params).then(res => {
            if(res){
                resolve(res.data)
            }  
        }).catch(err => {
            reject(err)
        })
    })
}

export function insert(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url,params).then(res => {
            if(res){
                resolve(res.data)
            }  
        }).catch(err => {
            reject(err)
        })
    })
}

export function update(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            if(res){
                resolve(res.data)
            }  
        }).catch(err => {
            reject(err)
        })
    })
}

export function remove(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url,params).then(res => {
            if(res){
                resolve(res.data)
            }  
        }).catch(err => {
            reject(err)
        })
    })
}
