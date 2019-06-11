import AbstractModel from "./AbstractModel";

class GoodsModel extends AbstractModel {
  async fetchGoodsByCondition(condition) {
    const result = await super.get('/api/product/list', condition);
    return result.data;
  };
}

export default GoodsModel;
