const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  loading: true,
  newRecommendList: {
    ...defaultPageable
  },
  hotRecommendList: {}
}

function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  let result = { ...state };
  switch (type) {
    case 'LOADING':
      result.loading = payload;
      break;
    // 获取新品推荐列表
    case 'FETCH_NEW_PRODUCT_LIST':
      result.newRecommendList = payload;
      break;
    case 'FETCH_HOT_RECOMMEND_PRODUCT_LIST':
      result.hotRecommendList = payload;
      break;
    case 'UPDATE_HOT_RECOMMEND_PRODUCT_STATUS':
      if (payload.updateResult && result.hotRecommendList) {
        const { recommendStatus, ids } = payload;
        result.hotRecommendList.list = result.hotRecommendList.list.map(recommendItem => {
          const idIndex = ids.findIndex(idItem => recommendItem.id === idItem);
          if (idIndex > -1) {
            recommendItem.recommendStatus = recommendStatus;
          }
          return recommendItem;
        });
      }
      break;
    case 'DELETE_HOT_RECOMMEND_PRODUCT':
      if (payload.deleteResult && result.hotRecommendList) {
        const { ids } = payload;
        result.hotRecommendList.list = result.hotRecommendList.list.map(recommendItem => {
          const idIndex = ids.findIndex(idItem => recommendItem.id === idItem);
          if (idIndex > -1) {
            recommendItem.delStatus = true;
          }
          return recommendItem;
        });
      }
      break;
    default:
  }
  return result;
}

export default reducer;
