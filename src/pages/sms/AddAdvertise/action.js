import AdvertiseModel from '@/models/AdvertiseModel';
import RootActions from '../action';
import { notification } from 'antd';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  ADD_ADVERTISE: 'ADD_ADVERTISE'
}

/**
 * 增加广告
 */
export async function addAdvertise(adParams) {
  const payload = await new AdvertiseModel().addAdvertise(adParams);
  return {
    type: ACTION_TYPES.ADD_ADVERTISE,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    addAdvertise: async (...args) => {
      const action = await addAdvertise(...args);
      const { payload } = action;
      if (payload) {
        notification.open({
          description: '添加广告成功',
        });
      }
      dispatch(action);

      changeLoading(false);


    }
  }
}

export default {
  ACTION_TYPES,
  addAdvertise
}
