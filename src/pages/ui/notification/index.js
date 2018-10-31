import React, { Component } from 'react';
import { Card, Button, notification } from 'antd';

import './index.less'

class Notification extends Component {
  openNotification = (type, placement) => {
    if (!type) {
      type = 'open'
    }
    if (!placement) {
      placement = 'topRight'
    }

    notification.config({
      placement,
      bottom: 50,
      top: 50,
      duration: 3
    })

    notification[type]({
      message: '发工资了',
      description: '上月考勤22天， 迟到12天，实发工资250，请笑纳'
    })
  }
  
  render () {
    return (
      <div className="notification">
        <Card title="通知提醒框" className="card-item">
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification() }}>
            Open
          </Button>
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification('success') }}>
            Success
          </Button>
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification('info') }}>
            Info
          </Button>
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification('warning') }}>
            Warning
          </Button>
          <Button
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification('error') }}>
            Error
          </Button>
        </Card>

        <Card title="通知提醒框-方向控制" className="card-item">
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification() }}>
            default
          </Button>
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification('success', 'topLeft') }}>
            Success-topLeft
          </Button>
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification('info', 'topRight') }}>
            Info-topRight
          </Button>
          <Button 
            className="button-item" 
            type="primary"
            onClick={() => { this.openNotification('warning', 'bottomLeft') }}>
            Warning-bottomLeft
          </Button>
          <Button
            className="button-item"
            type="primary"
            onClick={() => { this.openNotification('error', 'bottomRight') }}>
            Error-bottomRight
          </Button>
        </Card>
      </div>
    )
  }
}

export default Notification;
