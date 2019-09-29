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

  /**
   * 修改退货状态
   */
  async updateReturnStatus(params) {
    const result = await super.put('/api/returnApply/status', params);
    return result.data;
  }

  /**
   * 获取退货订单列表
   */

   async fetchReturnApplyList(params){
    const result = await super.get(`/api/returnApply/list`,params);
    return result.data;
   }

   /***
    * 删除订单
    */
   async deleteApply(params){
    const result = await super.post(`/api/returnApply/delete`,params);
    return result.data;
   }
}

export default ReturnApplyModel;
