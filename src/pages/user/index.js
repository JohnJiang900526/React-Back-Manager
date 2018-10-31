import React, { Component } from 'react';
import moment from 'moment'
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker } from 'antd';
import axios from '../../axios';
import Utils from '../../utils';
import './index.less';

import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const config = {
  status: {
    '1':'咸鱼一条',
    '2':'风华浪子',
    '3':'北大才子一枚',
    '4':'百度FE',
    '5':'创业者'
  },
  interest: {
    '1':'游泳',
    '2':'打篮球',
    '3':'踢足球',
    '4':'跑步',
    '5':'爬山',
    '6':'骑行',
    '7':'桌球',
    '8':'麦霸'
  }
};

class User extends Component{
  constructor (props) {
    super(props);

    this.state = {
      list: [],
      selectedRowKeys: [],
      selectedIds: [],
      selectedItem: null,
      loading: false,
      pagination: true,
      title: '添加新员工',
      isVisible: false,
      type: '',
      userInfo: ''
    };
  }

  getState () {
    return this.state
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'userName',
      placeholder: '请输入用户名',
      width: 100
    },
    {
      type: 'INPUT',
      label: '手机号码',
      field: 'userMobile',
      placeholder: '请输入手机号码',
      width: 100
    },
    {
      type: 'DATE',
      label: '入职日期',
      field: 'startDate',
      placeholder: '输入日期',
      width: 100
    }
  ]

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title:'用户名',
      dataIndex: 'userName',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      render (sex) {
        return sex === 1 ? '男' : '女' 
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render (status) {
        return config.status[status]
      }
    },
    {
      title: '爱好',
      dataIndex: 'interest',
      align: 'center',
      render (interest) {
        return config.interest[interest]
      }
    },
    {
      title: '婚否',
      dataIndex: 'isMarried',
      align: 'center',
      render (isMarried) {
        return isMarried === 1 ? '已婚' : '未婚'
      }
    },
    {
      title: '生日',
      align: 'center',
      dataIndex: 'birthday'
    },
    {
      title: '联系地址',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '早起时间',
      align: 'center',
      dataIndex: 'time'
    }
  ]

  request = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  handleFilterSubmit = (params) => {
    axios.requestList(this, '/user/list', params)
  }

  handleSubmit = () => {
    let { type } = this.getState();
    let data = this.userFrom.props.form.getFieldsValue();

    axios.ajax({
      url: type === 'create' ? '/user/add' : 'user/delete',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res.code === '0') {
        this.request();

        this.setState({
          isVisible: false
        });
      }
    });
  }

  handleOperator = (type) => {
    let { selectedItem } = this.getState();
    let that = this;

    switch (type) {
      case 'create': 
        this.setState({
          title: '新增员工',
          isVisible: true,
          type
        });
        break;
      case 'edit':
        if (!selectedItem) {
          Modal.error({
            title: '信息',
            content: '请选择一个用户'
          });
        } else {
          this.setState({
            userInfo: selectedItem,
            title: '编辑用户',
            isVisible: true,
            type
          });
        }

        break;
      case 'detail':
        if (!selectedItem) {
          Modal.error({
            title: '信息',
            content: '请选择一个用户'
          });
        } else {
          this.setState({
            userInfo: selectedItem,
            title: '用户详情',
            isVisible: true,
            type
          });
        }
        break;
      case 'delete': 
        if (!selectedItem) {
          Modal.error({
            title: '信息',
            content: '请选择一个用户'
          })
        } else {
          Modal.confirm({
            title: '确定删除此用户吗？',
            onOk() {
              axios.ajax({
                url:'/user/delete',
                data:{
                  params: {
                    id: selectedItem.id
                  }
                }
              }).then((res) => {
                that.setState({
                  isVisible: false,
                  selectedRowKeys: [],
                  selectedIds: []
                });
              })
            }
          })
        }
        break;
      default: 
        return false
    }
  }

  componentDidMount () {
    this.request();
  }

  render () {
    let { 
      list, 
      loading, 
      pagination, 
      selectedRowKeys,

      title,
      isVisible,
      userInfo,
      type
    } = this.getState();

    return (
      <div className="user-block">
        <Card className="card-item">
          <BaseForm handleSubmit={this.handleFilterSubmit} formList={this.formList}/>
        </Card>
        <Card className="card-item">
          <Button type="primary" onClick={() => { this.handleOperator('create') }} icon="plus">新增员工</Button>
          <Button type="primary" onClick={() => { this.handleOperator('edit') }} icon="edit">编辑员工</Button>
          <Button type="primary" onClick={() => { this.handleOperator('detail') }} icon="folder-open">员工详情</Button>
          <Button type="danger" onClick={() => { this.handleOperator('delete') }} icon="delete">删除员工</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            loading={loading}
            columns={this.columns}
            dataSource={list}
            selectedRowKeys={selectedRowKeys}
            rowSelection={'radio'}
            pagination={pagination}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
          />
        </div>

        <Modal
          width={600}
          title={title}
          visible={isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.setState({
              isVisible: false,
              userInfo: ''
            });

            this.userFrom.props.form.resetFields();
          }}
          >
          <UserForm
            userInfo = {userInfo}
            type={type}
            wrappedComponentRef={(ref) => { this.userFrom = ref }}
            >

          </UserForm>
        </Modal>
      </div>
    )
  }
}

export default User;

class UserForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };

    const userInfo = this.props.userInfo || {};
    const type = this.props.type;

    return (
      <Form layout="horizontal">
        <FormItem label="姓名" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.userName : 
            getFieldDecorator('userName', {
              initialValue:userInfo.userName
            })(
              <Input placeholder="请输入姓名" type="text"/>
            )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.sex === 1 ? '男' : '女' : 
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? config.status[userInfo.status] : 
            getFieldDecorator('status', {
              initialValue: userInfo.status
            })(
              <Select>
                <Option value={1}>咸鱼一条</Option>
                <Option value={2}>风华浪子</Option>
                <Option value={3}>北大才子一枚</Option>
                <Option value={4}>百度FE</Option>
                <Option value={5}>创业者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.birthday : 
            getFieldDecorator('birthday', {
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker/>
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.address : 
            getFieldDecorator('address', {
              initialValue: userInfo.address
            })(
              <Input.TextArea rows={3} placeholder="请输入居住地址"/>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

UserForm = Form.create({})(UserForm)
