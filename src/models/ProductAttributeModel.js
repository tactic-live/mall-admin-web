import AbstractModel from "./AbstractModel";

class ProductAttributeModel extends AbstractModel {
  async fetchAttributeById(id) {
    const result = await super.get(`/api/productAttribute/list/${id}`, { type: 0 });
    return result.data && result.data.list;
  };
}

export default ProductAttributeModel;
