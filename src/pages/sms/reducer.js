const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  loading: true,
  newRecommendList: {
    ...defaultPageable
  },
  flashList: {
    ...defaultPageable
  },
  flashChangeResult: ''
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
    default:
  }
  return result;
}

export default reducer;
