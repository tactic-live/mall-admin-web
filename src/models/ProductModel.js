import AbstractModel from "./AbstractModel";

class ProductModel extends AbstractModel {
  async fetchGoodsByCondition(condition) {
    console.log('fetchGoodsByCondition',condition)
    const result = await super.get('/api/product/list', condition);
    return result.data;
  };
}

export default ProductModel;
