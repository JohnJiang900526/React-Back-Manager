import React, { Component } from 'react';
import { Card, message, Button } from 'antd';

import './index.less';

class Message extends Component {
  openMessage = (type) => {
    message[type]('恭喜你，React课程晋级成功', 2)
  }

  render() {
    return (
      <div className="message">
        <Card title="全局提示框" className="card-item">
          <Button 
            className="button-item"
            type="primary"
            onClick={() => { this.openMessage('success') }}>
            success
          </Button>

          <Button 
            className="button-item"
            type="primary"
            onClick={() => { this.openMessage('error') }}>
            error
          </Button>

          <Button 
            className="button-item"
            type="primary"
            onClick={() => { this.openMessage('info') }}>
            info
          </Button>

          <Button 
            className="button-item"
            type="primary"
            onClick={() => { this.openMessage('warning') }}>
            warning
          </Button>

          <Button 
            className="button-item"
            type="primary"
            onClick={() => { this.openMessage('warn') }}>
            warn
          </Button>

          <Button 
            className="button-item"
            type="primary"
            onClick={() => { this.openMessage('loading') }}>
            loading
          </Button>
        </Card>
      </div>
    )
  }
}

export default Message;
