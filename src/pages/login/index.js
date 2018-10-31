import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import './index.less';

const FormItem = Form.Item;

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false
    }
  }

  getState () {
    return this.state;
  }

  loginSubmit = (params) => {
    this.setState({
      redirect: true
    });
  }

  render () {
    const { redirect } = this.getState();

    if (redirect) {
      return(
        <Redirect push to="/#/"/>
      );
    } else {
      return (
        <div className="login-page">
          <div className="login-header">
            <div className="logo">
              <img src="/assets/logo-ant.svg" alt=""/>
              React全家桶+AntD 项目后台管理系统
            </div>
          </div>
          <div className="login-content-wrap">
            <div className="login-content">
              <div className="word">越努力，越幸运...</div>
              <div className="login-box">
                <div className="title">欢迎登录</div>
                <LoginForm loginSubmit={this.loginSubmit}/>
              </div>
            </div>
          </div>
          <Footer className="footer"/>
        </div>
      )
    }
  }
};

export default Login;

class LoginForm extends Component{
  // 登录提交信息
  loginSubmit = (e) => {
    e && e.preventDefault();
    let { validateFields } = this.props.form;
    
    validateFields((err, values) => {
      if (!err) {
        this.props.loginSubmit(values)
      } else {
        console.log(err);
      }
    });
  }

  // 用户名验证
  checkUsername = (rule, value, callback) => {
    let reg = /^\w+$/;

    if (!value) {
      callback('请输入用户名!');
    } else if (!reg.test(value)) {
      callback('用户名只允许输入英文字母');
    } else {
      callback();
    }
  }

  // 密码验证
  checkPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码!');
    } else {
      callback();
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {
            getFieldDecorator('userName', {
              initialValue: 'admin',
              rules: [
                {
                  validator: this.checkUsername
                }
              ]
            })(
              <Input type="text" prefix={<Icon type="user"/>} placeholder="用户名"/>
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password', {
              initialValue: '123456',
              rules: [
                {
                  validator: this.checkPassword
                }
              ]
            })(
              <Input type="password" prefix={<Icon type="lock"/>} placeholder="密码"/>
            )
          }
        </FormItem>
        <FormItem>
          <Button onClick={this.loginSubmit} className="login-btn" type="primary">登录</Button>
        </FormItem>
      </Form>
    )
  }
}

LoginForm = Form.create({})(LoginForm);
