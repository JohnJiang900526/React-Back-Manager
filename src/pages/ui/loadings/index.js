import React, { Component } from 'react'
import { Card, Spin, Icon, Alert } from 'antd';

import './index.less';

class Loadings extends Component {
  getIconIndi = () => {
    return (
      <Icon type="loading" style={{ fontSize: 24 }} spin />
    )
  }
  render () {
    return (
      <div className="loadings">
        <Card className="spin-card" title="Spin的用法">
          <Spin className="spin-loading" size="small"></Spin>
          <Spin className="spin-loading" size="default"></Spin>
          <Spin className="spin-loading" size="large"></Spin>

          <Spin className="spin-loading" size="default" indicator={this.getIconIndi()}></Spin>
          <Spin className="spin-loading" size="default" indicator={this.getIconIndi()}></Spin>
        </Card>

        <Card className="spin-card" title="内容遮罩">
          <Spin wrapperClassName="spin-mask" spinning={false}>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程！"
              type="info"
            />
          </Spin>

          <Spin wrapperClassName="spin-mask" spinning={true}>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程！"
              type="info"
            />
          </Spin>

          <Spin wrapperClassName="spin-mask" tip="加载中..." spinning={true}>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程！"
              type="info"
            />
          </Spin>
          
          <Spin wrapperClassName="spin-mask" spinning={true} indicator={this.getIconIndi()}>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程！"
              type="info"
            />
          </Spin>
          <Spin wrapperClassName="spin-mask" tip="加载中..." spinning={true} indicator={this.getIconIndi()}>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程！"
              type="info"
            />
          </Spin>
        </Card>
      </div>
    )
  }
};

export default Loadings;