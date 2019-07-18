import BrandModel from '@/models/Brand';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  ADD_BRAND: 'ADD_BRAND',
  FETCH_BRAND_BY_ID: 'FETCH_BRAND_BY_ID',
  UPDATE_BRAND: 'UPDATE_BRAND'
};

/**
 * 添加品牌
 *
 * @param {*} brandInfo 品牌信息
 */
export async function addBrand(brandInfo) {
  const payload = await new BrandModel().addBrand(brandInfo);
  return {
    type: ACTION_TYPES.ADD_BRAND,
    payload
  }
}
/**
 * 更新品牌
 *
 * @param {*} brandInfo 品牌信息
 */
export async function updateBrand(brandInfo) {
  const payload = await new BrandModel().updateBrand(brandInfo);
  return {
    type: ACTION_TYPES.UPDATE_BRAND,
    payload
  }
}

/**
 * 获取品牌信息
 *
 * @param {number} id 品牌id
 */
export async function fetchBrandById(id) {
  const payload = await new BrandModel().fetchBrandById(id);
  return {
    type: ACTION_TYPES.FETCH_BRAND_BY_ID,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading, clearState } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    clearState,
    addBrand: async (...args) => {
      dispatch(await addBrand(...args));
      changeLoading(false);
    },
    updateBrand: async (...args) => {
      dispatch(await updateBrand(...args));
      changeLoading(false);
    },
    fetchBrandById: async (...args) => {
      dispatch(await fetchBrandById(...args));
      changeLoading(false);
    },

  }
}

export default {
  ACTION_TYPES,
}
