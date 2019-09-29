import NewProductModel from '@/models/NewProductModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_NEW_PRODUCT_LIST: 'FETCH_NEW_PRODUCT_LIST',
  UPDATE_NEW_PRODUCT_SORT: 'UPDATE_NEW_PRODUCT_SORT'
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

/**
 * 更新排序
 * @param {Number} id 编号
 * @param {Number} sort 排序值
 */
export async function updateNewProductSort(id, sort) {
  const payload = await new NewProductModel().updateNewProductSort(id, sort);
  return {
    type: ACTION_TYPES.UPDATE_NEW_PRODUCT_SORT,
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
    updateNewProductSort: async (...args) => {
      changeLoading(true);
      dispatch(await updateNewProductSort(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES
}
