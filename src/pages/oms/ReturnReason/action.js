import ReturnReasonModel from '@/models/ReturnReasonModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_RETURN_REASON: 'FETCH_RETURN_REASON',
  UPDATE_RETURN_REASON_USE_STATUS: 'UPDATE_RETURN_REASON_USE_STATUS',
  DELETE_RETURN_REASON_BY_ID: 'DELETE_RETURN_REASON_BY_ID',
  ADD_RETURN_REASON: 'ADD_RETURN_REASON',
  UPDATE_RETURN_REASON: 'UPDATE_RETURN_REASON'
};

/**
 * 分页查询退款原因
 * @param {Integer} pageNum
 * @param {Integer} pageSize
 */
export async function fetchReturnReason(pageNum = 1, pageSize = 5) {
  const payload = await new ReturnReasonModel().fetchReturnReason(pageNum, pageSize);
  return {
    type: ACTION_TYPES.FETCH_RETURN_REASON,
    payload
  }
}

/**
 * 更改退货原因使用状态
 * @param {*} status
 * @param {*} ids
 */
export async function updateReturnReasonUseStatus(status, ids) {
  const updateResult = await new ReturnReasonModel().updateUseStatus(status, ids);
  return {
    type: ACTION_TYPES.UPDATE_RETURN_REASON_USE_STATUS,
    payload: {
      ids,
      status,
      updateResult
    }
  }
}

/**
 * 删除退货原因
 * @param {Array} ids
 */
export async function deleteReturnReasonById(ids) {
  const deleteResult = await new ReturnReasonModel().deleteReturnReason(ids);
  return {
    type: ACTION_TYPES.DELETE_RETURN_REASON_BY_ID,
    payload: {
      ids,
      deleteResult
    }
  }
}

/**
 * 增加退货原因
 */
export async function addReturnReason(returnData = {}) {
  const addResult = await new ReturnReasonModel().addReturnReason(returnData);
  return {
    type: ACTION_TYPES.ADD_RETURN_REASON,
    payload: { addResult }
  }
}

/**
 * 修改退货原因
 * @param {*} returnData
 */
export async function updateReturnReason(returnData = {}) {
  const updateResult = await new ReturnReasonModel().updateReturnReason(returnData);
  return {
    type: ACTION_TYPES.UPDATE_RETURN_REASON,
    payload: { updateResult, returnData }
  }
}



export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    async fetchReturnReason(...args) {
      dispatch(await fetchReturnReason(...args));
      changeLoading(false);
    },
    async updateReturnReasonUseStatus(...args) {
      dispatch(await updateReturnReasonUseStatus(...args));
      changeLoading(false);
    },
    async deleteReturnReasonById(...args) {
      dispatch(await deleteReturnReasonById(...args));
      changeLoading(false);
    },
    async addReturnReason(...args) {
      dispatch(await addReturnReason(...args));
      changeLoading(false);
    },
    async updateReturnReason(...args) {
      dispatch(await updateReturnReason(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchReturnReason,
  updateReturnReasonUseStatus,
  deleteReturnReasonById,
  addReturnReason,
  updateReturnReason
}
