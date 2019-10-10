import FlashModel from '@/models/FlashModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_FLASH_LIST: 'FETCH_FLASH_LIST',
  UPDATE_FLASH_LIST: 'UPDATE_FLASH_LIST'
};

/**
 * 获取秒杀列表
 */
export async function fetchFlashList({ pageNum, pageSize, ...res }) {
  const payload = await new FlashModel().fetchFlashList({ pageNum, pageSize, ...res });
  return {
    type: ACTION_TYPES.FETCH_FLASH_LIST,
    payload
  }
}



/**
 * 更新秒杀
 */
export async function updateFlash({ id, status }) {
  const payload = await new FlashModel().updateFlash({ id, status });
  return {
    type: ACTION_TYPES.UPDATE_FLASH_LIST,
    payload
  }
}


/**
 * 更新秒杀状态
 */
export async function fetchFlashStatust({ id, status }) {
  const payload = await new FlashModel().fetchFlashStatust({ id, status });
  return {
    type: ACTION_TYPES.UPDATE_FLASH_LIST,
    payload
  }
}



/**
 * 添加
 */
export async function createFlash({ status }) {
  const payload = await new FlashModel().createFlash({ status });
  return {
    type: ACTION_TYPES.UPDATE_FLASH_LIST,
    payload
  }
}




export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchFlashList: async (...args) => {
      dispatch(await fetchFlashList(...args));
      changeLoading(false);
    },
    updateFlash: async (...args) => {
      dispatch(await updateFlash(...args));
      changeLoading(false);
    },
    fetchFlashStatust: async (...args) => {
      dispatch(await fetchFlashStatust(...args));
      changeLoading(false);
    },
    createFlash: async (...args) => {
      dispatch(await createFlash(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES
}
