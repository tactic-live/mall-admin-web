import NewProductModel from '@/models/NewProductModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_NEW_PRODUCT_LIST: 'FETCH_NEW_PRODUCT_LIST',
  UPDATE_NEW_PRODUCT_RECOMMEND_STATUS: 'UPDATE_NEW_PRODUCT_RECOMMEND_STATUS',
  UPDATE_NEW_PRODUCT_SORT: 'UPDATE_NEW_PRODUCT_SORT',
  DELETE_NEW_PRODUCTS: 'DELETE_NEW_PRODUCTS'
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
 * 更新推荐状态
 * @param {Array} ids 编号列表
 * @param {Number} recommendStatus 推荐状态 0-未推荐 1-推荐中
 */
export async function updateNewProductRecommendStatus(ids, recommendStatus) {
  const payload = await new NewProductModel().updateNewProductRecommendStatus(ids, recommendStatus);
  return {
    type: ACTION_TYPES.UPDATE_NEW_PRODUCT_RECOMMEND_STATUS,
    payload: {
      ids,
      recommendStatus,
      count: payload
    }
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
    payload: {
      id,
      sort,
      count: payload
    }
  }
}

/**
 * 删除推荐
 * @param {Array} ids 编号s
 */
export async function deleteNewProducts(ids) {
  const payload = await new NewProductModel().deleteNewProducts(ids);
  return {
    type: ACTION_TYPES.DELETE_NEW_PRODUCTS,
    payload: {
      ids,
      count: payload
    }
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
    updateNewProductRecommendStatus: async (...args) => {
      changeLoading(true);
      dispatch(await updateNewProductRecommendStatus(...args));
      changeLoading(false);
    },
    updateNewProductSort: async (...args) => {
      changeLoading(true);
      dispatch(await updateNewProductSort(...args));
      changeLoading(false);
    },
    deleteNewProducts: async (...args) => {
      changeLoading(true);
      dispatch(await deleteNewProducts(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES
}
