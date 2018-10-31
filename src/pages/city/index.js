import React, { Component } from 'react';
import { 
  Table, 
  Card,
  Form,
  Select,
  Button,
  Modal,
  message,
  Radio
} from 'antd';
import Utils from '../../utils';
import axios from '../../axios';

import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const columns = [
  {
    title: '城市ID',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '城市名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '用车模式',
    dataIndex: 'mode',
    align: 'center',
    render (mode) {
      return mode === 1 ? '停车点' : '禁停区'
    }
  },
  {
    title: '运营模式',
    dataIndex: 'op_mode',
    align: 'center',
    render (op_mode) {
      return op_mode === 1 ? '自营' : '加盟'
    }
  },
  {
    title: '授权加盟商',
    dataIndex: 'franchisee_name',
    align: 'center'
  },
  {
    title: '城市管理员',
    dataIndex: 'city_admins',
    render (admins) {
      return admins.join(' ,')
    }
  },
  {
    title: '城市开通时间',
    dataIndex: 'open_time',
    align: 'center'
  },
  {
    title: '操作日期',
    dataIndex: 'update_time',
    align: 'center'
  },
  {
    title: '操作人',
    dataIndex: 'sys_user_name',
    align: 'center'
  }
];

class City extends Component {
  constructor (props) {
    super(props);

    this.state = {
      list: [],
      isShowOpenCity: false,
      pagination: true
    }
  }

  getState = () => {
    return this.state;
  }

  params = {
    page: 1
  }

  request = () => {
    const that = this;
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      this.setState({
        list: res.result.list,
        pagination: Utils.pagination(res, (current) => {
          that.params.page = current;
          that.request()
        })
      })
    })
  }

  componentDidMount () {
    this.request();
  }

  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }

  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    
    axios.ajax({
      url: '/city/open',
      data: {
        params: {
          cityInfo: JSON.stringify(cityInfo)
        }
      }
    }).then((res) => {
      if (res.code === "0") {
        this.setState({
          isShowOpenCity: false
        })
        this.request();

        setTimeout(() => {
          message.success('开通成功')
        }, 500)
      } else {
        message.error('开通失败，请重新尝试')
      }
    })
  }

  render () {
    let { list, pagination, isShowOpenCity } = this.getState();

    return (
      <div className="city-block">
        <Card ref="Card" className="card-item">
          <FilterForm/>
        </Card>
        <Card className="card-item">
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="table-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={list}
            pagination={pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}
          >
            <OpenCityForm wrappedComponentRef={(cityForm) => {this.cityForm = cityForm}}/>
          </Modal>
      </div>
    )
  }
}

export default City;

// 过滤表单组件
class FilterForm extends Component{
  handleReset = () => {
    const { resetFields } = this.props.form;

    resetFields();
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="所在城市">
          {
            getFieldDecorator('city_id')(
              <Select style={{width: 120}} placeholder="全部">
                <Option value="0">全部</Option>
                <Option value="1">上海</Option>
                <Option value="2">北京</Option>
                <Option value="3">大连</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式">
          {
            getFieldDecorator('mode')(
              <Select style={{width: 120}} placeholder="全部">
                <Option value="0">全部</Option>
                <Option value="1">停车点</Option>
                <Option value="2">禁停区</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="运营模式">
          {
            getFieldDecorator('op_mode')(
              <Select style={{width: 120}} placeholder="全部">
                <Option value="0">全部</Option>
                <Option value="1">加盟</Option>
                <Option value="2">自营</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="授权状态">
          {
            getFieldDecorator('auth_status')(
              <Select style={{width: 120}} placeholder="全部">
                <Option value="0">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary">查询</Button>
          <Button onClick={this.handleReset} type="default">重置</Button>
        </FormItem>
      </Form>
    )
  }
}
FilterForm = Form.create()(FilterForm);

// 模态框弹出组件
class OpenCityForm extends Component{
  constructor (props) {
    super(props);

    this.state = {

    }
  }

  getState = () => {
    return this.state
  }

  render () {
    const formItemLayout = {
        labelCol:{
            span:5
        },
        wrapperCol:{
            span:19
        }
    }

    const { getFieldDecorator } = this.props.form
    return(
      <Form layout="horizontal">
        <FormItem label="城市选择" {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select style={{width: 200}}>
                <Option value="0">暂无</Option>
                <Option value="1">上海</Option>
                <Option value="2">北京</Option>
                <Option value="3">大连</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label="运营模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1'
            })(
              <RadioGroup>
                <Radio value="1">自营</Radio>
                <Radio value="2">加盟</Radio>
              </RadioGroup>
            )
          }
        </FormItem>

        <FormItem label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('mode', {
              initialValue: '1'
            })(
              <RadioGroup>
                <Radio value="1">停车点停车模式</Radio>
                <Radio value="2">禁停区停车模式</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

OpenCityForm = Form.create()(OpenCityForm);