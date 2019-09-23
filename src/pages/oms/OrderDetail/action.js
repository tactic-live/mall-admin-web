import OrderModel from '@/models/OrderModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_ORDER_DETAIL: 'FETCH_ORDER_DETAIL'
};

export async function fetchOrderDetail(id) {
  const payload = await new OrderModel().fetchOrderDetail(id);

  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAIL,
    payload
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchOrderDetail: async (...args) => {
      dispatch(await fetchOrderDetail(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchOrderDetail
}
