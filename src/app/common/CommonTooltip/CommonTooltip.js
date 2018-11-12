import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { Tooltip } from 'antd'


@connect(store => ({ userPerms: store.login.userPerms }))
class CommonTooltip extends React.Component {
    render() {
        if (!this.props.perms || this.props.userPerms.includes(this.props.perms)) {
            return <Tooltip
                title={this.props.title}
            >{this.props.children} </Tooltip>
        } else {
            return <span></span>
        }
    }
}
export default CommonTooltip