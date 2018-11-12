import { Tag, Breadcrumb } from 'antd';
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import HOME from './HOME_ICON.png'

class BreadCrumb extends React.Component {
  constructor() {
    super();
    this.state = {
      abc: "abc"
    };
  }

  changeBreadCrumb = (content) => {
    // 把要替换的先遍历出来
    var field = ['key', 'content', 'link']
    let tmpBreadCrumb = {}
    let newBreadCrumb = []
    var crumb = []
    var crumbs = []
    var i = 0
    if (content.indexOf("|") > -1) {
      crumbs = content.split("|")
      for (var j = 0; j < crumbs.length; j++) {
        crumb = crumbs[j].split(",")
        tmpBreadCrumb = {}

        for (i = 0; i < crumb.length; i++) {
          tmpBreadCrumb[field[i]] = crumb[i]
        }
        newBreadCrumb.push(tmpBreadCrumb)
      }

    }
    else {
      crumb = content.split(",")

      for (i = 0; i < crumb.length; i++) {
        tmpBreadCrumb[field[i]] = crumb[i]
      }
      newBreadCrumb.push(tmpBreadCrumb)
    }


    // 获取全局的面包屑
    let BusinessDbBreadCrumb = JSON.parse(sessionStorage.getItem('BreadCrumb'))
    var totalLen = BusinessDbBreadCrumb.length
    var addLen = newBreadCrumb.length

    // 移除某个元素以及其下级
    for (var i = 0; i < addLen; i++) {
      for (var j = 0; j < totalLen; j++) {
        if (newBreadCrumb[i][field[0]] == BusinessDbBreadCrumb[j][field[0]]) {
          while (j < totalLen) {
            BusinessDbBreadCrumb.pop()
            j++
          }
          break
        }
      }
    }

    for (i = 0; i < addLen; i++) {
      BusinessDbBreadCrumb.push(newBreadCrumb[i]);
    }

    sessionStorage.setItem('BreadCrumb', JSON.stringify(BusinessDbBreadCrumb))
  }

  render() {
    let BusinessDbBreadCrumb = JSON.parse(sessionStorage.getItem('BreadCrumb'))

    

    return (
      <div style={{ height: '35px', lineHeight: '35px', paddingLeft: '10px', backgroundColor: '#047CBC', color: '#FFFFFF' }}>
        <Breadcrumb separator=">">
          <div style={{ color: '#FFFFFF', float: 'left' }}><div style={{ float: 'left', paddingTop: '5px' }}><img src={HOME} /></div>当前位置：</div>
          {
            BusinessDbBreadCrumb.map((BreadCrumb, index) => {
              let content = BreadCrumb.key + "," + BreadCrumb.content + "," + BreadCrumb.link

              if (BreadCrumb.link) {
                return <Breadcrumb.Item ><Link style={{ color: '#FFFFFF' }} key={index} to={BreadCrumb.link} onClick={ this.changeBreadCrumb.bind(this, content) }>{BreadCrumb.content}</Link></Breadcrumb.Item>
              }
              else {
                return <Breadcrumb.Item style={{ color: '#FFFFFF' }}>{BreadCrumb.content}</Breadcrumb.Item>
              }
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default BreadCrumb;