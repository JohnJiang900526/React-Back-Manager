export const config = {
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
  },
  badge: {
    '1': '篮球',
    "2": '桌球',
    "3": '足球',
    "4": "排球",
    "5": "乒乓球",
    "6": "徒步",
    "7": "骑行",
    "8": "格斗"
  }
};

export const columnsData = [
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
      return config.interest[interest]
    },
    align: 'center',
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
    title: '早起时间',
    key: 'time',
    dataIndex: 'time',
    align: 'center',
    width: 100
  }
];

export const columnsDataSort = [
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
    width: 80,
    sorter (a, b) {
      return a.age - b.age;
    }
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
      return config.interest[interest]
    },
    align: 'center',
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
    title: '早起时间',
    key: 'time',
    dataIndex: 'time',
    align: 'center',
    width: 100
  }
];

export const columnsDataBoth = [
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    fixed: 'left',
    width: 60
  },
  {
    title: '用户名',
    key: 'userName',
    dataIndex: 'userName',
    align: 'center',
    fixed: 'left',
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
    fixed: 'left',
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
      return config.interest[interest]
    },
    align: 'center',
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
    title: '生日',
    key: 'birthday1',
    dataIndex: 'birthday',
    align: 'center',
    width: 120
  },
  {
    title: '生日',
    key: 'birthday2',
    dataIndex: 'birthday',
    align: 'center',
    width: 120
  },
  {
    title: '生日',
    key: 'birthday3',
    dataIndex: 'birthday',
    align: 'center',
    width: 120
  },
  {
    title: '生日',
    key: 'birthday4',
    dataIndex: 'birthday',
    align: 'center',
    width: 120
  },
  {
    title: '生日',
    key: 'birthday5',
    dataIndex: 'birthday',
    align: 'center',
    width: 120
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
    align: 'center',
    fixed: 'right',
    width: 120
  },
  {
    title: '早起时间',
    key: 'time',
    dataIndex: 'time',
    align: 'center',
    fixed: 'right',
    width: 100
  }
];