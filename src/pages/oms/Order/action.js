import OrderModel from '@/models/OrderModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_ORDER_LIST: 'FETCH_ORDER_LIST',
  DELIVER_ORDER: 'DELIVER_ORDER'
};

export async function fetchOrderListCondition(condition) {
  console.log('fetchOrderListCondition', condition);
  const { pageNum, pageSize, ...res } = condition;
  const payload = await new OrderModel().fetchOrderList({
    pageNum: pageNum,
    pageSize: pageSize,
    ...res
  });

  return {
    type: ACTION_TYPES.FETCH_ORDER_LIST,
    payload
  }
}

export async function deliverOrders(orders = []) {
  const payload = await new OrderModel().deliverOrders(orders);
  return {
    type: ACTION_TYPES.DELIVER_ORDER,
    payload
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchOrderListCondition: async (...args) => {
      dispatch(await fetchOrderListCondition(...args));
      changeLoading(false);
    },
    // 订单发货
    deliverOrders: async (...args) => {
      changeLoading(true);
      dispatch(await deliverOrders(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchOrderListCondition
}
