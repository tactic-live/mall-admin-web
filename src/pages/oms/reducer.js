

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
  isOrderSettingUpdateSuccess: true,
  returnReasonList: [],
  deleteReturnReasonStatus: false,
  addReturnReasonStatus: false,
  updateReturnReasonStatus: false
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
        isOrderSettingUpdateSuccess: payload.isOrderSettingUpdateSuccess
      };
      break;
    case 'FETCH_RETURN_REASON':
      result.returnReasonList = payload;
      break;
    case 'UPDATE_RETURN_REASON_USE_STATUS':
      if (payload.updateResult && result.returnReasonList) {
        result.returnReasonList.list = result.returnReasonList.list.map(returnReasonItem => {
          if (returnReasonItem.id === payload.ids) {
            returnReasonItem.status = payload.status;
          }
          return returnReasonItem;
        })
      }
      break;
    case 'DELETE_RETURN_REASON_BY_ID':
      if (payload.deleteResult) {
        result.deleteReturnReasonStatus = true;
      }
      // if (result.returnReasonList) {
      //   const index = result.returnReasonList.list.findIndex(returnReasonItem => returnReasonItem.id === payload.ids);
      //   result.returnReasonList.list.splice(index, 1);
      // }
      break;
    case 'ADD_RETURN_REASON':
      if (payload.addResult) {
        result.addReturnReasonStatus = true;
      }
      break;
    case 'UPDATE_RETURN_REASON':
      if (payload.updateResult) {
        result.updateReturnReasonStatus = true;
      }
      break;
    default:
  }
  return result;
}

export default reducer;
