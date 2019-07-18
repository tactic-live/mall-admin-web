import ProductCategoryModel from '@/models/ProductCategory';
import ProductAttributeModel from '@/models/ProductAttributeModel';
import { fetchProductCategoryByParentId } from '../ProductCate/action';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  ADD_PRODUCT_CATE: 'ADD_PRODUCT_CATE',
  FETCH_PRODUCT_CATE_BY_ID: 'FETCH_PRODUCT_CATE_BY_ID',
  UPDATE_PRODUCT_CATE: 'UPDATE_PRODUCT_CATE',
  FETCH_CATEGORY_LIST_WITH_ATTR: 'FETCH_CATEGORY_LIST_WITH_ATTR'
};

/**
 * 添加商品属性分类
 *
 * @param {*} categoryInfo 商品属性分类信息
 */
export async function addProductCategory(categoryInfo) {
  const payload = await new ProductCategoryModel().addProductCategory(categoryInfo);
  return {
    type: ACTION_TYPES.ADD_PRODUCT_CATE,
    payload
  }
}
/**
 * 更新商品属性分类
 *
 * @param {*} categoryInfo 商品属性分类信息
 */
export async function updateProductCate(categoryInfo) {
  const model = new ProductCategoryModel();
  const payload = await model.updateProductCategory(categoryInfo);
  return {
    type: ACTION_TYPES.UPDATE_PRODUCT_CATE,
    payload
  }
}

/**
 * 获取所有商品属性分类及其下属性
 */
export async function fetchCategoryListWithAttr() {
  const payload = await new ProductAttributeModel().fetchCategoryListWithAttr();
  return {
    type: ACTION_TYPES.FETCH_CATEGORY_LIST_WITH_ATTR,
    payload
  }
}

/**
 * 获取品牌信息
 *
 * @param {number} id 品牌id
 */
export async function fetchProductCategoryById(id) {
  const brandInfo = await new ProductCategoryModel().fetchProductCategoryById(id);
  const productAttributeIdList = await new ProductAttributeModel().fetchAttrInfoByProductCategoryId(id);
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_CATE_BY_ID,
    payload: {
      ...brandInfo,
      productAttributeIdList
    }
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading, clearState } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    clearState,
    addProductCategory: async (...args) => {
      dispatch(await addProductCategory(...args));
      changeLoading(false);
    },
    updateProductCate: async (categoryInfo) => {
      (await updateProductCate(categoryInfo));
      dispatch(await fetchProductCategoryById(categoryInfo.id));
      changeLoading(false);
    },
    fetchProductCategoryById: async (...args) => {
      dispatch(await fetchProductCategoryById(...args));
      changeLoading(false);
    },
    fetchCategoryListWithAttr: async (...args) => {
      dispatch(await fetchCategoryListWithAttr(...args));
      changeLoading(false);
    },
    fetchProductCategoryByParentId: async (...args) => {
      dispatch(await fetchProductCategoryByParentId(...args));
      changeLoading(false);
    },

  }
}

export default {
  ACTION_TYPES,
  updateProductCate
}
