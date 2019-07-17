import ProductCategoryModel from '@/models/ProductCategory';
import BrandModel from '@/models/Brand';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  ADD_BRAND: 'ADD_BRAND',
  FETCH_PRODUCT_CATEGORY_WITH_CHILDREN: 'FETCH_PRODUCT_CATEGORY_WITH_CHILDREN',
  UPDATE_BRAND: 'UPDATE_BRAND'
};

/**
 * 添加品牌
 *
 * @param {*} brandInfo 品牌信息
 */
export async function addBrand(brandInfo) {
  const payload = await new BrandModel().addBrand(brandInfo);
  return {
    type: ACTION_TYPES.ADD_BRAND,
    payload
  }
}
/**
 * 更新品牌
 *
 * @param {*} brandInfo 品牌信息
 */
export async function updateBrand(brandInfo) {
  const payload = await new BrandModel().updateBrand(brandInfo);
  return {
    type: ACTION_TYPES.UPDATE_BRAND,
    payload
  }
}

/**
 * 分页查询商品分类及子分类
 *
 */
export async function fetchProductCategoryWithChildren() {
  const payload = await new ProductCategoryModel().fetchProductCategoryWithChildren();
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_CATEGORY_WITH_CHILDREN,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading, clearState, fetchBrandList } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    clearState,
    fetchBrandList,
    addBrand: async (...args) => {
      dispatch(await addBrand(...args));
      changeLoading(false);
    },
    updateBrand: async (...args) => {
      dispatch(await updateBrand(...args));
      changeLoading(false);
    },
    fetchProductCategoryWithChildren: async (...args) => {
      dispatch(await fetchProductCategoryWithChildren(...args));
      changeLoading(false);
    },

  }
}

export default {
  ACTION_TYPES,
}
