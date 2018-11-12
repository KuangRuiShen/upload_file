import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { Button } from 'antd'


@connect(store => ({userPerms:store.login.userPerms}))
class CommonButton extends React.Component{
    render(){
        if(!this.props.perms || this.props.userPerms.includes(this.props.perms)){
            return <Button type={this.props.type} onClick={this.props.onClick} style={this.props.style}
            key={this.props.key}  size = {this.props.size}  loading={this.props.loading} icon={this.props.icon}
            disabled={this.props.disabled}
            >{this.props.children} </Button>
        }else{
            return <span></span>
        }
    }
}

// const CommonButton = props => {

// }
export default CommonButton