import React, { Component } from 'react';
import { 
  Card,
  Form,
  Input,
  Button,
  Icon,
  Checkbox,
  message
} from 'antd';

import './index.less';

const FormItem = Form.Item;

class formLogin extends Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.userName}, 恭喜你通过本次表单组件的学习，当前密码为：${userInfo.password}`);
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="form-login">
        <Card title="登录行内表单" className="card-item">
          <Form layout="inline">
            <FormItem>
              <Input type="text" placeholder="请输入用户名"/>
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>

        <Card title="登录水平表单" className="card-item">
          <Form style={{width: 300}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue:'',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      min: 3,
                      max: 15,
                      message: '长度不在范围内'
                    },
                    {
                      pattern: new RegExp('^\\w+$', "g"),
                      message: '用户名必须为字母或者数字'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user"/>} type="text" placeholder="请输入用户名"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {
                      required:true,
                      message:'密码不能为空'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName:'checked',
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <span style={{float: 'right', color: '#1890ff'}}>忘记密码</span>
            </FormItem>
            <FormItem>
              <Button onClick={this.handleSubmit} type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(formLogin);
