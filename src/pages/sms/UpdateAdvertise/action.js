import AdvertiseModel from '@/models/AdvertiseModel';
import RootActions from '../action';
import { notification } from 'antd';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_ADVERTISE_DETAIL_BY_ID: 'FETCH_ADVERTISE_DETAIL_BY_ID',
  UPDATE_ADVERTISE: 'UPDATE_ADVERTISE',
  UPDATE_UPLOAD_PIC: 'UPDATE_UPLOAD_PIC'
}

/**
 * 获取广告详情
 */
export async function fetchAdvertiseDetailById(id) {
  const payload = await new AdvertiseModel().fetchAdvertiseDetail(id);
  return {
    type: ACTION_TYPES.FETCH_ADVERTISE_DETAIL_BY_ID,
    payload
  }
}

/**
 * 编辑广告
 */
export async function updateAdvertise(adParams) {
  const payload = await new AdvertiseModel().updateAdvertise(adParams);
  return {
    type: ACTION_TYPES.UPDATE_ADVERTISE,
    payload
  }
}

/**
 * 更改上传图片
 */
export async function updateUploadPic(picFile) {
  return {
    type: ACTION_TYPES.UPDATE_UPLOAD_PIC,
    payload: picFile
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchAdvertiseDetailById: async (...args) => {
      dispatch(await fetchAdvertiseDetailById(...args));
      changeLoading(false);
    },
    updateAdvertise: async (...args) => {
      const action = await updateAdvertise(...args);
      if (action.payload) {
        notification.open({
          description: '编辑广告成功',
        });
      }
      dispatch(action);
      changeLoading(false);
    },
    updateUploadPic: async (...args) => {
      dispatch(await updateUploadPic(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchAdvertiseDetailById,
  updateAdvertise,
  updateUploadPic
}
