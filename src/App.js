import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Routes from './pages/Routes';
import LoginModel from './models/AdminModel';

function App() {
  const [isLogin, setIsLogin] = useState(!!Cookies.get('isLogin'));
  useEffect(() => {
    !isLogin && (new LoginModel()).login("admin", "123456").then((result) => {
      console.log('login', result);
      setIsLogin(true);
    })
  })

  const routesElem = isLogin ? <Routes /> : null;
  return (
    <div className="App">
      {routesElem}
    </div>
  );
}

export default App;
