import OrderModel from '@/models/OrderSettingMode';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_ORDER_SETTING: 'FETCH_ORDER_SETTING',
  UPDATE_ORDER_SETTING: 'UPDATE_ORDER_SETTING'
};

export async function fetchOrderSetting(id) {
  const payload = await new OrderModel().fetchOrderSetting(id);
  return {
    type: ACTION_TYPES.FETCH_ORDER_SETTING,
    payload
  }
}

export async function updateOrderSetting({ id, condition }) {
  const payload = await new OrderModel().updatehOrderSetting({ id, condition });
  const data = { ...condition, id };
  if ( payload.code && Number(payload.code) === 200) {
    return {
      type: ACTION_TYPES.UPDATE_ORDER_SETTING,
      payload: {
        orderSetting: data,
        isOrderSettingUpdateSuccess:true
      } 
    }
  }else{
    return {
      type: ACTION_TYPES.UPDATE_ORDER_SETTING,
      payload: {
        orderSetting: data,
        isOrderSettingUpdateSuccess:false
      } 
    }
  }

}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchOrderSetting: async (...args) => {
      dispatch(await fetchOrderSetting(...args));
      changeLoading(false);
    },
    updateOrderSetting: async (...args) => {
      dispatch(await updateOrderSetting(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchOrderSetting,
  updateOrderSetting
}
