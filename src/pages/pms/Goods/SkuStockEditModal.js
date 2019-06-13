import React from 'react';
import { Modal, List, Typography } from 'antd';

import SkuModel from '@/models/SkuModel';

import './SkuStockEditModal.less';

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
    const { onOk, afterClose, pid } = this.props;
    const { visible, result } = this.state;
    // const skuListElem = result.map(skuInfo => <div></div>)
    return (
      <Modal
        title="编辑货品信息"
        visible={visible}
        onOk={onOk}
        onCancel={this.handleCancel}
        okText="确定"
        destroyOnClose={true}
        afterClose={afterClose}
        className="skuStockEditModal"
        width={700}
      >
        <List
          header={<div>编号 {pid}</div>}
          dataSource={result}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item.stock}
            </List.Item>
          )}
        />
      </Modal>
    );
  }
}
export default SkuStockEditModal;
