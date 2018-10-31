import React, { Component } from 'react';
import moment from 'moment';
import {
  Card, Form, Button, Input, Checkbox,
  Radio, Select, Switch, DatePicker,
  TimePicker, Upload, Icon, message, InputNumber
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

const formItemLayout = {
  labelCol: {
    xs: 24,
    sm: 4
  },
  wrapperCol: {
    xs: 24,
    sm: 12
  }
};

const rowObject = {
  minRows: 4, maxRows: 10
};

const offsetLayout = {
  wrapperCol: {
    xs: 24,
    sm: {
      span: 12,
      offset: 4
    }
  }
};

class Register extends Component {
  constructor (props) {
    super(props);

    this.state = {
      userImg: '',
      loading: false
    }
  }

  getState = () => {
    return this.state;
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(
          `${userInfo.userName}, 恭喜你通过本次表单组件的学习，当前密码为：${userInfo.passWord}`
        )
      } else {
        message.error(
          '表单还没完善'
        )
      }
    })
  }

  onChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true
      });

      return;
    }

    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          userImg: imageUrl,
          loading: false
        })
      })
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const { userImg, loading } = this.getState();

    return (
      <div className="register">
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(
                  <Input placeholder="请输入用户名"/>
                )
              }
            </FormItem>

            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('passWord', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    }
                  ]
                })(
                  <Input type="password" placeholder="请输入密码"/>
                )
              }
            </FormItem>

            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('userSex', {
                  initialValue: '1'
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>

            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber/>
                )
              }
            </FormItem>

            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('status', {
                  initialValue: '2'
                })(
                  <Select>
                    <Option value="1">咸鱼一条</Option>
                    <Option value="2">风华浪子</Option>
                    <Option value="3">北大才子一枚</Option>
                    <Option value="4">百度FE</Option>
                    <Option value="5">创业者</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['1', '3']
                })(
                  <Select mode="multiple">
                    <Option value="1">游泳</Option>
                    <Option value="2">打篮球</Option>
                    <Option value="3">踢足球</Option>
                    <Option value="4">跑步</Option>
                    <Option value="5">爬山</Option>
                    <Option value="6">骑行</Option>
                    <Option value="7">桌球</Option>
                    <Option value="8">麦霸</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Switch/>
                )
              }
            </FormItem>

            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-10-21')
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </FormItem>

            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '上海市人民广场'
                })(
                  <TextArea autosize={rowObject}/>
                )
              }
            </FormItem>

            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time', {
                  initialValue: moment('13:30:56', 'HH:mm:ss')
                })(
                  <TimePicker/>
                )
              }
            </FormItem>

            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.onChange}
                  >
                  {
                    userImg ? <img alt="" src={userImg}/> : <Icon style={{fontSize: '40px'}} type="plus"/>
                  }
                  {
                    loading ? <Icon style={{fontSize: '40px'}} type="loading"/> : null
                  }
                  </Upload>
                )
              }
            </FormItem>

            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('deal')(
                  <Checkbox>
                    我已阅读过<span style={{color: '#1890ff'}}>慕课协议</span>
                  </Checkbox>
                )
              }
            </FormItem>

            <FormItem {...offsetLayout}>
              <Button onClick={this.handleSubmit} type="primary">注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(Register);
