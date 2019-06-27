import AbstractModel from "./AbstractModel";

class ProductAttributeModel extends AbstractModel {
  async fetchAttributeById(id, type = 0, pageNum = 1, pageSize = 5) {
    const result = await super.get(`/api/productAttribute/list/${id}`, { type, pageNum, pageSize });
    return result.data;
  };

  /**
   * 获取全部属性分类
   *
   * @param {integer} pageNum
   * @param {integer} pageSize
   */
  async fetchAttributeCategory(pageNum = 1, pageSize = 5) {
    const result = await super.get(`/api/productAttribute/category`, { pageNum, pageSize });
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

  /**
   * 新增属性类型
   *
   * @param {string} name 类型名称
   */
  async createAttributeCategory(name) {
    const result = await super.post(`/api/productAttribute/category`, { name });
    return result.data;
  }

  /**
   * 删除商品属性
   *
   * @param {number} id 属性id
   */
  async deleteProductAttribute(id){
    const result = await super.delete(`/api/productAttribute/${id}`);
    return result.data;
  }
}

export default ProductAttributeModel;
