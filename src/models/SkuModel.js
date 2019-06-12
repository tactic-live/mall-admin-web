import AbstractModel from "./AbstractModel";

class SkuModel extends AbstractModel {
  async fetchSkusByProductId(pid) {
    const result = await super.get('/api/sku', { pid });
    return result.data;
  };
}

export default SkuModel;
