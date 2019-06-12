import React from 'react';
import { Modal } from 'antd';

import SkuModel from '@/models/SkuModel';

class SkuStockEditModal extends React.Component {
  state = {
    visible: false,
    result: []
  };

  componentWillMount() {
    const { visible } = this.props;
    this.setState({
      visible
    })
  }

  componentDidMount() {
    const { pid } = this.props;
    new SkuModel().fetchSkusByProductId(pid).then((result) => {
      this.setState({
        result
      });
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { onOk, afterClose } = this.props;
    const { visible, result } = this.state;
    result.map(skuInfo=><div></div>)
    return (
      <Modal
        title="编辑货品信息"
        visible={visible}
        onOk={onOk}
        onCancel={this.handleCancel}
        okText="确定"
        destroyOnClose={true}
        afterClose={afterClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
export default SkuStockEditModal;
