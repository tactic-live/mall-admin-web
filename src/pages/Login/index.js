import React from 'react';
import { Button, Form, Input } from 'antd';
import { get as getCookie, set as setCookie } from 'js-cookie';
import styles from './style.module.less'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 8 },
};

class Login extends React.Component {

  login = () => {
    const { history, authKey = 'isLogin' } = this.props;
    setCookie(authKey, '1');
    history.push('/main');
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login();
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item label="账号" {...formItemLayout}>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '账号必须输入.',
                }
              ]
            })(<Input placeholder="请输入账号" />)}
          </Form.Item>
          <Form.Item label="密码" {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '密码必须输入.',
                }
              ]
            })(<Input placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item {...formTailLayout} className={styles.actions}>
            <Button type="primary" htmlType="submit">登录</Button>
            <Button type="second" onClick={this.onLogin}>注册</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedLogin = Form.create({ name: 'login' })(Login);
export default WrappedLogin;
