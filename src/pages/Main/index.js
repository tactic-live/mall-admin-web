import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import ErrorBoundary from '../../components/error-boundary';
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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <MenuComp onSelect={onSelect}
          defaultSelectedKeys={defaultSelectedKeys} />
      </Sider>
      <Layout>
        <Header className="header">
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => { setCollapsed(!collapsed) }}
          />
          <ShortInfo className="trigger" />
        </Header>
        <Content className="content">
          <ErrorBoundary>
            <Switch>
              <Route path="/home" exact component={loadable(() => import('../Home'))} />
              <Route path="/pms" component={loadable(() => import('../pms'))} />
              <Route path="/" component={loadable(() => import('../404'))} />
            </Switch>
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
