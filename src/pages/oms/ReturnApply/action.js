import ReturnApplyModel from '@/models/ReturnApplyModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_RETURN_APPLY_LIST: 'FETCH_RETURN_APPLY_LIST',
  DELIVER_RETURN_ALLPY: 'DELIVER_RETURN_ALLPY'
};

export async function fetchReturnApplyList(condition) {
  console.log('fetchReturnApplyList', condition);
  const { pageNum, pageSize, ...res } = condition;
  const payload = await new ReturnApplyModel().fetchReturnApplyList({
    pageNum: pageNum,
    pageSize: pageSize,
    ...res
  });

  return {
    type: ACTION_TYPES.FETCH_RETURN_APPLY_LIST,
    payload
  }
}

export async function delectReturnAllpy(condition) {
  console.log('delectReturnAllpy', condition);
  const { pageNum, pageSize, ...res } = condition;
  const payload = await new ReturnApplyModel().fetchReturnApplyList({
    pageNum: pageNum,
    pageSize: pageSize,
    ...res
  });

  return {
    type: ACTION_TYPES.DELIVER_RETURN_ALLPY,
    payload
  }
}


export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchReturnApplyList: async (...args) => {
      dispatch(await fetchReturnApplyList(...args));
      changeLoading(false);
    },
    delectReturnAllpy: async (...args) => {
      dispatch(await delectReturnAllpy(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchReturnApplyList,
  delectReturnAllpy
}
