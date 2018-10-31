import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Select, Tree, Transfer } from 'antd';
import ETable from '../../components/ETable';
import axios from '../../axios';
import Utils from '../../utils';
import menuConfig from '../../config/menuConfig';

import './index.less';
import { Object } from 'core-js';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class Permission extends Component{
  constructor (props) {
    super(props);

    this.state = {
      roleList: [],
      loading: false,
      selectedRowKeys:[],
      selectedIds: [],
      selectedItem: null,
      isRoleVisible: false,
      isPermVisible: false,
      isUserVisible: false,
      isAuthClosed: false,
      menuInfo: [],
      detailInfo: null,
      mockData: [],
      targetKeys: []
    }
  }

  getState() {
    return this.state;
  }

  columns = [
    {
      title: '角色ID',
      dataIndex: 'id',
      align: 'center',
      width: 80
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center',
      width: 120
    },
    {
      title: '使用状态',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render (status) {
        return status === 1 ? '启用' : '停用';
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '授权时间',
      align: 'center',
      dataIndex: 'authorizeTime'
    },
    {
      title: '授权人',
      align: 'center',
      width: 200,
      dataIndex: 'authorizeUserName'
    }
  ]

  // 数据列表加载数据
  request = () => {
    this.setState({
      loading: true
    });
    axios.ajax({
      url: '/role/list',
      isShow: false,
      data: {
        params: {}
      }
    }).then((res) => {
      if (res.code === '0') {
        let list = res.result.list;
        list.map((item, index) => {
          return item.key = index;
        });
        this.setState({
          roleList: list,
          loading: false
        });
      }
    });
  }

  // 用户授权
  getRoleUserList = (id, callback) => {
    axios.ajax({
      url: '/role/userlist',
      data: {
        params: {
          id
        }
      }
    }).then((res) => {
      if (res.code === '0') {
        this.getAuthUserList(res.result.list);

        if (callback) {
          callback();
        }
      }
    });
  }

  // 显示创建人员的框
  createRole = () => {
    this.setState({
      isRoleVisible: true
    });
  }

  // 提交创建人员的信息
  handleRoleSubmit = () => {
    let roleInfo = this.roleForm.props.form.getFieldsValue();

    this.roleForm.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
    
        axios.ajax({
          url:'/role/create',
          isShow: false,
          data: {
            params: {...roleInfo}
          }
        }).then((res) => {
          if (res.code === '0') {
            this.setState({
              isRoleVisible: false,
              loading: false
            });
          }
        });
      } else {

      }
    });
  }

  //权限面板打开
  handlePerm = () => {
    const { selectedItem } = this.getState();

    if (!selectedItem) {
      Modal.error({
        title: '信息',
        content: '请选择一个角色',
        okText: '关闭'
      });
      return false;
    } else {
      this.setState({
        isPermVisible: true,
        detailInfo: Object.assign({}, selectedItem),
        menuInfo: [...selectedItem.menus]
      });
    }
  }

  // 确定设置权限
  handlePermSubmit = () => {
    let { selectedItem, menuInfo } = this.getState();
    let data = this.editForm.props.form.getFieldsValue();
    
    data.role_id = selectedItem.id;
    data.menus = menuInfo;

    axios.ajax({
      url: '/permission/edit',
      isShow: false,
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res.code === '0') {
        this.setState({
          isPermVisible: false
        });

        this.request();
      }
    })
  }

  // 打开授权面板
  handleUserAuth = () => {
    const { selectedItem } = this.getState();

    if (!selectedItem) {
      Modal.error({
        title: '信息',
        content: '未选中人员',
        okText: '关闭'
      });

      return false;
    }

    this.getRoleUserList(selectedItem.id, () => {
      this.setState({
        isUserVisible: true,
        isAuthClosed: false,
        detailInfo: selectedItem
      });
    });
  }

  // 筛选目标用户
  getAuthUserList = (data) => {
    console.log(data);
    let mockData = [];
    let targetKeys = [];

    if (data && data.length > 0) {
      data.forEach((item) => {
        let obj = {
          key: item.user_id,
          title: item.user_name,
          status: item.status
        }

        if (obj.status === 1) {
          targetKeys.push(obj.key);
        }

        mockData.push(obj);
      });
    }

    this.setState({
      mockData,
      targetKeys
    });
  }

  patchUserInfo = (targetKeys) => {
    this.setState({
      targetKeys
    })
  }

  handleUserSubmit = () => {
    let obj = {};
    obj.user_ids = this.state.targetKeys || [];
    obj.role_id = this.state.selectedItem.id;

    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...obj
        }
      }
    }).then((res) => {
      if (res.code === '0') {
        this.setState({
          isUserVisible: false
        });

        this.request();
      }
    });
  }

  componentDidMount () {
    this.request();
  }

  render () {
    let { 
      loading, 
      roleList, 
      selectedRowKeys, 
      isRoleVisible,
      isPermVisible,
      menuInfo,
      detailInfo,
      isUserVisible,
      mockData,
      targetKeys
    } = this.getState();

    return (
      <div className="Permission">
        <Card className="card-item">
          <Button onClick={this.createRole} className="button-item" type="primary">创建角色</Button>
          <Button onClick={this.handlePerm} className="button-item" type="primary">设置权限</Button>
          <Button onClick={this.handleUserAuth} className="button-item" type="primary">用户授权</Button>
        </Card>

        <div className="content-wrapper">
          <ETable
            loading={loading}
            columns={this.columns}
            dataSource={roleList}
            rowSelection='radio'
            selectedRowKeys={selectedRowKeys}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            pagination={false}
          />
        </div>

        <Modal
          title='创建角色'
          visible={isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.setState({
              isRoleVisible: false
            });
          }}
          >
          <RoleForm wrappedComponentRef={(roleForm) => {this.roleForm = roleForm}}/>
        </Modal>

        <Modal
          title='权限设置'
          centered
          visible={isPermVisible}
          width={600}
          onOk={this.handlePermSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            });
          }}
          >
          <PermEditForm
            wrappedComponentRef={(ref) => {this.editForm = ref}}
            menuInfo={menuInfo}
            detailInfo={detailInfo}
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                  menuInfo: checkedKeys
              });
            }}
            />
        </Modal>

        <Modal
          title='用户授权'
          centered
          width={800}
          visible={isUserVisible}
          onOk={this.handleUserSubmit}
          onCancel={()=>{
            this.setState({
              isUserVisible: false
            });
          }}
          >
            <RoleAuthForm 
              detailInfo={detailInfo}
              mockData={mockData}
              targetKeys={targetKeys}
              patchUserInfo={this.patchUserInfo}
            ></RoleAuthForm>
        </Modal>
      </div>
    );
  }
}

