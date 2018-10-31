import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import NavLeft from './components/NavLeft';
import Footer from './components/Footer';

import './style/common.less';

class Admin extends Component {
  render () {
    return (
      <Row className="container">
        <Col className="nav-left" span={4}>
          <NavLeft></NavLeft>
        </Col>
        <Col className="main" span={20}>
          <Header></Header>
            <Row className="content">
              { this.props.children }
            </Row>
         <Footer></Footer>
        </Col>
      </Row>
    )
  }
};

export default Admin;