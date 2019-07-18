import React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const SystemMenu = (
  <SubMenu
    key="management"
    title={
      <span>
        <Icon type="setting" />
        <span>系统管理</span>
      </span>
    }
  >
    <Menu.Item key="management/m-menu">
      <Icon type="menu" />
      <span>菜单管理</span>
    </Menu.Item>
    <Menu.Item key="management/m-user">
      <Icon type="user" />
      <span>用户管理</span>
    </Menu.Item>
  </SubMenu>
)
export default SystemMenu;
