import AbstractModel from "./AbstractModel";

class ProductAttributeModel extends AbstractModel {
  async fetchAttributeById(id) {
    const result = await super.get(`/api/productAttribute/list/${id}`, { type: 0 });
    return result.data && result.data.list;
  };

  /**
   * 获取全部属性分类
   *
   * @param {integer} pageNumm
   * @param {integer} pageSize
   */
  async fetchAttributeCategory(pageNumm = 1, pageSize = 5) {
    const result = await super.get(`/api/productAttribute/category`, { pageNumm, pageSize });
    return result.data;
  };

  /**
   * 更新属性类型
   *
   * @param {string} id 类型id
   * @param {string} name 类型名称
   */
  async updateAttributeCategory(id, name) {
    const result = await super.patch(`/api/productAttribute/category/${id}`, { name });
    return result.data;
  }
}

export default ProductAttributeModel;
