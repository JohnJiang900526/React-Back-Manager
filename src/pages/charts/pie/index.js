import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts'
import { Card } from 'antd';
import './index.less';

import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import ReactEcharts from 'echarts-for-react';
import themeLight from '../themeLight'

class Bar extends Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', themeLight)
  }

  getOption = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      tooltip: {
        trigger : 'item',
        formatter : "{a} <br/>{b} : {c} ({d}%)"
      },
      legend : {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      series: [
        {
          name : '订单量',
          type : 'pie',
          radius : '75%',
          center : [
            '50%', '60%'
          ],
          data:[
            { value:1000, name:'周一'},
            { value: 1000, name: '周二' },
            { value: 2000, name: '周三' },
            { value: 1500, name: '周四' },
            { value: 3000, name: '周五' },
            { value: 2000, name: '周六' },
            { value: 1200, name: '周日' },
          ],
          itemStyle : {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  getOption1 = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      tooltip: {
        trigger : 'item',
        formatter : "{a} <br/>{b} : {c} ({d}%)"
      },
      legend : {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      series: [
        {
          name : '订单量',
          type : 'pie',
          radius: ['50%', '80%'],
          center : [
            '50%', '50%'
          ],
          data:[
            { value:1000, name:'周一'},
            { value: 1000, name: '周二' },
            { value: 2000, name: '周三' },
            { value: 1500, name: '周四' },
            { value: 3000, name: '周五' },
            { value: 2000, name: '周六' },
            { value: 1200, name: '周日' },
          ],
          itemStyle : {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  getOption2 = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      tooltip: {
        trigger : 'item',
        formatter : "{a} <br/>{b} : {c} ({d}%)"
      },
      legend : {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      series: [
        {
          name : '订单量',
          type : 'pie',
          radius: '70%',
          center : [
            '50%', '50%'
          ],
          data:[
            { value:1000, name:'周一'},
            { value: 1000, name: '周二' },
            { value: 2000, name: '周三' },
            { value: 1500, name: '周四' },
            { value: 3000, name: '周五' },
            { value: 2000, name: '周六' },
            { value: 1200, name: '周日' },
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    }
  }

  render () {
    return (
      <div className="bar-block">
        <Card className="card-item" title="饼图表一">
          <ReactEcharts 
            option={this.getOption()} 
            theme="Imooc" 
            notMerge={true} 
            lazyUpdate={true} 
            style={{ height: 500 }}
          />
        </Card>

        <Card className="card-item" title="饼图表二">
          <ReactEcharts 
            option={this.getOption1()} 
            theme="Imooc" 
            notMerge={true} 
            lazyUpdate={true} 
            style={{ height: 500 }}
          />
        </Card>

        <Card className="card-item" title="饼图表三">
          <ReactEcharts 
            option={this.getOption2()} 
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
