import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';

import'./index.less';

class Modals extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
      loading: false
    }
  }

  handleOk = (type, loading) => {
    if (loading) {
      this.setState({
        [loading]: true
      })

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.setState({
          [type]: false,
          [loading]: false
        })
      }, 1000);
    } else {
      this.setState({
        [type]: false
      })
    }
  }

  handleCancel = (type) => {
    this.setState({
      [type]: false
    })
  }

  handleOpenModal = (type) => {
    this.setState({
      [type]: true
    })
  }

  handleConfirm = (message) => {
    Modal[message]({
      title: 'React message',
      content: '欢迎学习慕课新推出的React高级课程',
      okText: '确定',
      cancelText: '取消'
    });
  }

  getState = () => {
    return this.state
  }

  render () {
    let { 
      showModal1, 
      showModal2, 
      showModal3, 
      showModal4, 
      loading
    } = this.getState();

    return (
      <div className="modals">
        <Card title="基础模态框" className="modal-item">
          <Button onClick={() => { this.handleOpenModal('showModal1') }} type="primary">open</Button>
          <Button onClick={() => { this.handleOpenModal('showModal2') }} type="primary">自定义页脚</Button>
          <Button onClick={() => { this.handleOpenModal('showModal3') }} type="primary">顶部20px弹框</Button>
          <Button onClick={() => { this.handleOpenModal('showModal4') }} type="primary">水平垂直居中</Button>
        </Card>
        <div className="Modal-map">
          <Modal
              title="React Open"
              visible={showModal1}
              onOk={() => { this.handleOk('showModal1') }}
              onCancel={() => { this.handleCancel('showModal1') }}
            >
              <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>

          <Modal
              title="React 自定义页脚"
              visible={showModal2}
              onOk={() => { this.handleOk('showModal2') }}
              onCancel={() => { this.handleCancel('showModal2') }}
              footer={[
                <Button 
                    key="back" 
                    onClick={() => { this.handleCancel('showModal2') }}
                  >
                  算了！
                </Button>,
                <Button 
                  key="submit" 
                  type="primary" 
                  loading={loading} 
                  onClick={() => { this.handleOk('showModal2', 'loading') }}>
                  好的！
                </Button>
              ]}
            >
              <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>

          <Modal
              title="React 顶部20px"
              style={{ top: 20 }}
              visible={showModal3}
              onOk={() => { this.handleOk('showModal3') }}
              onCancel={() => { this.handleCancel('showModal3') }}
            >
              <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>

          <Modal
              title="React 垂直水平居中"
              centered
              visible={showModal4}
              onOk={() => { this.handleOk('showModal4') }}
              onCancel={() => { this.handleCancel('showModal4') }}
            >
              <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>
        </div>
        
        <Card title="信息确认框" className="modal-item">
          <Button onClick={() => {this.handleConfirm('confirm')}} type="primary">confirm</Button>
          <Button onClick={() => {this.handleConfirm('info')}} type="primary">Info</Button>
          <Button onClick={() => {this.handleConfirm('success')}} type="primary">success</Button>
          <Button onClick={() => {this.handleConfirm('error')}} type="primary">Error</Button>
          <Button onClick={() => {this.handleConfirm('warning')}} type="primary">Warning</Button>
        </Card>
      </div>
    )
  }
};

export default Modals;
