import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Switch } from 'antd'

@connect(store => ({userPerms:store.login.userPerms}))
class CommonSwitch extends React.Component{
    render(){
      
        if(!this.props.perms || this.props.userPerms.includes(this.props.perms)){
            return <Switch checked={this.props.checked} 
            checkedChildren={'启'} unCheckedChildren={'关'}
            onChange={this.props.onChange}
            disabled={this.props.disabled}/>
        }else{
            return <span></span>
        }
    }
}

export default CommonSwitch