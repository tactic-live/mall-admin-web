const INIT_STATE = {
  productListInfo: {},
  productAttrInfo: {},
  productAttrList: {
    list: []
  },
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
    default:
  }
  return result;
}

export default reducer;
