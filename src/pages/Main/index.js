import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import ErrorBoundary from '../../components/error-boundary';
import BreadcrumbComp from './BreadcrumbComp';
import MenuComp from './MenuComp';
import ShortInfo from './ShortInfo';
import './styles.less';

const { Header, Sider, Content } = Layout;

const Main = ({ history, match }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { subPath, subPath2 } = match.params;
  function onSelect({ item, key, keyPath, selectedKeys, domEvent }) {
    history.push(`/${key}`);
  }
  const defaultSelectedKeys = [
    subPath, `${subPath}/${subPath2}`];
  return (
    <Layout className="main">
      <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
          overflow: 'auto',
          position: 'fixed',
          left: 0,
          height: '100vh'
        }}>
        <div className="logo" />
        <MenuComp onSelect={onSelect} defaultSelectedKeys={defaultSelectedKeys} mode="inline" />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header className="header">
          {/*不显示收缩按钮 <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => { setCollapsed(!collapsed) }}
          /> */}
          <i className="breadcrumb">
            <BreadcrumbComp />
          </i>
          <ShortInfo className="trigger" />
        </Header>
        <Content className="content">
          <ErrorBoundary>
            <Switch>
              <Route path="/home" exact component={loadable(() => import('../Home'))} />
              <Route path="/pms" component={loadable(() => import('../pms'))} />
              <Route path="/oms" component={loadable(() => import('../oms'))} />
              <Route path="/sms" component={loadable(() => import('../sms'))} />
              <Route path="/" component={loadable(() => import('@/pages/404'))} />
            </Switch>
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
