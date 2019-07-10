import ProductCategoryModel from '@/models/ProductCategory';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_PRODUCT_CATE_BY_PARENT_ID: 'FETCH_PRODUCT_CATE_BY_PARENT_ID',
  UPDATE_PRODUCT_CATE_FOR_LIST: 'UPDATE_PRODUCT_CATE_FOR_LIST',
};

/**
 *
 * 分页查询商品分类
 *
 * @param {number} parentId 父id, 0: 顶级
 * @param {*} pageNum
 * @param {*} pageSize
 */
export async function fetchProductCategoryByParentId(parentId, pageNum = 1, pageSize = 5) {
  const payload = await new ProductCategoryModel().fetchProductCategoryByParentId(parentId, pageNum, pageSize);
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_CATE_BY_PARENT_ID,
    payload
  }
}

/**
 * 更新商品分类信息
 *
 * @param {object} productCategoryInfo 商品分类信息
 */
export async function updateProductCategory(productCategoryInfo) {
  await new ProductCategoryModel().updateProductCategory(productCategoryInfo);
  return {
    type: ACTION_TYPES.UPDATE_PRODUCT_CATE,
    payload: productCategoryInfo
  }
}

/**
 * 部分更新商品分类信息
 *
 * @param {object} productCategoryInfo 商品分类信息
 */
export async function updateProductCategoryPart(productCategoryInfo) {
  const { id } = productCategoryInfo;
  const model = new ProductCategoryModel();
  const foundProductCategoryInfo = await model.fetchProductCategoryById(id);
  let _count = 0;
  // 更新
  let updateProductCategoryInfo = foundProductCategoryInfo;
  if (foundProductCategoryInfo) {
    // 更新
    updateProductCategoryInfo = {
      ...foundProductCategoryInfo,
      ...productCategoryInfo
    };
    _count = await new ProductCategoryModel().updateProductCategory(updateProductCategoryInfo);
  }

  return {
    type: ACTION_TYPES.UPDATE_PRODUCT_CATE_FOR_LIST,
    payload: { ...updateProductCategoryInfo, _count }
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchAll: async (...args) => {
      dispatch(await fetchProductCategoryByParentId(...args));
      changeLoading(false);
    },
    async updateProductCategoryPart(...args) {
      dispatch(await updateProductCategoryPart(...args));
      changeLoading(false);
    },
    // async deleteAttributeCategory(...args) {
    //   changeLoading(false);
    //   dispatch(await deleteAttributeCategory(...args));
    // }
  }
}

export default {
  ACTION_TYPES,
  fetchProductCategoryByParentId,
  updateProductCategoryPart
}
