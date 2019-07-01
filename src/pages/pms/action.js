import ProductAttributeModel from '@/models/ProductAttributeModel';
import ProductActions from './Goods/action';

const { ACTION_TYPES: PRODUCT_ACTION_TYPES, ...productRest } = ProductActions;

export const ACTION_TYPES = {
  ...PRODUCT_ACTION_TYPES,
  FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST: 'FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST',
  LOADING: 'LOADING',
  PMS_CLEAR: 'PMS_CLEAR',
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
    }
  }
};

export default {
  ACTION_TYPES,
  actions
};
