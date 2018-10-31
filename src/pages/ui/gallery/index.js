import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd';

import './index.less';

const { Meta } = Card

class Gallery extends Component {
  constructor (props) {
    super(props);

    const Imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ];

    this.state = {
      Imgs,
      visible: false,
      currentImg: ''
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  getState = () => {
    return this.state
  }

  openGallery = (item) => {
    this.setState({
      currentImg: item,
      visible: true
    })
  }

  imgList = () => {
    const { Imgs } = this.state

    return Imgs.map((list, index) => {
      let width = 5

      if (index === (Imgs.length - 1)) {
        width = 4
      } else {
        width = 5
      }

      return (
        <Col className="col-lists" key={index} md={width}>
          {
            list.map((item, itemIndex) => 
              <Card
                  className="card-item"
                  hoverable
                  key={item + itemIndex}
                  cover={<img onClick={() => {this.openGallery(item)}} alt="" src={`/gallery/${item}`} />}
                >

                <Meta 
                  title="React 学习" 
                  description="ant.design"/>
              </Card>
            )
          }
        </Col>
      )
    })
  }

  render () {
    const { visible, currentImg } = this.getState()

    return (
      <div className="gallery">
          <Row className="row-list" gutter={18}>
            {
              this.imgList()
            }
          </Row>

          <Modal
              wrapClassName="model-img"
              title={'图片画廊--' + currentImg}
              visible={visible}
              onCancel={this.handleCancel}
              width={300}
              footer={null}
            >
              <img style={{width: '100%'}} alt="" src={`/gallery/${currentImg}`}/>
          </Modal>
      </div>
    )
  }
}

export default Gallery;
