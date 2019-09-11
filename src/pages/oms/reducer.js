

const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  orderList: [],
  loading: true,
  orderSetting: {
    flashOrderOvertime: 0,
    normalOrderOvertime: 0,
    confirmOvertime: 0,
    finishOvertime: 0,
    commentOvertime: 0,
    id: 0
  },
  isOrderSettingUpdateSuccess: true
}

function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  let result = { ...state };
  switch (type) {
    case 'LOADING':
      result.loading = payload;
      break;
    case 'FETCH_ORDER_LIST':
      result.orderList = payload;
      break;
    case 'FETCH_ORDER_SETTING':
      result = {
        ...result,
        orderSetting: payload
      };
      console.log("payload", result);
      break;
    case 'UPDATE_ORDER_SETTING':
      result = {
        ...result,
        orderSetting: payload.orderSetting,
        isOrderSettingUpdateSuccess:payload.isOrderSettingUpdateSuccess
      };
      break;
    default:
  }
  return result;
}

export default reducer;
