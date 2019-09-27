import RecommendProductModel from '@/models/RecommendProductModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_HOT_RECOMMEND_PRODUCT_LIST: 'FETCH_HOT_RECOMMEND_PRODUCT_LIST',
  UPDATE_HOT_RECOMMEND_PRODUCT_STATUS: 'UPDATE_HOT_RECOMMEND_PRODUCT_STATUS',
  DELETE_HOT_RECOMMEND_PRODUCT: 'DELETE_HOT_RECOMMEND_PRODUCT'
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
  // console.log('hhhhhhhhhh', ids, recommendStatus)
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

export async function deleteHotRecommendProduct(ids) {
  const deleteResult = await new RecommendProductModel().deleteHotRecommendProduct(ids);
  return {
    type: ACTION_TYPES.DELETE_HOT_RECOMMEND_PRODUCT,
    payload: deleteResult
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
    }
  }
}

export default {
  ACTION_TYPES,
  fetchHotRecommendProductList,
  updateHotRecommendStatus,
  deleteHotRecommendProduct
}
