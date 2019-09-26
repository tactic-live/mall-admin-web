import AbstractModel from "./AbstractModel";

class NewProductModel extends AbstractModel {
  async fetchNewProductList({ pageNum = 1, pageSize = 5, ...res }) {
    const result = await super.get('/api/home/newProduct/list', { pageNum, pageSize, ...res });
    return result.data;
  };
}

export default NewProductModel;
