import FlashSessionModel from '@/models/FlashSessionModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_FLASH_PRODUCTION_RELATION: 'FETCH_FLASH_PRODUCTION_RELATION',
  UPDATE_FLASH_PRODUCTION_RELATION: 'UPDATE_FLASH_PRODUCTION_RELATION',
  DELECT_FLASH_PRODUCTION_RELATION: 'DELECT_FLASH_PRODUCTION_RELATION',
}

/**
 * 获取秒杀商品列表
 */
export async function fetchFlashProductionRelationList({ pageNum, pageSize, ...res }) {
  const payload = await new FlashSessionModel().fetchFlashProductionRelation({ pageNum, pageSize, ...res });
  console.log('fetchFlashProductionRelationList', payload)
  return {
    type: ACTION_TYPES.FETCH_FLASH_PRODUCTION_RELATION,
    payload
  }
}


// 更新秒杀商品
export async function updateFlashProductionRelation({ ...data }) {
  const payload = await new FlashSessionModel().updateFlashProductionRelation({ ...data });
  console.log('updateFlashProductionRelation', {
    type: ACTION_TYPES.UPDATE_FLASH_PRODUCTION_RELATION,
    payload
  })
  return {
    type: ACTION_TYPES.UPDATE_FLASH_PRODUCTION_RELATION,
    payload
  }
}


// 删除秒杀商品
export async function delectFlashProductionRelation(id) {
  console
  const payload = await new FlashSessionModel().delectFlashProductionRelation(id);
  return {
    type: ACTION_TYPES.DELECT_FLASH_PRODUCTION_RELATION,
    payload
  }
}


export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchFlashProductionRelationList: async (...args) => {
      dispatch(await fetchFlashProductionRelationList(...args));
      changeLoading(false);
    },
    updateFlashProductionRelation: async (...args) => {
      dispatch(await updateFlashProductionRelation(...args));
      changeLoading(false);
    },
    delectFlashProductionRelation: async (...args) => {
      dispatch(await delectFlashProductionRelation(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchFlashProductionRelationList,
  updateFlashProductionRelation,
  delectFlashProductionRelation
}
