import React, { Component } from 'react';
import { Card, Table } from 'antd';
import Utils from '../../../utils';
import axios from '../../../axios/index.js';

import './index.less';
const config = {
  state: {
    "1": '咸鱼一条',
    "2": '风华浪子',
    "3": '北大才子',
    "4": '百度FE',
    "5": '创业者'
  },
  interest: {
    '1': '篮球',
    "2": '桌球',
    "3": '足球',
    "4": "排球",
    "5": "乒乓球",
    "6": "徒步",
    "7": "骑行",
    "8": "格斗"
  }
}
const dataSourceData = [
  {
    id: "0",
    key: '0',
    userName: 'Jack',
    sex: 1,
    state: 1,
    interest: 1,
    birthday: '2000-01-01',
    address: '上海人民广场',
    time: '06:00'
  },
  {
    id: "1",
    key: 1,
    userName: 'Tom',
    sex: 1,
    state: 2,
    interest: 1,
    birthday: '2000-01-01',
    address: '上海人民广场',
    time: '06:00'
  },
  {
    id: "2",
    key: '2',
    userName: 'Lily',
    sex: 2,
    state: 3,
    interest: 1,
    birthday: '2000-01-01',
    address: '上海人民广场',
    time: '06:00'
  },
  {
    id: "3",
    key: '3',
    userName: 'LinTao',
    sex: 1,
    state: 4,
    interest: 1,
    birthday: '2000-01-01',
    address: '上海人民广场',
    time: '06:00'
  }
]
const columnsData = [
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '用户名',
    key: 'userName',
    dataIndex: 'userName',
    align: 'center'
  },
  {
    title: '性别',
    key: 'sex',
    dataIndex: 'sex',
    render (sex) {
      return sex === 1 ? "男" : '女'
    },
    align: 'center'
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    render (state) {
      return config.state[state]
    },
    align: 'center'
  },
  {
    title: '爱好',
    key: 'interest',
    dataIndex: 'interest',
    render (interest) {
      return config.interest[interest]
    },
    align: 'center'
  },
  {
    title: '生日',
    key: 'birthday',
    dataIndex: 'birthday',
    align: 'center'
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
    align: 'center'
  },
  {
    title: '早期时间',
    key: 'time',
    dataIndex: 'time',
    align: 'center'
  }
]

let rowSelection = {
  type: 'radio',
  columnTitle: '单项选择',
  columnWidth: '100px',
  selectedRowKeys: []
};

class TableBasic extends Component {
  constructor (props) {
    super(props);

    this.state = {
      columns: [],
      dataSource: [],
      dataSource2: [],
      // 单选框
      rowSelection,
      selectItem: null,
      // 复选框
      selectedRowKeys: [],
      // 分页
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
      url: "/table/list",
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      this.setState({
        dataSource2: [...res.result.list],
        pagination: Utils.pagination(res, (current) => {
          that.params.page = current
          
          that.request();
        })
      })
    })
  }

  componentDidMount () {
    this.setState({
      columns: columnsData,
      dataSource: dataSourceData
    })

    this.request()
  }
  onRowClick = (row) => {
    let { rowSelection, selectItem } = this.getState();
    
    if (rowSelection.selectedRowKeys.includes(row.key)) {
      rowSelection.selectedRowKeys = [];
      selectItem = null;
    } else {
      rowSelection.selectedRowKeys = [row.key];
      selectItem = Object.assign({}, row);
    }

    this.setState({
      rowSelection,
      selectItem
    })
  }
  render () {
    const { 
      columns, 
      dataSource, 
      dataSource2, 
      rowSelection,
      selectedRowKeys,
      pagination
    } = this.getState();

    return (
      <div className="tabke-basic">
        <Card title="基础表格" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={dataSource}
          />
        </Card>

        <Card title="动态数据渲染表格--Mock" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={dataSource2}
          />
        </Card>

        <Card title="Mock--单选框" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={dataSource2}
            rowSelection={rowSelection}
            onRow={(row, index) => {
              return {
                onClick: () => {
                  this.onRowClick(row, index)
                }
              }
            }}
          />
        </Card>

        <Card title="Mock--复选框" className="card-item">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={dataSource2}
            rowSelection={{
              type: 'checkbox',
              columnWidth: '50px',
              selectedRowKeys: selectedRowKeys,
              onChange: (selectedRowKeys) => {
                this.setState({
                  selectedRowKeys
                })
              }
            }}
          />
        </Card>

        <Card title="Mock--表格分页" className="card-item">
          <Table
            bordered
            pagination={pagination}
            columns={columns}
            dataSource={dataSource2}
          />
        </Card>
      </div>
    )
  }
};

export default TableBasic;
