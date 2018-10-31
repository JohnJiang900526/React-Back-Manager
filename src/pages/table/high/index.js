import React, { Component } from 'react';
import { Card, Table, Badge, Modal, message } from 'antd';
import Utils from '../../../utils';
import axios from '../../../axios/index.js';

import './index.less';

import { 
  config,
  columnsData, 
  columnsDataBoth,
  columnsDataSort
} from './columnsData.js';

const columnsDataActive = [
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    width: 60
  },
  {
    title: '用户名',
    key: 'userName',
    dataIndex: 'userName',
    align: 'center',
    width: 80
  },
  {
    title: '性别',
    key: 'sex',
    dataIndex: 'sex',
    render (sex) {
      return sex === 1 ? "男" : '女'
    },
    align: 'center',
    width: 80
  },
  {
    title: '年龄',
    key: 'age',
    dataIndex: 'age',
    align: 'center',
    width: 80
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    render (state) {
      return config.state[state]
    },
    align: 'center',
    width: 100
  },
  {
    title: '爱好',
    key: 'interest',
    dataIndex: 'interest',
    render (interest) {
      switch (interest) {
        case 1:
          return <Badge status="default" text={config.interest[interest]}/>
        case 2:
          return <Badge status="error" text={config.interest[interest]}/>
        case 3:
          return <Badge status="processing" text={config.interest[interest]}/>
        case 4:
          return <Badge status="success" text={config.interest[interest]}/>
        case 5:
          return <Badge status="warning" text={config.interest[interest]}/>
        default: 
          return <Badge status="default" text={config.interest[interest]}/>
      }
    },
    align: 'left',
    width: 100
  },
  {
    title: '生日',
    key: 'birthday',
    dataIndex: 'birthday',
    align: 'center',
    width: 120
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
    align: 'center'
  },
  {
    title: '操作',
    key: 'active',
    align: 'center',
    width: 120
  }
];

class TableBasic extends Component {
  constructor (props) {
    super(props);

    this.state = {
      columns: [],
      dataSource: [],
      pagination: true
    }
  }

  getState = () => {
    return this.state
  }

  params = {
    page: 1
  }

  request = () => {
    const that = this;

    axios.ajax({
      url: "/table/high/list",
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      this.setState({
        dataSource: [...res.result.list],
        pagination: Utils.pagination(res, (current) => {
          that.params.page = current
          
          that.request();
        })
      })
    })
  }

  handleDelete = (e, item) => {
    e.preventDefault();
    const that = this;

    Modal.confirm({
      title: '确认',
      content: '你确认删除此条数据吗?',
      onOk() {
        message.success('数据删除成功');

        that.request();
      }
    })
  }

  componentDidMount () {
    columnsDataActive[8].render = (text, item) => {
      return <span className="action-btn" onClick={(e) => {this.handleDelete(e, item)}}>删除</span>
    }

    this.setState({
      columns: columnsData,
      dataSource: []
    })

    this.request()
  }

  onChange = (sorter) => {
    console.log(sorter)
  }

  render () {
    const { 
      columns, 
      dataSource
    } = this.getState();

    return (
      <div className="table-high">
        <Card title="表头固定" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={dataSource}
            scroll={{y: 300 }}
          />
        </Card>

        <Card title="双向固定" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columnsDataBoth}
            dataSource={dataSource}
            scroll={{x: 1360, y: 300 }}
          />
        </Card>

        <Card title="表格排序" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columnsDataSort}
            dataSource={dataSource}
            onChange={(pagination, filters, sorter) => { this.onChange(sorter) }}
            scroll={{ y: 300 }}
          />
        </Card>

        <Card title="操作按钮" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columnsDataActive}
            dataSource={dataSource}
            scroll={{ y: 300 }}
          />
        </Card>
      </div>
    )
  }
};

export default TableBasic;
