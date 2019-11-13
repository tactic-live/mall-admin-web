import RecommendProductModel from '@/models/RecommendProductModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_HOT_RECOMMEND_PRODUCT_LIST: 'FETCH_HOT_RECOMMEND_PRODUCT_LIST',
  UPDATE_HOT_RECOMMEND_PRODUCT_STATUS: 'UPDATE_HOT_RECOMMEND_PRODUCT_STATUS',
  DELETE_HOT_RECOMMEND_PRODUCT: 'DELETE_HOT_RECOMMEND_PRODUCT',
  UPDATE_HOT_RECOMMEND_PRODUCT_SORT: 'UPDATE_HOT_RECOMMEND_PRODUCT_SORT',
  ADD_HOT_RECOMMEDN_PRODUCT: 'ADD_HOT_RECOMMEDN_PRODUCT'
}

/**
 * 获取人气推荐列表
 */
export async function fetchHotRecommendProductList({ pageNum, pageSize, ...res }) {
  const payload = await new RecommendProductModel().fetchHotRecommendList({ pageNum, pageSize, ...res });
  return {
    type: ACTION_TYPES.FETCH_HOT_RECOMMEND_PRODUCT_LIST,
    payload
  }
}

/**
 * 更改人气推荐商品状态
 */
export async function updateHotRecommendStatus({ ids = [], recommendStatus }) {
  const updateResult = await new RecommendProductModel().updataHotRecommentStatus({ ids, recommendStatus });
  return {
    type: ACTION_TYPES.UPDATE_HOT_RECOMMEND_PRODUCT_STATUS,
    payload: {
      ids,
      recommendStatus,
      updateResult
    }
  }
}

/**
 *  删除人气商品
 * @param {Array} ids
 */
export async function deleteHotRecommendProduct(ids) {
  const deleteResult = await new RecommendProductModel().deleteHotRecommendProduct(ids);
  return {
    type: ACTION_TYPES.DELETE_HOT_RECOMMEND_PRODUCT,
    payload: {
      ids,
      deleteResult
    }
  }
}

/**
 * 更改人气推荐商品排序
 */
export async function updateHotRecommendProductSort({ sort, id }) {
  const updateResult = await new RecommendProductModel().updateHotRecommendProductSort({ sort, id })
  return {
    type: ACTION_TYPES.UPDATE_HOT_RECOMMEND_PRODUCT_SORT,
    payload: {
      id,
      sort,
      updateResult
    }
  }
}

export async function addHotRecommendProduct(productList) {
  const addResult = await new RecommendProductModel().addHotRecommendProduct(productList);
  return {
    type: ACTION_TYPES.ADD_HOT_RECOMMEDN_PRODUCT,
    payload: addResult
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchHotRecommendProductList: async (...args) => {
      dispatch(await fetchHotRecommendProductList(...args));
      changeLoading(false);
    },
    updateHotRecommendStatus: async (...args) => {
      dispatch(await updateHotRecommendStatus(...args));
      changeLoading(false);
    },
    deleteHotRecommendProduct: async (...args) => {
      dispatch(await deleteHotRecommendProduct(...args));
      changeLoading(false);
    },
    updateHotRecommendProductSort: async (...args) => {
      dispatch(await updateHotRecommendProductSort(...args));
      changeLoading(false);
    },
    addHotRecommendProduct: async (...args) => {
      dispatch(await addHotRecommendProduct(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchHotRecommendProductList,
  updateHotRecommendStatus,
  deleteHotRecommendProduct,
  updateHotRecommendProductSort,
  addHotRecommendProduct
}
