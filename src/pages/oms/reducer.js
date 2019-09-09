

const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  orderList: [],
  loading: true,
}

function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  const result = { ...state };
  switch (type) {
    case 'LOADING':
      result.loading = payload;
      break;
    case 'FETCH_ORDER_LIST':
      result.orderList = payload;
    default:
  }
  return result;
}

export default reducer;
