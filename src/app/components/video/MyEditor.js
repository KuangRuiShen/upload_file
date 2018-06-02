import React from 'react';
import Editor from 'wangeditor';
import {message } from 'antd'


export default class Category extends React.Component{
    state={
        editorHtml:''
    }


    componentDidMount() {
        //判断modal是否需要显示
        
        //获取真实dom，创新富文本编辑器
        let elem = this.refs.editor_div
        var editor = new Editor(elem);
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = (html) => {
          this.setState({ editorHtml: html })
          if(this.props.getText){
            this.props.getText(html);
          }
          //将html值设为form表单的desc属性值

        }
        editor.create();
        //如果有值传过来
        if(this.props.text){
            editor.txt.html(this.props.text)
        }
       
    }

    render(){
        return(<div ref="editor_div">



        </div>)
    }
}