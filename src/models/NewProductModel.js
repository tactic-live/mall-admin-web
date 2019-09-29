import AbstractModel from "./AbstractModel";

class NewProductModel extends AbstractModel {
  // 获取新品推荐列表
  async fetchNewProductList({ pageNum = 1, pageSize = 5, ...res }) {
    const result = await super.get('/api/home/newProduct/list', { pageNum, pageSize, ...res });
    return result.data;
  };

  /**
   * 更新排序
   * @param {Number} id 编号
   * @param {Number} sort 排序值
   */
  async updateNewProductSort(id, sort) {
    const result = await super.put(`/api/home/newProduct/sort`, { id, sort });
    return result.data;
  }
}

export default NewProductModel;
