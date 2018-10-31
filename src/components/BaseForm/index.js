import React, { Component } from 'react';
import {
  Input,
  Select,
  Form,
  Button,
  Checkbox,
  DatePicker
} from 'antd';
import Utils from '../../utils';
import moment from 'moment';
import 'moment/locale/zh-cn';

const FormItem = Form.Item;
moment.locale('zh-cn');

class BaseForm extends Component {
  
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];

    if (formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder
        let width = item.width;

        switch (item.type) {
          case 'SELECT': 
            const SELECT = <FormItem label={label} key={field}>
              {
                getFieldDecorator(field, {
                  initialValue: initialValue
                })(
                  <Select style={{width: width}} placeholder={placeholder}>
                    {
                      Utils.getOptionList(item.list)
                    }
                  </Select>
                )
              }
            </FormItem>

            formItemList.push(SELECT)
            break;
          case 'INPUT': 
            const INPUT = <FormItem label={label} key={field}>
              {
                getFieldDecorator(field, {
                  initialValue: initialValue
                })(
                  <Input type="text" placeholder={placeholder}/>
                )
              }
            </FormItem>
            formItemList.push(INPUT)
            break;
          case 'CHECKBOX': 
            const CHECKBOX = <FormItem label={label} key={field}>
              {
                getFieldDecorator(field, {
                  initialValue: initialValue, // true | false
                  valuePropsName: 'checked'
                })(
                  <Checkbox>
                    {label}
                  </Checkbox>
                )
              }
            </FormItem>
            formItemList.push(CHECKBOX);
            break;
          case '时间查询':
            const begin_time = <FormItem key='begin_time'>
              {
                getFieldDecorator('begin_time')(
                  <DatePicker showTime={true} placeholder="开始时间" format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>

            const end_time = <FormItem key='end_time'>
            {
              getFieldDecorator('end_time')(
                <DatePicker showTime={true} placeholder="开始时间" format="YYYY-MM-DD HH:mm:ss"/>
              )
            }
            </FormItem>

            const SPAN = <FormItem key='span'>
              <span> ~ </span>
            </FormItem>

            formItemList.push(begin_time);
            formItemList.push(SPAN);
            formItemList.push(end_time);
            break;
          case 'DATE': 
            const Date = <FormItem label={label} key={field}>
              {
                getFieldDecorator(field)(
                  <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>

            formItemList.push(Date);
            break;
          default: 
            return false
        }
      })
    }

    return formItemList;
  }

  // 重置事件
  handleReset = () => {
    const { resetFields } = this.props.form;

    resetFields();
  }

  // 查询
  handleSubmit = () => {
    let fieldValues = this.props.form.getFieldsValue();

    if (this.props.handleSubmit) {
      this.props.handleSubmit(fieldValues)
    }
  }

  render () {
    return (
      <Form layout="inline" className="base-form">
        {
          this.initFormList()
        }
        <FormItem>
          <Button className="button-item" onClick={this.handleSubmit} type="primary">查询</Button>
          <Button className="button-item" onClick={this.handleReset} type="default">重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(BaseForm);
