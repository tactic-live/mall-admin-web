import ProductModel from '@/models/ProductModel';
import ProductCategoryModel from '@/models/ProductCategory';
import BrandModel from '@/models/Brand';
import SubjectModel from '@/models/SubjectModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  ADD_BRAND: 'ADD_BRAND',
  FETCH_PRODUCT_CATEGORY_WITH_CHILDREN: 'FETCH_PRODUCT_CATEGORY_WITH_CHILDREN',
  UPDATE_BRAND: 'UPDATE_BRAND',
  FETCH_SUBJECT_LIST: 'FETCH_SUBJECT_LIST',
  ADD_PRODUCT: 'ADD_PRODUCT'
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

/**
 * 获取专题列表
 */
export async function fetchSubjectList() {
  const payload = await new SubjectModel().fetchSubjectList();
  return {
    type: ACTION_TYPES.FETCH_SUBJECT_LIST,
    payload
  }
}

/**
 * 增加商品
 * @param {Object} product 商品
 */
export async function addProduct(product) {
  const payload = await new ProductModel().addGoods(product);
  return {
    type: ACTION_TYPES.ADD_PRODUCT,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading, clearState, fetchBrandList, fetchAllAttributeCategory } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    clearState,
    fetchBrandList,
    fetchAllAttributeCategory,
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
    fetchSubjectList: async (...args) => {
      dispatch(await fetchSubjectList(...args));
      changeLoading(false);
    },
    addProduct: async (...args) => {
      dispatch(await addProduct(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
}
