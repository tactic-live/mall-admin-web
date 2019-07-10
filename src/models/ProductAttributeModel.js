import AbstractModel from "./AbstractModel";

class ProductAttributeModel extends AbstractModel {
  async fetchAttributeById(id, type = 0, pageNum = 1, pageSize = 5) {
    const result = await super.get(`/api/productAttribute/list/${id}`, { type, pageNum, pageSize });
    return result.data;
  };

  /**
   * 根据商品分类的id获取商品属性及属性分类
   * @param {*} productCategoryId 商品分类的id
   */
  async fetchAttrInfoByProductCategoryId(productCategoryId) {
    const result = await super.get(`/api/productAttribute/attrInfo/${productCategoryId}`);
    return result.data;
  };

  /**
   * 获取全部属性分类
   *
   * @param {integer} pageNum
   * @param {integer} pageSize
   */
  async fetchAttributeCategory(pageNum = 1, pageSize = 100) {
    const result = await super.get(`/api/productAttribute/category`, { pageNum, pageSize });
    return result.data;
  };

  /**
   * 获取所有商品属性分类及其下属性
   */
  async fetchCategoryListWithAttr() {
    const result = await super.get(`/api/productAttribute/category/list/withAttr`);
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
   * 删除商品类型
   *
   * @param {string} name 类型名称
   */
  async deleteAttributeCategory(id) {
    const result = await super.delete(`/api/productAttribute/category/${id}`);
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

  /**
   * 获取商品属性
   *
   * @param {number} id 属性id
   */
  async fetchProductAttribute(id){
    const result = await super.get(`/api/productAttribute/${id}`);
    return result.data;
  }

  /**
   * 创建商品属性
   *
   * @param {object} productAttributeInfo 属性信息
   */
  async createProductAttribute(productAttributeInfo){
    const result = await super.post(`/api/productAttribute`, productAttributeInfo);
    return result.data;
  }

  /**
   * 更新商品属性
   *
   * @param {object} productAttributeInfo 属性信息
   */
  async updateProductAttribute(productAttributeInfo){
    const result = await super.put(`/api/productAttribute/${productAttributeInfo.id}`, productAttributeInfo);
    return result.data;
  }
}

export default ProductAttributeModel;
