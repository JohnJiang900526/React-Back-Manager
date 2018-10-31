import React, { Component } from 'react';
import { Card, Tabs , message, Icon } from 'antd';

import './index.less';

const TabPane = Tabs.TabPane;

class Tab extends Component {
  constructor(props) {
    super(props);

    this.newTabIndex  = 0

    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false }
    ]

    this.state = {
      activeKey: panes[0].key,
      panes
    }
  }
  // 八位小数数字处理
  formatNumber = (str, n) => {
    if (str === null || str === undefined) {
      str = ''
    }
    
    let arr = str.split('') // 字符串拆分数组
    let reArr = [] // 预留数组， 用来返回最终数据
    let i = 0

    // 空值处理
    if (n === null || n === undefined) {
      n = 4
    }

    // 主体部分 处理数据
    while (i < n){
      reArr[i] = (arr[i] === null || arr[i] === undefined) ? '0' : arr[i]
      i++
    }

    // 四舍五入处理
    if (arr.length > n && arr[n] > 4) {
      reArr[reArr.length - 1] = parseInt(reArr[reArr.length - 1]) + 1
    }

    return reArr.join('')
  }


  ActiveChange = (key) => {
    message.info(
    `Hi, 你切换了页签${key}`, 2.5
    );
  }

  onChange = (key) => {
    this.setState({
      activeKey: key
    });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const { panes } = this.state
    const activeKey = `newTab${this.newTabIndex++}`

    panes.push({
      title: `New Tab${this.newTabIndex}`, 
      content: `Content of new Tab${this.newTabIndex}`, 
      key: activeKey
    })

    this.setState({
      activeKey,
      panes
    });
  }

  remove = (targetKey) => {
    let { activeKey, panes } = this.state;
    let lastIndex;

    panes.forEach((pane, index) => {
      if (pane.key === targetKey) {
        lastIndex = index - 1
      }
    })

    panes = panes.filter(pane => pane.key !== targetKey)

    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    } else if (lastIndex === -1) {
      activeKey = panes[lastIndex + 1].key;
    }

    this.setState({
      activeKey,
      panes
    })
  }

  render () {
    let { activeKey, panes } = this.state

    return (
      <div className="tab">
        <Card className="card-item" title="Tab页签">
          <Tabs 
            onChange={this.ActiveChange}
            defaultActiveKey="1">
            <TabPane key="1" tab="Tab1">
              欢迎学习React课程
            </TabPane>
            <TabPane key="2" disabled tab="Tab2">
              禁用测试
            </TabPane>
            <TabPane key="3" tab="Tab3">
              React是一门非常受欢迎的MV*框架
            </TabPane>
          </Tabs>
        </Card>

        <Card className="card-item" title="Tab带图标的页签">
          <Tabs 
            onChange={this.ActiveChange}
            defaultActiveKey="1">
            <TabPane key="1" tab={<span><Icon type="plus"></Icon>Tab1</span>}>
              创建属于你的React项目
            </TabPane>
            <TabPane key="2" tab={<span><Icon type="edit"></Icon>Tab2</span>}>
              尝试如何使用React进行修改
            </TabPane>
            <TabPane key="3" tab={<span><Icon type="delete"></Icon>Tab1</span>}>
              删除它，就这么简单
            </TabPane>
          </Tabs>
        </Card>

        <Card className="card-item" title="Tab可关闭的卡片式页签">
          <Tabs
            type="editable-card"
            onChange={this.onChange}
            onEdit={this.onEdit}
            activeKey={activeKey}>
            {
              panes.map((pane) => {
                return(
                  <TabPane 
                    closable={pane.closable} 
                    tab={pane.title} 
                    key={pane.key}>
                    {pane.content}
                  </TabPane>
                )
              })
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default Tab;
