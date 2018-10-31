import React, { Component } from 'react';
import { Card, Button, Icon, Radio } from 'antd';

import './index.less';

const ButtonGroup = Button.Group;

const RadioGroup = Radio.Group;

class Buttons extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      size: "default"
    };

  }

  handleCloseLoading = () => {
    this.setState({
      loading: false
    });
  }

  handleOpenLoading = () => {
    this.setState({
      loading: true
    });
  }

  handleChange = (e) => {
    let { value } = e.target;

    this.setState({
      size: value
    });
  }

  getState = () => {
    return this.state
  }

  render () {
    let { loading, size } = this.getState();
    return (
      <div>
        <Card title="基础按钮" className="card-item">
          <Button type="primary">imooc</Button>
          <Button type="default">imooc</Button>
          <Button type="dashed">imooc</Button>
          <Button type="danger">imooc</Button>
          <Button disabled>imooc</Button>
        </Card>

        <Card title="图形按钮" className="card-item">
          <Button type="default" icon="plus">新增</Button>
          <Button type="default" icon="edit">编辑</Button>
          <Button type="default" icon="delete">删除</Button>
          <Button type="default" shape="circle" icon="search"/>
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="download">下载</Button>
        </Card>

        <Card title="Loading按钮" className="card-item">
          <Button type="primary" loading={loading}>Loading</Button>
          <Button type="primary" loading={loading} shape="circle"></Button>
          <Button type="default" shape="circle" loading={loading}></Button>
          <Button onClick={this.handleCloseLoading} type="primary">加载Loading</Button>
          <Button onClick={this.handleCloseLoading} type="primary" icon="poweroff">关闭Loading</Button>
        </Card>

        <Card title="按钮组" className="card-item-group">
          <ButtonGroup className="button-group">
            <Button type="primary">
              <Icon type="left" />
              返回
            </Button>
            <Button type="primary">
              前进
              <Icon type="right" />
            </Button>
          </ButtonGroup>
          <ButtonGroup className="button-group">
            <Button type="primary" icon="cloud" />
            <Button type="primary" icon="cloud-download" />
          </ButtonGroup>
        </Card>

        <Card title="按钮尺寸" className="card-item">
          <RadioGroup 
              name="radiogroup" 
              defaultValue={"default"} 
              onChange={this.handleChange} 
              value={size}
            >
            <Radio value="large">大</Radio>
            <Radio value="default">中</Radio>
            <Radio value="small">小</Radio>
          </RadioGroup>

          <Button size={size} type="primary">imooc</Button>
          <Button size={size} type="default">imooc</Button>
          <Button size={size} type="dashed">imooc</Button>
          <Button size={size} type="danger">imooc</Button>
        </Card>
      </div>
    )
  }
};

export default Buttons;
