

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
  returnReasonList: {},
  // addReturnReasonStatus: false,
  returnApplyDetail: {},
  returnAdderssList: [],
  updateReturnApplyStatus: false,
  orderDetail: {},
  returnApplyList: []
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
        const { ids, status } = payload;
        result.returnReasonList.list = result.returnReasonList.list.map(returnReasonItem => {
          if (ids.indexOf(returnReasonItem.id) > -1) {
            returnReasonItem.status = status;
          }
          return returnReasonItem;
        })
      }
      break;
    case 'DELETE_RETURN_REASON_BY_ID':
      if (payload.deleteResult && result.returnReasonList) {
        const { ids } = payload;
        const newList = [];
        result.returnReasonList.list.forEach(reasonItem => {
          let reasonItemTemp = reasonItem;
          if (ids.indexOf(reasonItemTemp.id) > -1) {
            reasonItemTemp.delStatus = true;
          }
          newList.push(reasonItemTemp);
        });
        result.returnReasonList.list = newList;
      }
      break;
    // case 'ADD_RETURN_REASON':
    //   if (payload.addResult) {
    //     result.addReturnReasonStatus = true;
    //   }
    //   break;
    case 'UPDATE_RETURN_REASON':
      if (payload.updateResult && result.returnReasonList) {
        const { returnData = {} } = payload;
        const { id = '', name = '', sort = 0, status = 0 } = returnData;
        const newList = [];
        result.returnReasonList.list.forEach(reasonItem => {
          let reasonItemTemp = reasonItem;
          if (reasonItemTemp.id === id) {
            reasonItemTemp.name = name;
            reasonItemTemp.sort = sort;
            reasonItemTemp.status = status;
          }
          newList.push(reasonItemTemp);
        });
        result.returnReasonList.list = newList;
      }
      break;
    case 'FETCH_RETURN_APPLY_DETAIL_BY_ID':
      result.returnApplyDetail = payload;
      break;
    case 'FETCH_RETURN_COMPANY_ADDRESS_LIST':
      result.returnAdderssList = payload;
      break;
    case 'UPDATE_RETURN_STATUS':
      result.updateReturnApplyStatus = payload;
      break;
    case 'FETCH_ORDER_DETAIL':
      result.orderDetail = payload;
      break;
    case 'DELETE_ORDERS':
      result.deleteOrderCount = payload;
      break;
    case 'UPDATE_ORDER_NOTE':
      result.updateOrderNote = payload;
      break;
    case 'FETCH_RETURN_APPLY_LIST':
      result.returnApplyList = payload;
      break;
    default:
  }
  return result;
}

export default reducer;
