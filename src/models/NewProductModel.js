import AbstractModel from "./AbstractModel";

class NewProductModel extends AbstractModel {
  /**
   * 获取新品推荐列表
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 每页查询数量
   */
  async fetchNewProductList({ pageNum = 1, pageSize = 5, ...res }) {
    const result = await super.get('/api/home/newProduct/list', { pageNum, pageSize, ...res });
    return result.data;
  };

  /**
   * 新增新品推荐
   * @param {Array} productList 商品列表
   */
  async addRecommendNewProduct(productList) {
    const result = await super.post('/api/home/newProduct', productList);
    return result.data;
  };

  /**
   * 更新推荐状态
   * @param {Array} ids 编号列表
   * @param {Number} recommendStatus 推荐状态 0-未推荐 1-推荐中
   */
  async updateNewProductRecommendStatus(ids, recommendStatus) {
    const result = await super.patch(`/api/home/newProduct/recommendStatus`, { ids, recommendStatus });
    return result.data;
  }

  /**
   * 更新排序
   * @param {Number} id 编号
   * @param {Number} sort 排序值
   */
  async updateNewProductSort(id, sort) {
    const result = await super.put(`/api/home/newProduct/sort`, { id, sort });
    return result.data;
  }

  /**
   * 删除新品推荐s
   * @param {Array} ids 编号列表
   */
  async deleteNewProducts(ids) {
    const result = await super.delete(`/api/home/newProduct`, { ids });
    return result.data;
  }
}

export default NewProductModel;
