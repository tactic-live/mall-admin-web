import AbstractModel from './AbstractModel';

class ReturnReasonModel extends AbstractModel {
  /**
   * 分页查询退款原因
   *
   * @param {Integer} pageNum 页数
   * @param {Integer} pageSize 一页显示条数
   */
  async fetchReturnReason(pageNum = 1, pageSize = 5) {
    const result = await super.get('/api/returnReason/list', { pageNum, pageSize });
    return result.data;
  };

  /**
   * 更改退款原因使用状态
   * @param {Integer} status 状态
   * @param {*} ids 退款原因id
   */
  async updateUseStatus(status, ids) {
    // const result = await super.post(`/api/returnReason/update/status?status=${status}&ids=${ids}`);
    const result = await super.put('/api/returnReason/status', { status, ids: [ids] });
    return result.data;
  }

  /**
   * 删除退款原因
   * @param {Array} ids  批量退款原因id
   */
  async deleteReturnReason(ids = []) {
    const result = await super.delete(`/api/returnReason/delete?ids=${ids}`);
    return result.data;
  }

  /**
   * 增加退款原因
   * @param {Object} returnData {
   * @param {Date} createTime 创建时间
   * @param {String} name 原因名字
   * @param {String} sort 原因排序
   * @param {Integer} status状态
   * }
   */
  async addReturnReason(returnData = {}) {
    const result = await super.post('/api/returnReason/create', returnData);
    return result.data;
  }

  /**
   * 修改退货原因
   */
  async updateReturnReason(returnData = {}) {
    const result = await super.put('/api/returnReason/update', returnData);
    return result.data;
  }
}

export default ReturnReasonModel;
