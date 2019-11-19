import moment from 'moment';

const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  productInfo: {
    // 分类
    productCategoryId: [],
    // 商品介绍
    description: '',
    // 商品货号
    productSn: '',
    // 商品售价
    price: 0,
    // 市场价
    originalPrice: 0,
    // 库存
    stock: 0,
    // 计量单位
    unit: '',
    // 重量
    weight: 0,
    // 排序
    sort: 0,

    // 赠送积分
    giftPoint: 0,
    // 赠送成长值
    giftGrowth: 0,
    // 积分购买限制
    usePointLimit: 0,
    // 预告商品
    previewStatus: false,
    // 商品上架
    publishStatus: false,
    // 商品推荐
    recommandStatus: false,
    // 新品推荐
    newStatus: false,
    // 服务保证
    serviceIds: [],
    // 详细页标题
    detailTitle: '',
    // 详细页描述
    detailDesc: '',
    // 商品关键字
    keywords: '',
    // 商品备注
    note: '',

    // 属性类型
    productAttributeCategoryId: 0,
    // 商品主图
    pic: '',
    // 商品相册图
    albumPics: '',

    // 活动限购数量
    promotionPerLimit: 0,

    promotionType: '0',
    // 阶梯价格
    productLadderList: [
      {
        // id: 69,
        // productId: 26,
        count: 0,
        discount: 0.00,
        price: 0.00
      }
    ],
    // 满减价格
    productFullReductionList: [
      {
        // id: 64,
        // productId: 26,
        fullPrice: 0.00,
        reducePrice: 0.00
      }
    ],
    promotionStartTime: moment(),
    promotionEndTime: moment(),
    promotionPrice: 0,
    // 会员价格
    memberPriceList: [
      {
        // "id": 204,
        // "productId": 26,
        "memberLevelId": 1,
        "memberPrice": 0,
        "memberLevelName": "黄金会员"
      },
      {
        // "id": 205,
        // "productId": 26,
        "memberLevelId": 2,
        "memberPrice": 0,
        "memberLevelName": "白金会员"
      },
      {
        // "id": 206,
        // "productId": 26,
        "memberLevelId": 3,
        "memberPrice": 0,
        "memberLevelName": "钻石会员"
      }
    ]
  },
  productListInfo: {},
  productAttrInfo: {},
  // 商品分类
  productCategorySelectList: [],
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
  // 专题列表
  subjectList: [],
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
    case 'FETCH_BRAND_LIST':
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
    case 'FETCH_PRODUCT_CATEGORY_WITH_CHILDREN':
      result.productCategorySelectList = payload;
      break;
    // 获取专题列表
    case 'FETCH_SUBJECT_LIST':
      result.subjectList = payload;
      break;
    default:
  }
  return result;
}

export default reducer;
