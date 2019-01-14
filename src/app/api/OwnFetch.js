
import { query, post } from "../../utils/api"


//请求
// const pathUrl = "http://localhost";


const api = [
    //欢迎页
    { name: 'welcome_add', url: "/welcome/add", method: 'post' },
    { name: 'welcome_update', url: "/welcome/update", method: 'post' },
    { name: 'welcome_delete', url: "/welcome/delete", method: 'post' },
    { name: 'welcome', url: "/welcome", method: 'get' },

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
    { name: 'user_addmaster', url: "/user/addmaster", method: 'post' },
    { name: 'user_password', url: "/user/password", method: 'post' },
    { name: 'user_delete', url: "/user/delete", method: 'post' },

    //标签
    { name: 'label_list', url: "/label/list", method: 'get' },
    { name: 'label_delete', url: "/label/delete", method: 'post' },
    { name: 'label_add', url: "/label/add", method: 'post' },
    { name: 'label_update', url: "/label/update", method: 'post' },

    //订单号
    { name: 'user_order', url: "/user/order", method: 'get' },
    //评论
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

    //统计页面
    { name: 'charging_list', url: "/charging/list", method: 'get' },

    { name: 'user_changeinfo', url: "/user/changeinfo", method: 'post' },

    //上传
    { name: 'upload_getpreurl', url: "/upload/getpreurl", method: 'get' },

    //公共代码
    { name: 'code', url: "/code", method: 'get' },
    //系统用户管理
    { name: 'system_list', url: "/system/list", method: 'get' },
    { name: 'system_users', url: "/system/getUsers", method: 'get' },
    { name: 'system_add', url: "/system/add", method: 'post' },
    { name: 'system_edit', url: "/system/edit", method: 'post' },
    { name: 'system_delete', url: "/system/delete", method: 'post' },
    { name: 'system_password', url: "/system/password", method: 'post' },//修改密码
    { name: 'system_num', url: "/system/num", method: 'get' },
    { name: 'system_saveNum', url: "/system/saveNum", method: 'get' },

    { name: 'system_total', url: "/system/total", method: 'get' },

    //支付接口
    { name: 'pay_list', url: "/pay/list", method: 'get' },
    { name: 'pay_change', url: "/pay/change", method: 'post' },

    //支付接口二
    { name: 'cccePay_list', url: "/cccePay/list", method: 'get' },
    { name: 'cccePay_update', url: "/cccePay/update", method: 'post' },

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
            break;
        }
    }

    //找不到url
    if (!url) {
        url = request;
    }


    if (method == undefined || method == "") {
        method = "GET";
    }


    if (method.toLowerCase() == 'post') {
        return post(url, params);
    } else {
        return query(url, params);
    }
}

OwnFetch.preurl = "/api"


export default OwnFetch;