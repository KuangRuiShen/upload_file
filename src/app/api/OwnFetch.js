import { Modal } from 'antd';
import React from 'react'
import {query, insert, update, remove,post} from "../../utils/api"


//请求
//const pathUrl = "http://localhost";
const pathUrl = "";

const api = [

  { name: 'login', url: "/login", method: 'post' },
  { name: 'category_list', url: "/category/list", method: 'get' },



]


const OwnFetch = (request, params) => {
  // let opts = {};
  let url = "";
  let method = "";

  for (let req of api) {
    //处理
    if (req.name === request) {
        url = req.url;
        method = req.method;
    }
  }
  
  if (method.toLowerCase() == 'get') {
    if (params != undefined && params != "") {
      url = url + "?" + params;
    }
  }
  
  //找不到url
  if(!url){
     url = request;
  }

  if (method == undefined || method == "") {
    method = "GET";
  }

  if (method.toLowerCase() == 'post'){
      return post(url, params);
  }else{
      return query(url,null);
  }
  
}

export default OwnFetch;