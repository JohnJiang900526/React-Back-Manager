import Jsonp from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from '../utils';

export default class Axios {
  static jsonp (options) {
    return new Promise((resolve, reject) => {
      Jsonp(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (!err) {
          resolve(response);
        } else {
          reject(err);
        }
      });
    })
  }

  static ajax (option) {
    const baseURL = 'https://www.easy-mock.com/mock/5bcead494b7def525102a3c4/mockApi';
    let loading;
    if (option.isShow !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block';
    }

    let { params } = option.data;
    
    return new Promise((resolve, reject) => {
      axios({
        url: option.url,
        method: 'get',
        baseURL: baseURL,
        params: params
      }).then((res) => {
        if (loading) {
          loading.style.display = 'none';
        }
        if (res.status === 200) {
          let result = res.data
          if (result.code === '0') {
            resolve(result)
          } else {
            Modal.error({
              title: '提示',
              content : result.msg
            })
          }
        } else {
          reject(res.data)
        }
      }).catch((e) => {
        if (loading) {
          loading.style.display = 'none';
        }
        Modal.error({
          title: '提示',
          content: e.message
        })
      })
    })
  }

  static requestList (that, url, params) {
    const _this = this;
    let data = {
      params: params
    }

    that.setState({
      loading: true
    });

    this.ajax({
      url,
      isShow: false,
      data
    }).then((data) => {
      if (data && data.result) {
        that.setState({
          list: data.result.list,
          pagination: Utils.pagination(data, (current) => {
            that.params.page = current;
            _this.requestList(that, url, params);
          }),
          loading: false
        })
      }
    })
  }
}
