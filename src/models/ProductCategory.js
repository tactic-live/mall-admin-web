import AbstractModel from "./AbstractModel";

class ProductCategoryModel extends AbstractModel {
  /**
   * 分页查询商品分类
   *
   * @param {number} parentId 父id, 0: 顶级
   * @param {*} pageNum
   * @param {*} pageSize
   */
  async fetchProductCategoryByParentId(parentId = 0, pageNum = 1, pageSize = 5) {
    const result = await super.get(`/api/productCategory`, { parentId, pageNum, pageSize });
    return result.data;
  };
  /**
   * 获取商品分类信息
   *
   * @param {number} id
   */
  async fetchProductCategoryById(id) {
    const result = await super.get(`/api/productCategory/${id}`);
    return result.data;
  };

  /**
   * 更新商品分类信息
   *
   * @param {object} productCategoryInfo 商品分类信息
   */
  async updateProductCategory(productCategoryInfo){
    const result = await super.put(`/api/productCategory/${productCategoryInfo.id}`, productCategoryInfo);
    return result.data;
  }

  /**
   * 添加商品分类信息
   *
   * @param {object} productCategoryInfo 商品分类信息
   */
  async addProductCategory(productCategoryInfo){
    const result = await super.post(`/api/productCategory`, productCategoryInfo);
    return result.data;
  }
}

export default ProductCategoryModel;
