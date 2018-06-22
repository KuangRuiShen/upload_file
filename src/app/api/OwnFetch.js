import { Modal } from 'antd';
import React from 'react'
import {query, insert, update, remove,post} from "../../utils/api"


//请求
// const pathUrl = "http://localhost";


const api = [

  { name: 'login', url: "/login", method: 'post' },

  { name: 'category_all', url: "/category/all", method: 'get' },

  { name: 'category_list', url: "/category/list", method: 'get' },
  { name: 'category_delete', url: "/category/delete", method: 'post' },
  { name: 'category_add', url: "/category/add", method: 'post' },
  { name: 'category_update', url: "/category/update", method: 'post' },

  { name: 'star_all', url: "/star/all", method: 'get' },
  { name: 'star_list', url: "/star/list", method: 'get' },
  { name: 'star_delete', url: "/star/delete", method: 'post' },
  { name: 'star_add', url: "/star/add", method: 'post' },
  { name: 'star_update', url: "/star/update", method: 'post' },

  { name: 'video_list', url: "/video/list", method: 'get' },
  { name: 'video_delete', url: "/video/delete", method: 'post' },
  { name: 'video_add', url: "/video/add", method: 'post' },
  { name: 'video_update', url: "/video/update", method: 'post' },
  { name: 'video_addrelation', url: "/video/addrelation", method: 'post' },

  { name: 'user_list', url: "/user/list", method: 'get' },
  { name: 'user_addmaster', url: "/user/addmaster", method: 'get' },
  { name: 'user_password', url: "/user/password", method: 'post' },

  //订单号
  { name: 'user_order', url: "/user/order", method: 'get' },

  { name: 'comment_list', url: "/comment/list", method: 'get' },
  { name: 'comment_delete', url: "/comment/delete", method: 'post' },
  { name: 'comment_add', url: "/comment/add", method: 'post' },
  { name: 'comment_update', url: "/comment/update", method: 'post' },

  { name: 'delete_file', url: "/upload/file", method: 'get' },
  { name: 'get_videurl', url: "/upload/videurl", method: 'get' },

  { name: 'user_menoy', url: "/user/menoy", method: 'get' },
  { name: 'user_mange', url: "/user/mange", method: 'get' },

  { name: 'setmeal_list', url: "/setmeal/list", method: 'get' },
  { name: 'setmeal_edit', url: "/setmeal/edit", method: 'post' },



  { name: 'user_changeinfo', url: "/user/changeinfo", method: 'post' },


  //公共代码
  { name: 'code', url: "/code", method: 'get' },
  
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
// OwnFetch.preurl=""

export default OwnFetch;