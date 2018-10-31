import React, { Component } from 'react';
import axios from '../../axios';
import BaseForm from '../../components/BaseForm';
import { 
  Card,
  Button,
  Table,
  Modal
} from 'antd';
import './index.less';

const columns = [
  {
    title: '订单编号',
    dataIndex: 'order_sn',
    align: 'center',
    width: 100
  },
  {
    title: '车辆编号',
    dataIndex: 'bike_sn',
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
    align: 'center'
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    align: 'center'
  },
  {
    title: '里程',
    dataIndex: 'distance',
    align: 'center',
    render (distance) {
      return `${distance / 1000}km`
    }
  },
  {
    title: '行驶时常',
    dataIndex: 'total_time',
    align: 'center',
    render (time) {
      return `${parseInt(time/(3600))}小时`
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    render (status) {
      return status === 1 ? '进行中' : '已结束'
    }
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    width: 110,
    align: 'center'
  },
  {
    title: '结束时间',
    dataIndex: 'end_time',
    width: 110,
    align: 'center'
  },
  {
    title: '订单金额',
    dataIndex: 'total_fee',
    align: 'center',
    width: 90,
    render (fee) {
      return `${fee.toFixed(2)}元`
    }
  },
  {
    title: '实付金额',
    dataIndex: 'user_pay',
    align: 'center',
    width: 90,
    render (pay) {
      return `${pay.toFixed(2)}元`
    }
  }
];

class Order extends Component {
  constructor (props) {
    super(props);

    this.state = {
      list: [],
      pagination: true,
      selectedRowKeys: [],
      selectedItem: null,
      loading: false
    }
  }

  getState () {
    return this.state 
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'SELECT',
      label: '所在城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '0',
      width: 100,
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
          name: '天津'
        }
      ]
    },
    {
      type: '时间查询',
      field: 'time'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'status',
      placeholder: '全部',
      initialValue: '0',
      width: 100,
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
          name: '结束行程'
        },
        {
          id: '3',
          name: '临时停车'
        }
      ]
    }
  ]

  request = () => {
    let that = this;

    axios.requestList(that, '/order/list', this.params)
  }

  componentDidMount() {
    this.request();
  }

  handleRowClick = (record) => {
    this.setState({
      selectedRowKeys: [record.key],
      selectedItem: record
    })
  }

  openOrderDetail = () => {
    let { selectedItem } = this.getState();

    if (!selectedItem) {
      Modal.error({
        title: '信息',
        content: '请选择一条信息'
      })
    } else {
      window.open(`/#/common/order/detail/${selectedItem.key}`, '_blank')
    }
  }

  handleSubmit = (params) => {
    this.params = Object.assign(this.params, params)
    this.request()
  }

  render () {
    const { list, pagination, selectedRowKeys, loading } = this.getState();

    return (
      <div className="order-content">
        <Card className="card-item">
          <BaseForm handleSubmit={this.handleSubmit} formList={this.formList}/>
        </Card>

        <Card className="card-item">
          <Button onClick={this.openOrderDetail} className="button-item" type="primary">订单详情</Button>
          <Button className="button-item" type="primary">结束订单</Button>
        </Card>

        <div className="content-wrap">
          <Table 
            bordered
            loading={loading}
            rowSelection={{
              columnWidth: 60,
              columnTitle: '选择',
              type: 'radio',
              selectedRowKeys: selectedRowKeys
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.handleRowClick(record)
                }
              }
            }}
            columns={columns}
            dataSource={list}
            pagination={pagination}
          />
        </div>
      </div>
    )
  }
}

export default Order;