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
    const result = await super.put('/api/home/recommendProduct/recommendStatus', { ids, recommendStatus });
    return result.data;

  }
}

export default RecommendProductModel;
