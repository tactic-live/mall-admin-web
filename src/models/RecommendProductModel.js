import AbstractModel from "./AbstractModel";

class RecommendProductModel extends AbstractModel {
  /**
   * 获取人气推荐商品列表
   */
  async fetchHotRecommendList({ pageNum = 1, pageSize = 5, ...res }) {
    const result = await super.get('/api/home/recommendProduct/list', { pageNum, pageSize, ...res });
    return result.data;
  };

  /**
   * 更改人气推荐商品状态
   * @param {Array} ids id集合
   * @param {Integer} recommendStatus 更改状态
   */
  async updataHotRecommentStatus({ ids = [], recommendStatus }) {
    const result = await super.patch('/api/home/recommendProduct/recommendStatus', { ids, recommendStatus });
    return result.data;
  }

  /**
   * 删除人气推荐商品
   * @param {Array} ids 商品id
   */
  async deleteHotRecommendProduct(ids) {
    const result = await super.delete('/api/home/recommendProduct/delete', { ids });
    return result.data;
  }

  /**
   * 修改人气推荐商品排序
   * @param {Object} {
   * {Integer} sort 排序值
   * {Integer} id id
   * }
   */
  async updateHotRecommendProductSort({ sort, id }) {
    const result = await super.patch('/api/home/recommendProduct/sort', { sort, id });
    return result.data;
  }

  /**
   * 新增人气推荐商品
   */
  async addHotRecommendProduct(productList) {
    const result = await super.post('/api/home/recommendProduct', productList);
    return result.data;
  }
}

export default RecommendProductModel;
