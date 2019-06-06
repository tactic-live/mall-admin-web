import React, { useEffect } from 'react';
import { Form, Button } from 'antd';

function Condition({ onSearch }) {
  function onSubmit() {
    onSearch && onSearch({ page: 20 });
  }
  useEffect(() => {
  });
  return (
    <div>
      Condition
      <Form onSubmit={onSubmit}>
        <Button htmlType="submit" type="primary">查询</Button>
      </Form>
    </div>
  );
}

export default Condition;
