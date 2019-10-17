import AdvertiseModel from '@/models/AdvertiseModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_ADVERTISE_LIST: 'FETCH_ADVERTISE_LIST',
  UPDATE_ADVERTISE_STATUS: 'UPDATE_ADVERTISE_STATUS',
  DELETE_ADVERTISE_BY_ID: 'DELETE_ADVERTISE_BY_ID'
}

/**
 * 获取广告列表
 */
export async function fetchAdvertiseList({ pageNum, pageSize, ...res }) {
  const payload = await new AdvertiseModel().fetchAdvertiseList({ pageNum, pageSize, ...res });
  return {
    type: ACTION_TYPES.FETCH_ADVERTISE_LIST,
    payload
  }
}

/**
 * 更改广告上线状态
 * @param {*} dispatch
 * @param {*} ownProps
 */
export async function updateAdvertiseStatus({ id, status }) {
  const updateStatus = await new AdvertiseModel().updateAdvertiseStatus({ id, status });
  return {
    type: ACTION_TYPES.UPDATE_ADVERTISE_STATUS,
    payload: {
      id,
      status,
      updateStatus
    }
  }
}

/**
 * 删除广告
 */
export async function deleteAdvertiseById(ids) {
  const deleteStatus = await new AdvertiseModel().deleteAdvertise(ids);
  return {
    type: ACTION_TYPES.DELETE_ADVERTISE_BY_ID,
    payload: {
      ids,
      deleteStatus
    }
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchAdvertiseList: async (...args) => {
      dispatch(await fetchAdvertiseList(...args));
      changeLoading(false);
    },
    updateAdvertiseStatus: async (...args) => {
      dispatch(await updateAdvertiseStatus(...args));
      changeLoading(false);
    },
    deleteAdvertiseById: async (...args) => {
      dispatch(await deleteAdvertiseById(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchAdvertiseList,
  updateAdvertiseStatus,
  deleteAdvertiseById
}
