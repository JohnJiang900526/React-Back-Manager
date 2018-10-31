import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Menu } from 'antd';

import './index.less';
import MenuConfig from '../../config/menuConfig';
import * as Actions from '../../store/action';

const SubMenu = Menu.SubMenu;

class NavLeft extends Component {
  constructor (props) {
    super(props);

    this.state = {
      theme: 'dark',
      mode: 'vertical',
      menuTreeNode: null,
      selectedKeys: []
    }
  }

  componentWillMount () {
    const menuTreeNode = this.renderMenu(MenuConfig);
    let hash = window.location.hash

    this.setState({
      menuTreeNode,
      selectedKeys: [hash.replace(/#|\?.*$/, '')]
    });
  }

  // 菜单渲染
  renderMenu = (data) => {
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            { this.renderMenu(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item title={item.title} key={item.key}>
            <NavLink to={item.key}>
              { item.title }  
            </NavLink>
          </Menu.Item>
        )
      }
    });
  }

  getState = () => {
    return this.state
  }

  handleClickMenu = (obj) => {
    const { handleChangeMenu } = this.props;
    let value = obj.item.props.title;

    localStorage.setItem('change_menu', value);
    this.setState({
      selectedKeys: obj.keyPath
    });
    handleChangeMenu(value);
  }

  render () {
    let { theme, menuTreeNode, selectedKeys } = this.getState();

    return (
      <div className="nav-left-content">
        <NavLink to="/admin/home">
          <div className="logo">
            <img src="/assets/logo-ant.svg" alt="logo"/>
            <h1>MS</h1>
          </div>
        </NavLink>
        <Menu
            mode={ this.props.mode }
            theme={ theme }
            selectedKeys={selectedKeys}
            onClick={this.handleClickMenu}
          >
          { menuTreeNode }
        </Menu>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  handleChangeMenu(value) {
    dispatch(Actions.handleChangeMenu(value));
  }
});

export default connect(null, mapDispatch)(NavLeft);