export default Permission;

class RoleAuthForm extends Component{
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }

  handleChange = (targetKeys) => {
    const { patchUserInfo } = this.props;

    patchUserInfo(targetKeys)
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 18}
    };

    const { detailInfo } = this.props;

    return(
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: ''
            })(
              <Input disabled placeholder={detailInfo.roleName}/>
            )
          }
        </FormItem>

        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer
            listStyle={{width: 200,height: 400}}
            dataSource={this.props.mockData}
            showSearch
            titles={['待选用户', '已选用户']}
            locale={{
              searchPlaceholder: '输入用户名'
            }}
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            render={item => item.title}
            onChange={this.handleChange}
          />
        </FormItem>
      </Form>
    )
  }
}

RoleAuthForm = Form.create({})(RoleAuthForm);

class PermEditForm extends Component{
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys);
  }

  renderTreeNodes = (data, key='') => {
    return data.map((item) => {
      let parentKey = key + item.key;

      if (item.children) {
        return (
          <TreeNode  title={item.title} key={parentKey} dataRef={item}>
            {this.renderTreeNodes(item.children, parentKey)}
          </TreeNode>
        )
      } else if(item.btnList) {
        return (
          <TreeNode title={item.title} key={parentKey} dataRef={item}>
             { this.renderBtnTreedNode(item,parentKey) }
          </TreeNode>
        )
      } else {
        return (
          <TreeNode {...item}></TreeNode>
        )
      }
    })
  }

  renderBtnTreedNode = (menu,parentKey='') => {
    let btnList = [...menu.btnList]
    return btnList.map((item) => {
      return (
        <TreeNode title={item.title} key={parentKey+'-btn-'+item.key} />
      )
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 18}
    };

    const menuInfo = this.props.menuInfo;
    const detailInfo = this.props.detailInfo
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: detailInfo.roleName
            })(
              <Input disabled placeholder="角色名称"/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: 1
            })(
              <Select>
                <Option value={1}>启用</Option>
                <Option value={0}>禁用</Option>
              </Select>
            )
          }
        </FormItem>

        <div style={{height: 250, overflowY: "auto"}}>
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={menuInfo || []}
            onCheck={(checkedKeys) => { this.onCheck(checkedKeys) }}
            >
            <TreeNode title="平台权限" key="platform_all">
              {this.renderTreeNodes(menuConfig)}
            </TreeNode>
          </Tree>
        </div>
      </Form>
    );
  }
}
PermEditForm = Form.create({})(PermEditForm);

class RoleForm extends Component{
  render () {
    let { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              rules: [
                { required: true, message: '输入角色名称' }
              ]
            })(
              <Input type="text" placeholder="输入角色名称"/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: 1
            })(
              <Select>
                <Option value={1}>启用</Option>
                <Option value={0}>禁用</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}

RoleForm = Form.create({})(RoleForm);
