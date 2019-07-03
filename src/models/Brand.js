import AbstractModel from "./AbstractModel";

class BrandModel extends AbstractModel {
  async fetchBrand(pageNum = 1, pageSize = 5) {
    const result = await super.get('/api/brand', { pageNum, pageSize });
    return result.data;
  }

  async updateFactoryStatus(ids, factoryStatus) {
    const result = await super.patch('/api/brand/batch/factoryStatus', { ids, factoryStatus });
    return result.data;
  }

  async updateShowStatus(ids, showStatus) {
    const result = await super.patch('/api/brand/batch/showStatus', { ids, showStatus });
    return result.data;
  }


}

export default BrandModel;
