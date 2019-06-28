import ProductModel from '@/models/ProductModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_GOODS_BY_CONDITION: 'FETCH_GOODS_BY_CONDITION'
};

export async function fetchGoodsByCondition(condition) {
  const { pageNum, pageSize, goodsName, rest } = condition;
  const payload = await new ProductModel().fetchGoodsByCondition({
    pageNum,
    pageSize,
    keyword: goodsName,
    ...rest
  });

  return {
    type: ACTION_TYPES.FETCH_GOODS_BY_CONDITION,
    payload
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchGoodsByCondition: async (...args) => {
      dispatch(await fetchGoodsByCondition(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchGoodsByCondition
}
