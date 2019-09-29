import AbstractModel from "./AbstractModel";

class OrderModel extends AbstractModel {
  async fetchOrderList(condition) {
    const result = await super.get('/api/order/list', condition);
    return result.data;
  };

  /**
   * 订单详情
   * @param {number} id 
   */
  async fetchOrderDetail(id) {
    const result = await super.get(`/api/order/${id}`);
    return result.data;
  };

  /**
   * 订单s发货
   * @param {Array} orders 需要发货的订单s
   */
  async deliverOrders(orders) {
    const result = await super.post('/api/order/update/delivery', orders);
    return result.data;
  }


  /**
   * 关闭订单
   * @param {string} ids 需要关闭的订单
   * @param {string} note 理由
   */
  async closeOrders({
    ids,
    note
  }) {
    const result = await super.post('/api/order/update/close', {
      ids,
      note
    });
    return result.data;
  }


}

export default OrderModel;
