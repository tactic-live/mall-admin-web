import AbstractModel from './AbstractModel';

class ReturnApplyModel extends AbstractModel {

  /**
   * 获取退货订单详情
   * @param {Integer} id 退货订单id
   */
  async fetchReturnApplyDetailById(id) {
    const result = await super.get(`/api/returnApply/${id}`);
    return result.data;
  };
}

export default ReturnApplyModel;
