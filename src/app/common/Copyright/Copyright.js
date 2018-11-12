import React from 'react'
import {Link} from 'react-router'

import { Layout} from 'antd'


export default class Copyright extends React.Component {

  render() {
	const {Footer} = Layout;
    return (
    	
       <Footer style={{ textAlign: 'center',backgroundColor:'#E5E5E5' ,fontSize:'14px'}}>
        版权所有 © 联奕科技有限公司 Copyright © 2017. All rights reserved.
      </Footer>
    );
  }
}


