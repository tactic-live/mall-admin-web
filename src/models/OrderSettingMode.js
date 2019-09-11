import AbstractModel from "./AbstractModel";

class OrderSettingMode extends AbstractModel {
  async fetchOrderSetting(id) {
    const result = await super.get(`/api/orderSetting/${id}`);
    console.log('fetchOrderSetting',result,result.data)
    return result.data;
  };

  async updatehOrderSetting({ id, condition }) {
    const url = `/api/orderSetting/update/${id}`;
    const result = await super.post(url, {...condition});
    return result;
  };
}

export default OrderSettingMode;
