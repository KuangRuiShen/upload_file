import React from 'react';
/**
 * 权限控制
 */


class Perm extends React.Component{

    getPerms = () => {      
      return true;
  }  
    render(){
        if(this.getPerms()){
             return this.props.children;
        }else{
            return null;
        }
    }
}


/**
 * 
 * @param perms 验证多个权限，返回true，false
 */
Perm.cheak = (perms) =>{
    let flag  = false;    
    let data = sessionStorage.getItem("userLogin");
    //如果有登录能判断
    if(data && perms){
     let userPerms = JSON.parse(data).userPerms;
     let arr = perms.split(',');
     for(let perm of arr){
       if(userPerms.includes(perm)){
            flag = true;
            break;
       }
     } 
   }    
   return flag;
}

// Perm.cheak = (perms)=>cheak(perms);

export default Perm;