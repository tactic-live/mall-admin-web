import AbstractModel from "./AbstractModel";

class AddFlashProductModel extends AbstractModel {
  async fetchProductList({ pageNum = 1, pageSize = 5, keyword }) {
    const result = await super.get('/api/product/list', { pageNum, pageSize, keyword });
    console.log('login', result);
    return result.data;
  };

  async addProductList(params) {
    const result = await super.post('/api/flashProductRelation/create', [...params]);
    console.log('addProductList', result);
    return result.data;
  };

}

export default AddFlashProductModel;
