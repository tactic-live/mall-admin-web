import { uniqueId } from 'lodash';
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
  flashGoodTimeList: [],
  couponList: {},
  couponDetail: {},
  couponAddNum: 0,
  couponProductList: [],
  couponCategoryList: [],
  couponUpdateNum: 0,
  couponDeleteNum: 0,
  couponHistory: {},
  advertiseList: {},
  advertiseDetail: {},
  flashProductRelation: {},
  flashProductRelationChangeResult: false,
  flashSessionList: {
    total: 0,
    list: []
  },
  flasesessionChangeRes: 0,
  flashProductionList: {
    ...defaultPageable
  }
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
            // recommendItem.delStatus = true;
            recommendItem.id = null;
            recommendItem.recommendStatus = null;
            recommendItem.sort = null;
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
    case 'ADD_HOT_RECOMMEDN_PRODUCT':
      if (payload.length) {
        const newList = [];
        result.hotRecommendList.list.forEach((recommend) => {
          let newRecommend = recommend;
          for (let i = 0; i < payload.length; i += 1) {
            if (payload[i].productId === recommend.productId) {
              newRecommend = Object.assign(newRecommend, payload[i]);
              break;
            }
          }
          newList.push(newRecommend);
        });
        result.hotRecommendList.list = newList;
      }
      break;
    case 'FETCH_COUPON_LIST':
      result.couponList = payload;
      break;
    case 'FETCH_COUPON_DETAIL':
      result.couponDetail = payload;
      break;
    case 'ADD_COUPON':
      result.couponAddNum = payload;
      break;
    case 'COUPON_GET_PRODUCT_LIST':
      result.couponProductList = payload;
      break;
    case 'COUPON_GET_CATEGORY_LIST':
      result.couponCategoryList = payload;
      break;
    case 'UPDATE_COUPON':
      result.couponUpdateNum = payload;
      break;
    case 'COUPON_DELETE':
      result.couponDeleteNum = payload;
      break;
    case 'FETCH_COUPON_HISTORY':
      result.couponHistory = payload;
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
    case 'FETCH_ADVERTISE_DETAIL_BY_ID':
      const { pic = '' } = payload;
      const picList = [];
      if (pic) {
        picList.push({
          uid: uniqueId('pic_'),
          name: (pic || '').split('/').pop(),
          status: 'done',
          url: pic,
          thumbUrl: pic
        });
      }
      const advertiseDetail = {
        ...payload,
        picList
      }
      result.advertiseDetail = advertiseDetail;
      break;
    case 'UPDATE_UPLOAD_PIC':
      result.advertiseDetail.picList = payload;
      break;
    case 'FETCH_FLASH_TIME_LIST':
      result.flashGoodTimeList = payload;
      break;
    case 'FETCH_FLASH_PRODUCTION_RELATION':
      console.log('FETCH_FLASH_PRODUCTION_RELATION', payload)
      result.flashProductRelation = payload;
      break;
    case 'UPDATE_FLASH_PRODUCTION_RELATION':
      result.flashProductRelationChangeResult = payload;
      break;
    case 'DELECT_FLASH_PRODUCTION_RELATION':
      result.flashProductRelationChangeResult = payload;
      break;
    case 'FETCH_FLASHSESSION_LIST':
      result.flashSessionList.list = payload;
      break;
    case 'CHEANGE_FLASHSESSION':
      result.flasesessionChangeRes = payload;
      break;
    case 'SHOW_FLASH_PRODUCTION_LIST':
      result.flashProductionList = payload;
      break;

    default:
  }
  return result;
}

export default reducer;
