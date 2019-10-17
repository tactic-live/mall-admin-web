import AbstractModel from "./AbstractModel";

class BrandModel extends AbstractModel {
  /**
   * 获取品牌推荐列表
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 每页查询数量
   */
  async fetchBrandList({ pageNum = 1, pageSize = 5, ...res }) {
    const result = await super.get('/api/home/brand', { pageNum, pageSize, ...res });
    return result.data;
  };

  /**
   * 新增品牌推荐
   * @param {Array} brandList 品牌列表
   */
  async addRecommendBrands(brandList) {
    const result = await super.post('/api/home/brand', brandList);
    return result.data;
  };

  /**
   * 更新推荐状态
   * @param {Array} ids 编号列表
   * @param {Number} recommendStatus 推荐状态 0-未推荐 1-推荐中
   */
  async updateBrandRecommendStatus(ids, recommendStatus) {
    const result = await super.patch(`/api/home/brand/recommendStatus`, { ids, recommendStatus });
    return result.data;
  }

  /**
   * 更新排序
   * @param {Number} id 编号
   * @param {Number} sort 排序值
   */
  async updateBrandSort(id, sort) {
    const result = await super.put(`/api/home/brand/sort`, { id, sort });
    return result.data;
  }

  /**
   * 删除新品推荐s
   * @param {Array} ids 编号列表
   */
  async deleteBrands(ids) {
    const result = await super.delete(`/api/home/brand`, { ids });
    return result.data;
  }
}

export default BrandModel;
