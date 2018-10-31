import React, { Component } from 'react';
import { Card, Row } from 'antd';
import axios from '../../axios';

import './detail.less';

const imageSizeWidth = 30;
const imageSizeHeight = 36;

class Detail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      listItem: {}
    }
  }

  getState() {
    return this.state;
  }

  request () {
    let { params } = this.props.match

    axios.ajax({
      url: '/order/detail',
      data: {
        params: {
          orderId: params.orderId
        }
      }
    }).then((res) => {
      this.setState({
        listItem: res.result
      })

      this.renderMap(res.result)
    })
  }

  // 初始化百度地图
  renderMap (result) {
    // 百度地图API功能
    // 创建Map实例
    this.map = new window.BMap.Map("orderDetailData");

    this.addMapControl(result.position_list);
    // 设置地图显示的城市 此项是必须设置的
    this.map.setCurrentCity("北京");
    //开启鼠标滚轮缩放
    this.map.enableScrollWheelZoom(true);
    // 绘制服务区域
    this.drawServiceArea(result.area);
  }

  // 添加控件
  addMapControl = (position_list) => {
    let map = this.map;

    map.addControl(new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_TOP_LEFT
    }))
    map.addControl(new window.BMap.NavigationControl())
    //添加地图类型控件
    map.addControl(new window.BMap.MapTypeControl({
      mapTypes:[window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP]
    }));

    //绘制用户行驶路线
    this.drawBikeRoute(position_list)
  }

  // 绘制用户行驶路线
  drawBikeRoute = (positionList) => {
    let map = this.map;
    let startPoint = ''
    let endPoint = ''

    if (positionList.length > 0) {
      let start = positionList[0]
      let end = positionList[positionList.length - 1]

      startPoint = new window.BMap.Point(start.lon, start.lat)
      endPoint = new window.BMap.Point(end.lon, end.lat)

      let startIcon = new window.BMap.Icon(
        '/assets/start_point.png', 
        new window.BMap.Size(imageSizeWidth, imageSizeHeight), {
        imageSize: new window.BMap.Size(imageSizeWidth, imageSizeHeight),
        anchor: new window.BMap.Size(imageSizeWidth, imageSizeHeight)
      })
      let startMarker = new window.BMap.Marker(startPoint, {
        icon: startIcon
      })

      let endIcon = new window.BMap.Icon(
        '/assets/end_point.png', 
        new window.BMap.Size(imageSizeWidth, imageSizeHeight), {
        imageSize: new window.BMap.Size(imageSizeWidth, imageSizeHeight),
        anchor: new window.BMap.Size(imageSizeWidth, imageSizeHeight)
      })

      let endMarker = new window.BMap.Marker(endPoint, {
        icon: endIcon
      })

      map.addOverlay(startMarker);
      map.addOverlay(endMarker);

      // 链接路线图
      let trackPoints = [];
      positionList.forEach((point) => {
        trackPoints.push(new window.BMap.Point(point.lon, point.lat));
      });

      let polyline = new window.BMap.Polyline(trackPoints, {
        strokeColor:"#1869ad", 
        strokeWeight:3,
        strokeOpacity: 1
      })

      map.addOverlay(polyline);
      map.centerAndZoom(endPoint, 11);
    } else {
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);
    }
  }

  // 绘制服务区
  drawServiceArea = (area) => {
    let trackPoints = [];
    area.forEach((point) => {
      trackPoints.push(new window.BMap.Point(point.lon, point.lat));
    });

    let polygon = new window.BMap.Polygon(trackPoints, {
      strokeColor: '#CE0000',
      strokeWeight: 3,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity:0.2
    });

    this.map.addOverlay(polygon);
  }

  componentDidMount () {
    this.request()
  }

  render () {
    let { listItem } = this.getState();
    return (
      <Row style={{padding: '10px 20px'}}>
        <Card className="card-item" title="地图轨迹">
          <div id="orderDetailData" style={{height: 500}}></div>
        </Card>
        <Card className="card-item" title="订单详情">
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式：</div>
                <div className="detail-form-right">
                  {
                    listItem.mode === 1 ? '服务区' : '停车点'
                  }
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号：</div>
                <div className="detail-form-right">{listItem.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号：</div>
                <div className="detail-form-right">{listItem.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名：</div>
                <div className="detail-form-right">{listItem.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码：</div>
                <div className="detail-form-right">{listItem.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点：</div>
                <div className="detail-form-right">{listItem.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点：</div>
                <div className="detail-form-right">{listItem.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程：</div>
                <div className="detail-form-right">
                  {
                    listItem.distance ? `${listItem.distance/1000}km` : '0km'
                  }
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </Row>
    )
  }
}

export default Detail;
