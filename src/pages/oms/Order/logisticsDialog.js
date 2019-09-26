import { Modal } from 'antd';
import React from 'react';
import './logisticsDialog.less';

const LogisiticsDialog = ({ ...props }) => {
  const { visible, data, onCancel, recordid, id } = props;
  console.log('LogisiticsDialogprops', props, visible && (id === recordid));

  return (
    <Modal
      title="订单跟踪"
      visible={visible && (id === recordid)}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        {
          data && data.length > 0 ? (
            <ul className="logisticeDialogStep">
              {
                data.map((res, index) => (
                  <li key={res.name + index}>
                    <div className="stepMain">
                      {
                        Number(res.status) !== 1 ?
                          <div className="stepAricle stepNotAt">
                            <span className="order-index">{index + 1}</span>
                          </div>
                          :
                          <div className="stepAricle">
                            <i className="icon-success"></i>
                          </div>
                      }
                      {
                        index === data.length - 1 ?
                          '' :
                          <div className={index === data.length - 2 && Number(data[index + 1].status) !== 1 ? "stepLine notSucess" : 'stepLine '}></div>
                      }

                    </div>
                    <div className="stepInfo">
                      <p>
                        {res.name}
                      </p>
                      <p>
                        {res.time}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>
          ) : <p className="noLogistics">暂无物流信息</p>
        }
      </div>

    </Modal>
  )
}

export default React.forwardRef(LogisiticsDialog);