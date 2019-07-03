const INIT_STATE = {
  productListInfo: {},
  productAttrInfo: {},
  productAttrList: {
    list: []
  },
  brandList: { total: 0, current: 1, pageSize: 10, list: [] },
  productAttributeCategoryList: [],
  loading: true
}

function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  const result = { ...state };
  switch (type) {
    case 'FETCH_GOODS_BY_CONDITION':
      result.productListInfo = payload;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE_CATEGORY':
      result.productAttrList = payload;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE_LIST_BY_ID':
      result.productAttrList = payload;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE':
      result.productAttrInfo = payload;
      break;
    case 'UPDATE_PRODUCT_ATTRIBUTE_CATEGORY':
      result.productAttrList.list = result.productAttrList.list.map(attr => {
        if (attr.id === payload.id) {
          attr.name = payload.name;
        }
        return attr;
      });
      break;
    case 'FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST':
      result.productAttributeCategoryList = payload.list;
      break;
    case 'PMS_CLEAR':
      result[payload.name] = payload.value;
      break;
    case 'LOADING':
      result.loading = payload;
      break;
    case 'FETCH_BRAND':
      result.brandList = payload;
      break;
    case 'UPDATE_FACTORY_STATUS':
    case 'UPDATE_SHOW_STATUS':
      result.brandList.list = state.brandList.list.map(brandInfo => {
        let { factoryStatus, showStatus } = brandInfo;
        const {
          ids = [],
          factoryStatus: inFactoryStatus = factoryStatus,
          showStatus: inShowStatus = showStatus
        } = payload;
        const foundBrandInfo = ids.find(id => id === brandInfo.id);
        if (foundBrandInfo) {
          factoryStatus = inFactoryStatus;
          showStatus = inShowStatus;
        }
        return {
          ...brandInfo,
          factoryStatus,
          showStatus
        };
      });
      break;
    default:
  }
  return result;
}

export default reducer;
