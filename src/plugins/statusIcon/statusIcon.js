import React from 'react';
import {  Icon} from 'antd';


export default class StatusIcon extends React.Component {


    StatusIcon = () => {
        let status = this.props.status;
        if (status) {
            if (status == 2) {
                return <Icon type="check-circle" style={{ fontSize: 20,  color: '#3cc391'}} />
            }
            if (status == 1) {
                return   <Icon type="close-circle" style={{ fontSize: 20,  color: '#ed4f4f' }} />
            }
        }
        return  <Icon type="minus-circle" style={{ fontSize: 20, color: '#03aaf4' }} />;

    }


    render() {

        return this.StatusIcon();
    }

}