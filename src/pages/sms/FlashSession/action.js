import FlashSessionModel from '@/models/FlashSessionModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_FLASHSESSION_LIST: 'FETCH_FLASHSESSION_LIST',
  CHEANGE_FLASHSESSION:'CHEANGE_FLASHSESSION'
}

/**
 * 获取时间段
 */
export async function fetchFlashSession({ ...res }) {
  const payload = await new FlashSessionModel().fetchFlashSession({ ...res });
  return {
    type: ACTION_TYPES.FETCH_FLASHSESSION_LIST,
    payload
  }
}

/**
 * 添加时间段
 */
export async function createFlashSession({ ...res }) {
  const payload = await new FlashSessionModel().createFlashSession({ ...res });
  return {
    type: ACTION_TYPES.CHEANGE_FLASHSESSION,
    payload
  }
}



/**
 * 更新时间段
 */
export async function updateFlashSession({ ...res }) {
  const payload = await new FlashSessionModel().updateFlashSession({ ...res });
  return {
    type: ACTION_TYPES.CHEANGE_FLASHSESSION,
    payload
  }
}
export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchFlashSession: async (...args) => {
      dispatch(await fetchFlashSession(...args));
      changeLoading(false);
    },
    createFlashSession: async (...args) => {
      dispatch(await createFlashSession(...args));
      changeLoading(false);
    },
    updateFlashSession: async (...args) => {
      dispatch(await updateFlashSession(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
}
