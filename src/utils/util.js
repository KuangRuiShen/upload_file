import React, { Component, PropTypes } from 'react';

export const getSize = () => {
	let windowW,windowH,contentH,contentW,scrollT;
	windowH = window.innerHeight;
	windowW = window.innerWidth;
	scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	contentH = (document.documentElement.scrollHeight > document.body.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight;
	contentW = (document.documentElement.scrollWidth > document.body.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth;
	return {windowW,windowH,contentH,contentW,scrollT}
}

export const Pagination = {
    // total:this.state.pageDate.total,
    // pageSize:10,
    showTotal:(total, range) => `当前${range[0]}-${range[1]}条 总数${total}条`,
    // current:this.state.pageDate.page,
    // onChange:this.pageChange,
    showQuickJumper:true
};


export const decode =(input)=>{
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = _utf8_decode(output);
    return output;
}

function _utf8_decode(utftext){
    let string = "";
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

//添加key
export const DateUtil = {

    dateAddKey: function (date) {
        var localCounter = 1;
        date.forEach(el=>{
            el.key = localCounter ++;
        });
        return date
    },
    dataFormat:function(time){//时间戳转时间 => yyyy-mm-dd hh:mm:ss
        let now= new Date(time);
        let year=now.getFullYear();
        let month=(now.getMonth()+1) >= 10 ? (now.getMonth()+1):'0'+(now.getMonth()+1);
        let date=now.getDate() >= 10 ? now.getDate():'0'+now.getDate();
        let hour=now.getHours() >= 10 ? now.getHours():'0'+now.getHours() ;
        let minute=now.getMinutes() >= 10 ? now.getMinutes():'0'+now.getMinutes();
        let second=now.getSeconds() >= 10 ? now.getSeconds():'0'+now.getSeconds();
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    }

}

// GBK字符集实际长度计算
export const getStrLength = str => {
    let realLength = 0;
    let len = str.length;
    let charCode = -1;
    for(let i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        }else{
            // 如果是中文则长度加2
            realLength += 2;
        }
    }
    return realLength;
}

export const transformDate=date=> {
    var createAt = new Date(date);
    var time = new Date().getTime() - createAt.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
}

//主题设置
export const themeUl = [
    {
        name:'theme-a',
        top:'#108ee9',
        left:'#fff',
        right:'rgb(245, 247, 250)',
        menuTheme:'light',
    },{
        name:'theme-b',
        top:'#33b5be',
        left:'#fff',
        right:'rgb(245, 247, 250)',
        menuTheme:'light',
    },{
        name:'theme-c',
        top:'#00a854',
        left:'#fff',
        right:'rgb(245, 247, 250)',
        menuTheme:'light',
    },{
        name:'theme-d',
        top:'#f04134',
        left:'#fff',
        right:'rgb(245, 247, 250)',
        menuTheme:'light',
    },{
        name:'theme-e',
        top:'#373d41',
        left:'#fff',
        right:'rgb(245, 247, 250)',
        menuTheme:'light',
    },{
        name:'theme-f',
        top:'#108ee9',
        left:'#001529',
        right:'rgb(245, 247, 250)',
        menuTheme:'dark',
    },{
        name:'theme-g',
        top:'#00a2ae',
        left:'#001529',
        right:'rgb(245, 247, 250)',
        menuTheme:'dark',
    },{
        name:'theme-h',
        top:'#00a854',
        left:'#001529',
        right:'rgb(245, 247, 250)',
        menuTheme:'dark',
    },{
        name:'theme-i',
        top:'#f04134',
        left:'#001529',
        right:'rgb(245, 247, 250)',
        menuTheme:'dark',
    },{
        name:'theme-j',
        top:'#373d41',
        left:'#001529',
        right:'rgb(245, 247, 250)',
        menuTheme:'dark',
    }
]