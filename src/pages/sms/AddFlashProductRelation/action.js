import AddFlashProductModel from '@/models/AddFlashProductModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  SHOW_FLASH_PRODUCTION_LIST: 'SHOW_FLASH_PRODUCTION_LIST',
  ADD_PRODUCTION: 'ADD_PRODUCTION'
}

/**
 * 秒杀时段商品列表
 * 
 */
export async function fetchProductList(adParams) {
  const payload = await new AddFlashProductModel().fetchProductList(adParams);
  console.log('fetchProductList', payload);
  return {
    type: ACTION_TYPES.SHOW_FLASH_PRODUCTION_LIST,
    payload
  }
}


export async function addProductList(adParams) {
  const payload = await new AddFlashProductModel().addProductList(adParams);
  console.log('addProductList', payload);
  return {
    type: ACTION_TYPES.ADD_PRODUCTION,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchProductList: async (...args) => {
      dispatch(await fetchProductList(...args));
      changeLoading(false);
    },
    addProductList: async (...args) => {
      const source = await addProductList(...args)
      dispatch(source);
      changeLoading(false);
      return source;
    },
  }
}

export default {
  ACTION_TYPES,
  fetchProductList,
  addProductList
}
