import React, { Component } from 'react';
import { Row } from 'antd';
import Header from './components/Header';
import './style/common.less';

class Common extends Component{
  render () {
    return (
      <div className="common-page">
        <Row className="simple-page">
          <Header menuType="second"/>
        </Row>
        <Row className="content">
          { this.props.children }
        </Row>
      </div>
    )
  }
}

export default Common;
