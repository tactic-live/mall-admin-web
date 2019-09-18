import OrderModel from '@/models/OrderModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_ORDER_LIST: 'FETCH_ORDER_LIST'
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

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchOrderListCondition: async (...args) => {
      dispatch(await fetchOrderListCondition(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchOrderListCondition
}
