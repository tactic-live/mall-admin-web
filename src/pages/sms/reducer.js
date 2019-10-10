const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  loading: true,
  newRecommendList: {
    ...defaultPageable
  },
  flashList: {
    ...defaultPageable
  },
  flashChangeResult: '',
  hotRecommendList: {},
  couponList: {}
}

function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  let result = { ...state };
  console.log('payload', payload)
  switch (type) {
    case 'LOADING':
      result.loading = payload;
      break;
    // 获取新品推荐列表
    case 'FETCH_NEW_PRODUCT_LIST':
      result.newRecommendList = payload;
      break;
    case 'FETCH_FLASH_LIST':
      result.flashList = payload;
      break;
    case 'UPDATE_FLASH_LIST':
      result.flashChangeResult = payload;
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
    case 'UPDATE_HOT_RECOMMEND_PRODUCT_SORT':
      if (payload.updateResult && result.hotRecommendList) {
        const { id, sort } = payload;
        result.hotRecommendList.list = result.hotRecommendList.list.map(recommendItem => {
          if (recommendItem.id === id) {
            recommendItem.sort = sort;
          }
          return recommendItem;
        });
      }
      break;
    // 更新新品推荐推荐状态
    case 'UPDATE_NEW_PRODUCT_RECOMMEND_STATUS':
      if (payload.count) {
        const { ids, recommendStatus } = payload;
        const newList = [];
        result.newRecommendList.list.forEach((recommend) => {
          let newRecommend = recommend;
          if (ids.indexOf(newRecommend.id) > -1) {
            newRecommend.recommendStatus = recommendStatus;
          }
          newList.push(newRecommend);
        });
        result.newRecommendList.list = newList;
      }
      break;
    // 更新新品推荐排序
    case 'UPDATE_NEW_PRODUCT_SORT':
      if (payload.count) {
        const { id, sort } = payload;
        const newList = [];
        result.newRecommendList.list.forEach((recommend) => {
          let newRecommend = recommend;
          if (newRecommend.id === id) {
            newRecommend.sort = sort;
          }
          newList.push(newRecommend);
        });
        result.newRecommendList.list = newList;
      }
      break;
    // 删除新品推荐
    case 'DELETE_NEW_PRODUCTS':
      if (payload.count) {
        const { ids } = payload;
        const newList = [];
        result.newRecommendList.list.forEach((recommend) => {
          let newRecommend = recommend;
          if (ids.indexOf(newRecommend.id) > -1) {
            newRecommend.isDel = true;
          }
          newList.push(newRecommend);
        });
        result.newRecommendList.list = newList;
      }
      break;
    case 'FETCH_COUPON_LIST':
      result.couponList = payload;
      break;
    default:
  }
  return result;
}

export default reducer;
