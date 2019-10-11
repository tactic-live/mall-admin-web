import AbstractModel from "./AbstractModel";

class CouponModel extends AbstractModel {
  async fetchCouponList(condition) {
    const result = await super.get('/api/coupon/list', condition);
    return result.data;
  };

}

export default CouponModel;
