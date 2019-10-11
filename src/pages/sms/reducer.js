const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  loading: true,
  brandList: {
    ...defaultPageable
  },
  newRecommendList: {
    ...defaultPageable
  },
  flashList: {
    ...defaultPageable
  },
  flashChangeResult: '',
  hotRecommendList: {},
  couponList: {},
  advertiseList: {}
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
    // 新增新品推荐
    case 'ADD_RECOMMEND_NEW_PRODUCT':
      if (payload.length) {
        const newList = [];
        result.newRecommendList.list.forEach((recommend) => {
          let newRecommend = recommend;
          for (let i = 0; i < payload.length; i += 1) {
            if (payload[i].productId === recommend.productId) {
              newRecommend = Object.assign(newRecommend, payload[i]);
              break;
            }
          }
          newList.push(newRecommend);
        });
        result.newRecommendList.list = newList;
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
            newRecommend.id = null;
            newRecommend.recommendStatus = null;
            newRecommend.sort = null;
          }
          newList.push(newRecommend);
        });
        result.newRecommendList.list = newList;
      }
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
    case 'FETCH_COUPON_LIST':
      result.couponList = payload;
      break;
    case 'FETCH_ADVERTISE_LIST':
      result.advertiseList = payload;
      break;
    case 'UPDATE_ADVERTISE_STATUS':
      if (payload.updateStatus) {
        const { id, status } = payload;
        const newList = [];
        result.advertiseList.list.forEach((advertiseItem) => {
          let newAdvertiseItem = advertiseItem;
          if (newAdvertiseItem.id === id) {
            newAdvertiseItem.status = status;
          }
          newList.push(newAdvertiseItem);
        });
        result.advertiseList.list = newList;
      }
      break;
    case 'DELETE_ADVERTISE_BY_ID':
      if (payload.deleteStatus) {
        const { ids } = payload;
        const newList = [];
        result.advertiseList.list.forEach((advertiseItem) => {
          let newAdvertiseItem = advertiseItem;
          if (ids.indexOf(newAdvertiseItem.id) > -1) {
            newAdvertiseItem.delStatus = true;
          }
          newList.push(newAdvertiseItem);
        });
        result.advertiseList.list = newList;
      }
      break;
    // 获取品牌推荐列表
    case 'FETCH_BRAND_LIST':
      result.brandList = payload;
      break;
    // 新增品牌推荐
    case 'ADD_RECOMMEND_BRANDS':
      if (payload.length) {
        const newList = [];
        result.brandList.list.forEach((recommend) => {
          let newRecommend = recommend;
          for (let i = 0; i < payload.length; i += 1) {
            if (payload[i].brandId === recommend.brandId) {
              newRecommend = Object.assign(newRecommend, payload[i]);
              break;
            }
          }
          newList.push(newRecommend);
        });
        result.brandList.list = newList;
      }
      break;
    // 更新品牌推荐推荐状态
    case 'UPDATE_BRAND_RECOMMEND_STATUS':
      if (payload.count) {
        const { ids, recommendStatus } = payload;
        const newList = [];
        result.brandList.list.forEach((recommend) => {
          let newRecommend = recommend;
          if (ids.indexOf(newRecommend.id) > -1) {
            newRecommend.recommendStatus = recommendStatus;
          }
          newList.push(newRecommend);
        });
        result.brandList.list = newList;
      }
      break;
    // 更新品牌推荐排序
    case 'UPDATE_BRAND_SORT':
      if (payload.count) {
        const { id, sort } = payload;
        const newList = [];
        result.brandList.list.forEach((recommend) => {
          let newRecommend = recommend;
          if (newRecommend.id === id) {
            newRecommend.sort = sort;
          }
          newList.push(newRecommend);
        });
        result.brandList.list = newList;
      }
      break;
    // 删除品牌推荐
    case 'DELETE_BRANDS':
      if (payload.count) {
        const { ids } = payload;
        const newList = [];
        result.brandList.list.forEach((recommend) => {
          let newRecommend = recommend;
          if (ids.indexOf(newRecommend.id) > -1) {
            newRecommend.id = null;
            newRecommend.recommendStatus = null;
            newRecommend.sort = null;
          }
          newList.push(newRecommend);
        });
        result.brandList.list = newList;
      }
      break;
    default:
  }
  return result;
}

export default reducer;
