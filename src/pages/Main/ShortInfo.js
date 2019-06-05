import React from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';

const menu = (
  <Menu onClick={() => { }}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

function ShortInfo({ className }) {
  return (
    <div className={`shortInfo ${className}`}>
      <Dropdown overlay={menu}>
        <Button size="small">
          admin
          <Icon type="user" />
        </Button>
      </Dropdown>
      <Button shape="circle" icon="search" size="small" />
      <Button type="link" size="small">退出</Button>
    </div>
  )
}

export default ShortInfo;
