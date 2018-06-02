import { Modal } from 'antd';
import React from 'react'
import {query, insert, update, remove,post} from "../../utils/api"


//请求
//const pathUrl = "http://localhost";


const api = [

  { name: 'login', url: "/login", method: 'post' },

  { name: 'category_all', url: "/category/all", method: 'get' },

  { name: 'category_list', url: "/category/list", method: 'get' },
  { name: 'category_delete', url: "/category/delete", method: 'post' },
  { name: 'category_add', url: "/category/add", method: 'post' },
  { name: 'category_update', url: "/category/update", method: 'post' },

  { name: 'video_list', url: "/video/list", method: 'get' },
  { name: 'video_delete', url: "/video/delete", method: 'post' },
  { name: 'video_add', url: "/video/add", method: 'post' },
  { name: 'video_update', url: "/video/update", method: 'post' },
  { name: 'video_addrelation', url: "/video/addrelation", method: 'post' },

  { name: 'user_list', url: "/user/list", method: 'get' },
  { name: 'user_password', url: "/user/password", method: 'post' },
  
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

OwnFetch.preurl="/api"

export default OwnFetch;