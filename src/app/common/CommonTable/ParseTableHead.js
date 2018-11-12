import { Table, Button } from 'antd';
import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'


const ParseTableHead = (json, onClickFunction, renderFunction) => {

  let columns = []

  // 解析表头数据
  const headData = json.headData
  headData.forEach((item, index) => {
    let column = {}
    // 获取要解析的key
    const headKey = json.headKey;

    // 遍历headKey
    headKey.forEach((key, i) => {
      if (item[key] != null) {
        // 当有tag属性时，输出tag标签div
        if (item[key].tag) {
          let TitleTag = item[key].tag
          // 当有function时，绑定function方法
          if (item[key].func) {
            // let TitleOnClickFunc = eval(this[item[key].func])
            // column[key] = <TitleTag onClick={TitleOnClickFunc.bind(this, TitleTag)}>{item[key].value}</TitleTag>
            column[key] = <TitleTag onClick={onClickFunction.bind(this, TitleTag)}>{item[key].value}</TitleTag>
          }
          else {
            column[key] = <TitleTag>{item.value}</TitleTag>
          }
        }
        // 当有render时，绑定render方法
        else if (key.toLowerCase() == 'render') {
          // column[key] = eval(this[item[key].value])
          column[key] = renderFunction
        }
        else {
          column[key] = item[key].value
        }
      }
    })
    columns.push(column)
  })

  return columns
}

export default ParseTableHead;