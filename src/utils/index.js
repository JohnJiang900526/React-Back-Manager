import React from 'react';
import {
  Select
} from 'antd';

const Option = Select.Option;

export default {
  formateDate (time) {
    if (!time) {
      return '';
    }

    let date = new Date(time);
    let month = date.getMonth() + 1 + '';
    let _date = date.getDate() + '';
    let hour = date.getHours() + '';
    let minute = date.getMinutes() + '';
    let second = date.getSeconds() + '';

    month = month.length < 2 ? '0' + month : month;
    _date = _date.length < 2 ? '0' + _date : _date;
    hour = hour.length < 2 ? '0' + hour : hour;
    minute = minute.length < 2 ? '0' + minute : minute;
    second = second.length < 2 ? '0' + second : second;

    return {
      Date: `${date.getFullYear()}-${month}-${_date}  ${hour}:${minute}:${second}`,
      Year: date.getFullYear(),
      Month: month,
      _Date: _date,
      Hour: hour,
      Minute: minute,
      Second: second
    };
  },
  pagination (data, callback) {
    return {
      onChange (current) {
        if (callback) {
          callback(current)
        }
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal () {
        return `共${data.result.total}条`
      },
      showQuickJumper: true,
      showSizeChanger: false
    }
  },
  getOptionList (data) {
    if (!data) {
      return []
    }

    let options = []

    data.forEach((item, i) => {
      options.push(<Option value={item.id} key={i}>{item.name}</Option>)
    });

    return options;
  },
  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  }
}
