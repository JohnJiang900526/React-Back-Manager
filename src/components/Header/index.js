import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import { connect } from 'react-redux'
import { Row, Col, Modal } from 'antd';
import Utils from '../../utils';
import axios from '../../axios';

import './index.less';

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      userName: '',
      weather: {},
      SysTime: {},
      redirect: false
    }
  }

  getState = () => {
    return Object.assign({}, this.state);
  }

  componentWillMount () {
    const { menuType } = this.props;

    this.setState({
      userName: 'John'
    });

    if (menuType === 'second') {

    } else {
      this.Interval =  setInterval(() => { 
        const SysTime = Utils.formateDate(new Date().getTime());
        this.setState({
          SysTime: Object.assign({}, SysTime)
        });
      },1000)
  
      this.getWeatherAPIData();
    }
  }

  componentWillUnmount () {
    clearInterval(this.Interval);
  }

  getWeatherAPIData = () => {
    let city = '上海';
    axios.jsonp({
      url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res) => {
      if (res.status === 'success') {
        let weather = Object.assign({}, res.results[0].weather_data[0]);
        this.setState({
          weather
        });
      }
    }).catch((e) => {
      console.log(e);
    })
  }

  getWeatherPic = () => {
    let state = this.getState();
    let { Hour } = state.SysTime;

    if (!Hour) {
      Hour = null;
    } else {
      Hour = parseInt(Hour);
    }

    if ( Hour > 6 && Hour < 18) {
      return (
        <img src={ state.weather.dayPictureUrl } alt=""/>
      );
    } else if (Hour > 18 || Hour < 6) {
      return (
        <img src={ state.weather.nightPictureUrl } alt=""/>
      );
    }
  }

  handleLoginOut = () => {
    Modal.confirm({
      title: '警告!',
      content: '你确定退出?',
      onOk: () => {
        this.setState({
          redirect: true
        });
      }
    });
  }

  render () {
    const { changeMenu, menuType } = this.props;
    const change_menu = localStorage.getItem('change_menu');
    let state = this.getState();

    if (state.redirect) {
      return(
        <Redirect push to="/login"/>
      );
    } else {
      return (
        <div className="header-content">
          <Row className="header-top">
            {
              menuType ? 
              <Col span={6} style={{textAlign: 'left'}}>
                <img style={{marginBottom: 10, height: 55, display: 'inline-block', outline: "none"}} src="/assets/logo-ant.svg" alt=""/>
                <span style={{fontSize: 20,paddingLeft:'10px'}}>IMOOC通用管理系统</span>
              </Col>
              : null
            }
            <Col span={menuType ? 18 : 24}>
              <span>欢迎，{state.userName}</span>
              <span onClick={this.handleLoginOut} style={{color: '#21B3FF', paddingLeft: '10px', cursor: "pointer"}}>退出</span>
            </Col>
          </Row>
          <Row className="breadcrumd">
            {
              menuType !== 'second' ? 
              <Col span={4} className="breadcrumd-title">{changeMenu || change_menu || '首页'}</Col>
              :
              null
            }
            <Col span={20} className="weather">
              <span className="date">{state.SysTime.Date}</span>
              <span className="weather-detail">
                { this.getWeatherPic() }
                <span>{state.weather.wind}</span>
              </span>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    changeMenu: state.changeMenu
  };
};

export default connect(mapState, null)(Header);
