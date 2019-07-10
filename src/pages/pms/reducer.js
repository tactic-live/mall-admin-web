const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  productListInfo: {},
  productAttrInfo: {},
  productAttrList: {
    ...defaultPageable
  },
  brandList: { ...defaultPageable },
  brandInfo: {},
  productAttributeCategoryList: [],
  productCateList: {
    ...defaultPageable
  },
  productCateInfo: {
    productAttributeIdList: [],
  },
  // 筛选属性
  productAttributeList: [],
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
    case 'FETCH_BRAND_BY_ID':
      result.brandInfo = payload;
      break;
    case 'FETCH_PRODUCT_CATE_BY_PARENT_ID':
      result.productCateList = payload;
      break;
    case 'UPDATE_PRODUCT_CATE_FOR_LIST':
      if (result.productCateList) {
        result.productCateList.list = result.productCateList.list.map(productCateInfo => {
          if (productCateInfo.id === payload.id) {
            return payload;
          }
          return productCateInfo;
        });
      }
      break;
    case 'FETCH_PRODUCT_CATE_BY_ID':
      result.productCateInfo = payload;
      break;
    case 'FETCH_CATEGORY_LIST_WITH_ATTR':
      result.productAttributeList = payload;
      break;
    default:
  }
  return result;
}

export default reducer;
