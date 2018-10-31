import React, { Component } from 'react';
import { Card, Carousel  } from 'antd';

import './index.less';

class Carousels extends Component {
  render() {
    return (
      <div className="carousel">
        <Card title="文字背景轮播" className="card-item font">
          <Carousel autoplay={true}>
            <div>
              <h3> Ant Motion Banner - Vue </h3>
            </div>
            <div>
              <h3> Ant Motion Banner - React </h3>
            </div>
            <div>
              <h3> Ant Motion Banner - Angular </h3>
            </div>
          </Carousel>
        </Card>

        <Card title="图片轮播" className="card-item img">
          <Carousel autoplay={true} vertical={true}>
            <div>
              <img className="img-item" alt="" src={`/carousel-img/carousel-1.jpg`}/>
            </div>
            <div>
              <img className="img-item" alt="" src={`/carousel-img/carousel-2.jpg`}/>
            </div>
            <div>
              <img className="img-item" alt="" src={`/carousel-img/carousel-3.jpg`}/>
            </div>
          </Carousel>
        </Card>
      </div>
    )
  }
}

export default Carousels;
