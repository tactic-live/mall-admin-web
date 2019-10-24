import React from 'react';
import { Modal, Button, } from 'antd';


class DelectConfirmModal extends React.PureComponent {

  delectOk = () => {
    const { data } = this.props;
    this.props.delectOk && this.props.delectOk(data);
  }

  /**
   * "取消"按钮点击事件
   */
  delectCancel = () => {
    this.props.delectCancel && this.props.delectCancel();
  }

  render() {
    const { cancelVisible, loading = false, delectId, data } = this.props;
    console.log('cancelVisible', cancelVisible)
    return (
      <Modal
        visible={cancelVisible && delectId === data.id}
        title="提示"
        onOk={this.delectOk}
        onCancel={this.delectCancel}
        footer={[
          <Button key="back" onClick={this.delectCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.delectOk}>确定</Button>
        ]}
      >
        <p>是否要删除货号为<strong>{(data && data.product) ? data.product.productSn : ''}</strong>名称为<strong>{(data && data.product) ? data.product.name : ''}</strong>的商品？</p>

      </Modal>
    )
  }
}

export default DelectConfirmModal;