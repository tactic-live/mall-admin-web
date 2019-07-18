import BrandModel from '@/models/Brand';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_BRAND: 'FETCH_BRAND',
  UPDATE_FACTORY_STATUS: 'UPDATE_FACTORY_STATUS',
  UPDATE_SHOW_STATUS: 'UPDATE_SHOW_STATUS',
  DELETE_BRAND: 'DELETE_BRAND'
};

export async function fetchBrand(pageNum, pageSize = 5) {
  const payload = await new BrandModel().fetchBrand(pageNum, pageSize);
  return {
    type: ACTION_TYPES.FETCH_BRAND,
    payload
  }
}

/**
 * 批量更新厂家制造商状态
 *
 * @param {*} ids id数组
 * @param {*} factoryStatus 厂家制造商状态
 */
export async function updateFactoryStatus(ids, factoryStatus) {
  await new BrandModel().updateFactoryStatus(ids, factoryStatus);
  return {
    type: ACTION_TYPES.UPDATE_FACTORY_STATUS,
    payload: { ids, factoryStatus }
  }
}


/**
 * 批量更新厂家制造商状态
 *
 * @param {*} ids id数组
 * @param {*} factoryStatus 厂家制造商状态
 */
export async function deleteBrand(id) {
  await new BrandModel().deleteBrand(id);
  return {
    type: ACTION_TYPES.DELETE_BRAND,
    payload: { id }
  }
}

/**
 * 批量更新显示状态
 *
 * @param {*} ids id数组
 * @param {*} showStatus 显示状态
 */
export async function updateShowStatus(ids, showStatus) {
  await new BrandModel().updateShowStatus(ids, showStatus);
  return {
    type: ACTION_TYPES.UPDATE_SHOW_STATUS,
    payload: { ids, showStatus }
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchAll: async (...args) => {
      dispatch(await fetchBrand(...args));
      changeLoading(false);
    },
    updateFactoryStatus: async (...args) => {
      dispatch(await updateFactoryStatus(...args));
      changeLoading(false);
    },
    updateShowStatus: async (...args) => {
      dispatch(await updateShowStatus(...args));
      changeLoading(false);
    },
    deleteBrand: async (...args) => {
      dispatch(await deleteBrand(...args));
      changeLoading(false);
    },

  }
}

export default {
  ACTION_TYPES,
  fetchBrand,
  updateFactoryStatus,
  deleteBrand
}
