import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import Routes from './pages/Routes';
import store from '@/core/store';
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
    <Provider className="App" store={store}>
      {routesElem}
    </Provider>
  );
}

export default App;
