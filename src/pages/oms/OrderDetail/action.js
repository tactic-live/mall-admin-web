import OrderModel from '@/models/OrderModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_ORDER_DETAIL: 'FETCH_ORDER_DETAIL',
  DELETE_ORDERS: 'DELETE_ORDERS',
  UPDATE_ORDER_NOTE: 'UPDATE_ORDER_NOTE'
};

export async function fetchOrderDetail(id) {
  const payload = await new OrderModel().fetchOrderDetail(id);

  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAIL,
    payload
  }
}

// 删除订单
export async function deleteOrders(ids) {
  const payload = await new OrderModel().deleteOrders(ids);

  return {
    type: ACTION_TYPES.DELETE_ORDERS,
    payload
  }
}

// 备注订单
export async function updateOrderNote(id, note, status) {
  const payload = await new OrderModel().updateOrderNote(id, note, status);

  return {
    type: ACTION_TYPES.UPDATE_ORDER_NOTE,
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
    deleteOrders: async (...args) => {
      dispatch(await deleteOrders(...args));
      changeLoading(false);
    },
    updateOrderNote: async (...args) => {
      dispatch(await updateOrderNote(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchOrderDetail,
  deleteOrders,
  updateOrderNote
}
