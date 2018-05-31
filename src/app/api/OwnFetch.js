import { Modal } from 'antd';
import React from 'react'
import {query, insert, update, remove,post} from "../../utils/api"


//请求
//const pathUrl = "http://localhost";
const pathUrl = "";

const api = [

  { name: 'login', url: "/login", method: 'post' },
  { name: 'category_list', url: "/category/list", method: 'get' },
  { name: 'category_delete', url: "/category/delete", method: 'post' },
  { name: 'category_add', url: "/category/add", method: 'post' },
  { name: 'category_update', url: "/category/update", method: 'post' },



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
  


  if (method == undefined || method == "") {
    method = "GET";
  }

  if (method.toLowerCase() == 'post'){
      return post(url, params);
  }else{
      return query(url,params);
  }
  
}

export default OwnFetch;