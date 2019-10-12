import AbstractModel from "./AbstractModel";

class CouponModel extends AbstractModel {

  /**
   * 优惠券列表
   * @param {object} condition 
   */
  async fetchCouponList(condition) {
    const {
      pageNum = 1,
      pageSize = 5,
      name = '',
      type = ''
    } = condition;
    const result = await super.get('/api/coupon/list', {
      pageNum, pageSize, name, type
    });
    return result.data;
  };

  /**
   * 添加优惠券
   * @param {object} params
   */
  async addCoupon(params) {
    const result = await super.post(`/api/coupon/create`, params);
    return result.data;
  };

  /**
   * 删除优惠券
   * @param {number} id 券id
   */
  async deleteCoupon(id) {
    const result = await super.post(`/api/coupon/delete/${id}`);
    return result.data;
  };

  /**
   * 更新优惠券
   * @param {number} id 券id
   */
  async updateCoupon(id, params) {
    const result = await super.post(`/api/coupon/update/${id}`, params);
    return result.data;
  };

  /**
   * 优惠券详情
   * @param {number} id 券id
   */
  async fetchCouponDetail(id) {
    const result = await super.get(`/api/coupon/${id}`);
    return result.data;
  };

  /**
   * 优惠券领取记录
   * @param {object} params
   */
  async fetchCouponHistory(params) {
    const {
      pageNum = 1,
      pageSize = 5,
      id,
      useStatus = '',
      orderSn = ''
    } = params;
    const result = await super.get('/api/coupon/couponHistory', {
      pageNum, pageSize, couponId: id, useStatus, orderSn
    });
    return result.data;
  };

}

export default CouponModel;
