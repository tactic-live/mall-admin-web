import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Switch, Input } from 'antd';
import './addReasonBtn.less';

class AddReasonBtn extends React.Component {

  constructor(props) {
    super();
    const { reasonName = '', reasonSort = 0, reasonStatus = 0 } = props;
    this.state = {
      addReasonModalStatus: false,
      returnType: reasonName,
      returnSort: reasonSort,
      returnUseStatus: reasonStatus
    };
    this.changeAddModal = this.changeAddModal.bind(this);
    this.confirmAdd = this.confirmAdd.bind(this);
  }

  changeAddModal() {
    this.setState({
      addReasonModalStatus: !this.state.addReasonModalStatus
    });
  }

  confirmAdd() {
    const { returnType, returnSort, returnUseStatus } = this.state;
    const { handleConfirm, btnType, reasonId } = this.props;
    const nowDate = new Date();
    const params = {
      createTime: nowDate,
      name: returnType,
      sort: returnSort,
      status: returnUseStatus
    }
    if (btnType === 1) {
      Object.assign(params, {
        id: reasonId
      });
    }
    handleConfirm(params);
    this.changeAddModal();
    if (btnType !== 1) {
      this.props.reSearch();
    }
  }

  render() {
    const { addReasonModalStatus } = this.state;
    const { btnType = 0, reasonName = '', reasonSort = 0, reasonStatus = 0, delStatus = false } = this.props;
    return (
      <div className="return-reason-modal">
        <Button type="primary" ghost size="small" disabled={delStatus} onClick={this.changeAddModal}>{btnType === 1 ? "编辑" : "添加"}</Button>
        <Modal
          title={btnType === 1 ? "修改退货原因" : "添加退货原因"}
          visible={addReasonModalStatus}
          onOk={this.confirmAdd}
          onCancel={this.changeAddModal}
        >
          <div className='return-item'>
            <span className="item-title">原因类型：</span>
            <Input defaultValue={reasonName} onChange={(e) => {
              const { value } = e.target;
              this.setState({
                returnType: value
              });
            }} />
          </div>
          <div className='return-item'>
            <span className="item-title">排序：</span>
            <Input defaultValue={reasonSort} onChange={(e) => {
              const { value } = e.target;
              this.setState({
                returnSort: value
              });
            }} />
          </div>
          <div className='return-item'>
            <span className="item-title">是否启用：</span>
            <Switch defaultChecked={!!reasonStatus}
              onChange={(checked) => {
                const status = checked ? 1 : 0;
                this.setState({
                  returnUseStatus: status
                });
              }}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

const store = (state) => {
  return state;
}

export default connect(store)(AddReasonBtn);
