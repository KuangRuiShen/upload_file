

export const getUUID = (len, radix) => {
  	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  	var uuid = [], i;
  	radix = radix || chars.length;
  	if (len) {
   		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  	} else {
   		var r;
   		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
   		uuid[14] = '4';
   		for (i = 0; i < 36; i++) {
    		if (!uuid[i]) {
     			r = 0 | Math.random()*16;
     			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
    		}
   		}
  	}
  return uuid.join('');
}

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
	var output = "";  
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
	var i = 0;  
	input = _utf8_encode(input);  
	while (i < input.length) {  
		chr1 = input.charCodeAt(i++);  
		chr2 = input.charCodeAt(i++);  
		chr3 = input.charCodeAt(i++);  
		enc1 = chr1 >> 2;  
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
		enc4 = chr3 & 63;  
		if (isNaN(chr2)) {  
			enc3 = enc4 = 64;  
		} else if (isNaN(chr3)) {  
			enc4 = 64;  
		}  
		output = output +  
		_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
		_keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
	}  
	return output;
}

function _utf8_encode  (string) {  
    string = string.replace(/\r\n/g,"\n");  
    var utftext = "";  
    for (var n = 0; n < string.length; n++) {  
        var c = string.charCodeAt(n);  
        if (c < 128) {  
            utftext += String.fromCharCode(c);  
        } else if((c > 127) && (c < 2048)) {  
            utftext += String.fromCharCode((c >> 6) | 192);  
            utftext += String.fromCharCode((c & 63) | 128);  
        } else {  
            utftext += String.fromCharCode((c >> 12) | 224);  
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
            utftext += String.fromCharCode((c & 63) | 128);  
        }  

    }  
    return utftext;  
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
