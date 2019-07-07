import AbstractModel from "./AbstractModel";

class BrandModel extends AbstractModel {
  async fetchBrand(pageNum = 1, pageSize = 5) {
    const result = await super.get('/api/brand', { pageNum, pageSize });
    return result.data;
  }

  async fetchBrandById(id) {
    const result = await super.get(`/api/brand/${id}`);
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

  async addBrand(brandInfo) {
    const result = await super.post('/api/brand', brandInfo);
    return result.data;
  }


  async deleteBrand(id) {
    const result = await super.delete(`/api/brand/${id}`);
    return result.data;
  }

  async updateBrand(brandInfo) {
    const { id } = brandInfo;
    if (!id) {
      throw new Error('id不能为空');
    }
    const result = await super.put(`/api/brand/${id}`, brandInfo);
    return result.data;
  }


}

export default BrandModel;
