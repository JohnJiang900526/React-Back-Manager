import React, { Component } from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import BaseForm from '../../components/BaseForm';
import './index.less';

const WIDTH = 36;
const HEIGHT = 42;
class BikeMap extends Component{
  constructor (props) {
    super(props);

    this.state = {
      total_count: 0
    }
  }

  params = {
    page: 1
  }

  getState () {
    return this.state;
  }

  formList = [
    {
      label: '城市选择',
      type: 'SELECT',
      field: 'city',
      placeholder: '所在城市',
      width: 100,
      initialValue: '0',
      list: [
        {
          id: '0',
          name: '全部'
        },
        {
          id: '1',
          name: '北京'
        },
        {
          id: '2',
          name: '上海'
        },
        {
          id: '3',
          name: '深圳'
        }
      ]
    },
    {
      type: '时间查询'
    },
    {
      label: '订单状态',
      type: 'SELECT',
      field: 'status',
      placeholder: '订单状态',
      width: 100,
      initialValue: '0',
      list: [
        {
          id: '0',
          name: '全部'
        },
        {
          id: '1',
          name: '进行中'
        },
        {
          id: '2',
          name: '行程结束'
        }
      ]
    }
  ]

  request = () => {
    axios.ajax({
      url: '/map/bike_map',
      data: {
        params: this.params
      }
    }).then((res) => {
      if (res.code === '0') {
        this.setState({
          total_count: res.result.total_count
        }, () => {
          this.renderMap(res.result);
        });
      }
    });
  }

  handleSubmit = (params) => {
    this.params = Object.assign({}, params)
    this.request();
  }

  renderMap (result) {
    this.map = new window.BMap.Map('mapContent');

    let list = result.route_list;
    let start = list[0].split(',');
    let end = list[list.length - 1].split(',');

    let startPoint = new window.BMap.Point(start[0], start[1]);
    let endPoint = new window.BMap.Point(end[0], end[1]);

    // 添加起始坐标 的图标
    this.addIconAndLine(startPoint, endPoint);
    // 绘制行程路线图
    this.drawRouteLine(result);
    // 绘制服务区范围
    this.drawServiceLine(result);
    // 添加地图中的自行车
    this.drawBikeLine(result);
    // 添加地图控件
    this.addMapControl();

    this.map.centerAndZoom(endPoint, 11);
    this.map.enableScrollWheelZoom(true);
  }

  // 添加地图控件
  addMapControl = () => {
    let top_right_control = new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    });

    let top_right_navigation = new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    });

    this.map.addControl(top_right_control);
    this.map.addControl(top_right_navigation);
    this.map.enableScrollWheelZoom(true);
  }

  // 添加地图中的自行车
  drawBikeLine = (result) => {
    let list = result.bike_list;
    let width = (2 * WIDTH)/3;
    let height = (2 * HEIGHT)/3;

    let bikeIcon = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(width, height), {
      imageSize: new window.BMap.Size(width, height),
      anchor: new window.BMap.Size(width/2, height)
    });

    list.forEach((item) => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      let marker = new window.BMap.Marker(point, {
        icon: bikeIcon
      });

      this.map.addOverlay(marker);
    });
  }

  // 绘制服务区范围路线
  drawServiceLine = (result) => {
    let list = result.service_list;
    let serviceList = [];

    list.forEach((item) => {
      let point = new window.BMap.Point(item.lon, item.lat);

      serviceList.push(point);
    });

    let polyServiceLine = new window.BMap.Polyline(serviceList, {
      strokeColor: "#ef4136",
      strokeWeight: 3,
      strokeOpacity: 1
    });

    this.map.addOverlay(polyServiceLine);
  }

  // 绘制行程路线图
  drawRouteLine = (result) => {
    let list = [...result.route_list];
    let routeList = [];

    list.forEach((item) => {
      let p = item.split(',');

      let point = new window.BMap.Point(p[0], p[1]);

      routeList.push(point);
    });

    let polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: "teal",
      strokeWeight: 3,
      strokeOpacity: 1
    });

    this.map.addOverlay(polyLine);
  }

  // 添加起始坐标 的图标
  addIconAndLine = (startPoint, endPoint) => {
    let startPointIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(WIDTH, HEIGHT), {
      imageSize: new window.BMap.Size(WIDTH, HEIGHT),
      anchor: new window.BMap.Size(WIDTH/2, HEIGHT)
    });
    let startMarker = new window.BMap.Marker(startPoint, {
      icon: startPointIcon
    });

    let endPointIcon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(WIDTH, HEIGHT), {
      imageSize: new window.BMap.Size(WIDTH, HEIGHT),
      anchor: new window.BMap.Size(WIDTH/2, HEIGHT)
    });

    let endMarker = new window.BMap.Marker(endPoint, {
      icon: endPointIcon
    });

    this.map.addOverlay(startMarker);
    this.map.addOverlay(endMarker);
  }

  componentDidMount () {
    this.request();
  }

  render () {
    const { total_count } = this.getState();
    return (
      <div className="bike-map">
        <Card className="card-item">
          <BaseForm handleSubmit={this.handleSubmit} formList={this.formList}/>
        </Card>
        <Card className="card-item" title={'有' + total_count + '辆车可用'}>
          <div id="mapContent" className="map-content" style={{ height: 500 }}></div>
        </Card>
      </div>
    )
  }
}

export default BikeMap;
