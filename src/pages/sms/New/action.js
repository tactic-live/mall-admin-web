import NewProductModel from '@/models/NewProductModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_NEW_PRODUCT_LIST: 'FETCH_NEW_PRODUCT_LIST'
};

/**
 * 获取新品推荐列表
 */
export async function fetchNewProductList({ pageNum, pageSize, ...res }) {
  const payload = await new NewProductModel().fetchNewProductList({ pageNum, pageSize, ...res });
  return {
    type: ACTION_TYPES.FETCH_NEW_PRODUCT_LIST,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchNewProductList: async (...args) => {
      dispatch(await fetchNewProductList(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES
}
