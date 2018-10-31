import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts'
import { Card } from 'antd';
import './index.less';

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme';

class Bar extends Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme)
  }

  getOption = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip : {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
          type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [2000, 1800, 1500, 3200, 800, 400, 200]
        }
      ]
    }
  }

  getOption1 = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend:{
        data:['OFO','摩拜','小蓝']
      },
      xAxis: {
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
        }
      ]
    }
  }

  render () {
    return (
      <div className="bar-block">
        <Card className="card-item" title="柱形图表一">
          <ReactEcharts 
            option={this.getOption()} 
            theme="Imooc" 
            notMerge={true} 
            lazyUpdate={true} 
            style={{ height: 500 }}
          />
        </Card>
        <Card className="card-item" title="柱形图表二">
          <ReactEcharts 
            option={this.getOption1()} 
            theme="Imooc" 
            notMerge={true} 
            lazyUpdate={true} 
            style={{ height: 500 }}
          />
        </Card>
      </div>
    )
  }
}

export default Bar;
