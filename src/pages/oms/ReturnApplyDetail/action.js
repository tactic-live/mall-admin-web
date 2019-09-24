import ReturnApplyModel from '@/models/ReturnApplyModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_RETURN_APPLY_DETAIL_BY_ID: 'FETCH_RETURN_APPLY_DETAIL_BY_ID'
};

/**
 * 获取退货详情
 * @param {*} id  退货订单id
 */
export async function fetchReturnApplyDetailById(id) {
  const payload = await new ReturnApplyModel().fetchReturnApplyDetailById(id);
  return {
    type: ACTION_TYPES.FETCH_RETURN_APPLY_DETAIL_BY_ID,
    payload
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    async fetchReturnApplyDetailById(...args) {
      dispatch(await fetchReturnApplyDetailById(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchReturnApplyDetailById
}
