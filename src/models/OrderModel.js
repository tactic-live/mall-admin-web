import AbstractModel from "./AbstractModel";

class OrderModel extends AbstractModel {
  async fetchOrderList(condition) {
    const result = await super.get('/api/order/list', condition);
    return result.data;
  };
}

export default OrderModel;
