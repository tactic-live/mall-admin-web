import BrandModel from '@/models/BrandModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_BRAND_LIST: 'FETCH_BRAND_LIST',
  ADD_RECOMMEND_BRANDS: 'ADD_RECOMMEND_BRANDS',
  UPDATE_BRAND_RECOMMEND_STATUS: 'UPDATE_BRAND_RECOMMEND_STATUS',
  UPDATE_BRAND_SORT: 'UPDATE_BRAND_SORT',
  DELETE_BRANDS: 'DELETE_BRANDS'
};

/**
 * 获取品牌推荐列表
 */
export async function fetchBrandList({ pageNum, pageSize, ...res }) {
  const payload = await new BrandModel().fetchBrandList({ pageNum, pageSize, ...res });
  return {
    type: ACTION_TYPES.FETCH_BRAND_LIST,
    payload
  }
}

/**
 * 新增品牌推荐
 * @param {Array} brandList 品牌列表
 */
export async function addRecommendBrands(brandList) {
  const payload = await new BrandModel().addRecommendBrands(brandList);
  return {
    type: ACTION_TYPES.ADD_RECOMMEND_BRANDS,
    payload
  }
}

/**
 * 更新推荐状态
 * @param {Array} ids 编号列表
 * @param {Number} recommendStatus 推荐状态 0-未推荐 1-推荐中
 */
export async function updateBrandRecommendStatus(ids, recommendStatus) {
  const payload = await new BrandModel().updateBrandRecommendStatus(ids, recommendStatus);
  return {
    type: ACTION_TYPES.UPDATE_BRAND_RECOMMEND_STATUS,
    payload: {
      ids,
      recommendStatus,
      count: payload
    }
  }
}

/**
 * 更新排序
 * @param {Number} id 编号
 * @param {Number} sort 排序值
 */
export async function updateBrandSort(id, sort) {
  const payload = await new BrandModel().updateBrandSort(id, sort);
  return {
    type: ACTION_TYPES.UPDATE_BRAND_SORT,
    payload: {
      id,
      sort,
      count: payload
    }
  }
}

/**
 * 删除推荐
 * @param {Array} ids 编号s
 */
export async function deleteBrands(ids) {
  const payload = await new BrandModel().deleteBrands(ids);
  return {
    type: ACTION_TYPES.DELETE_BRANDS,
    payload: {
      ids,
      count: payload
    }
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchBrandList: async (...args) => {
      dispatch(await fetchBrandList(...args));
      changeLoading(false);
    },
    addRecommendBrands: async (...args) => {
      changeLoading(true);
      dispatch(await addRecommendBrands(...args));
      changeLoading(false);
    },
    updateBrandRecommendStatus: async (...args) => {
      changeLoading(true);
      dispatch(await updateBrandRecommendStatus(...args));
      changeLoading(false);
    },
    updateBrandSort: async (...args) => {
      changeLoading(true);
      dispatch(await updateBrandSort(...args));
      changeLoading(false);
    },
    deleteBrands: async (...args) => {
      changeLoading(true);
      dispatch(await deleteBrands(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES
}
