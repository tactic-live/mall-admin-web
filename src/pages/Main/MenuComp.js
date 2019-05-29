import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

function MenuComp({ defaultSelectedKeys = [], onSelect }) {
  const defaultOpenKeys = defaultSelectedKeys;
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);
  // const [openKeys, setOpenKeys] = useState(defaultOpenKeys);
  useEffect(() => {
    setSelectedKeys(defaultSelectedKeys);
    // setOpenKeys(defaultOpenKeys);
  }, [defaultSelectedKeys])
  const menus = [];
  menus.push(
    <Menu.Item key="home">
      <Icon type="home" />
      <span>首页</span>
    </Menu.Item>
  );
  let i = 1;
  for (i = 1; i < 10; i++) {
    menus.push(
      <Menu.Item key={`${i}`}>
        <Icon type="user" />
        <span>nav {i}</span>
      </Menu.Item>
    )
  }
  menus.push(
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
  );

  return (
    <Menu theme="dark" mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      // openKeys={openKeys}
      onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
        onSelect && onSelect({ item, key, keyPath, selectedKeys, domEvent });
      }}>
      {menus}
    </Menu>
  )
}

export default MenuComp;
