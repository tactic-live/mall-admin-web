import FlashSessionModel from '@/models/FlashSessionModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_FLASH_TIME_LIST: 'FETCH_FLASH_TIME_LIST',
}

/**
 * 获取人气推荐列表
 */
export async function fetchFlashSessionList({ ...res }) {
  const payload = await new FlashSessionModel().fetchFlashSessionList({ ...res });
  console.log('payload', payload)
  return {
    type: ACTION_TYPES.FETCH_FLASH_TIME_LIST,
    payload
  }
}


export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchFlashSessionList: async (...args) => {
      dispatch(await fetchFlashSessionList(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchFlashSessionList
}
