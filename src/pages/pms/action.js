import ProductAttributeModel from '@/models/ProductAttributeModel';
import BrandModel from '@/models/Brand';


export const ACTION_TYPES = {
  FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST: 'FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST',
  LOADING: 'LOADING',
  PMS_CLEAR: 'PMS_CLEAR',
  FETCH_BRAND_LIST: 'FETCH_BRAND_LIST',
}

export async function wrapLoading(func) {
  await func.apply(this, arguments);

}

export async function fetchAllAttributeCategory() {
  const payload = await new ProductAttributeModel().fetchAttributeCategory();
  return {
    type: ACTION_TYPES.FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST,
    payload
  }
}

/**
 * 获取品牌列表
 *
 */
export async function fetchBrandList(pageNum = 1, pageSize = 10) {
  const payload = await new BrandModel().fetchBrand(pageNum, pageSize);
  return {
    type: ACTION_TYPES.FETCH_BRAND_LIST,
    payload
  }
}

export const actions = (dispatch, ownProps) => {
  return {
    changeLoading: (isLoading) => {
      dispatch({
        type: ACTION_TYPES.LOADING,
        payload: isLoading
      })
    },
    clearState: (name, value) => {
      dispatch({
        type: ACTION_TYPES.PMS_CLEAR,
        payload: { name, value }
      })
    },
    fetchAllAttributeCategory: async () => {
      const action = await fetchAllAttributeCategory();
      dispatch(action);
    },
    fetchBrandList: async (...args) => {
      const action = await fetchBrandList(...args);
      dispatch(action);
    }
  }
};

export default {
  ACTION_TYPES,
  actions
};
