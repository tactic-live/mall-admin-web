import ProductModel from '@/models/ProductModel';

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

export async function initPage(ownProps) {
  return {

  }
}

export function actions(dispatch, ownProps) {
  return {
    ...dispatch(initPage(ownProps))
  }
}

export default {
  ACTION_TYPES,
  fetchGoodsByCondition,
  initPage
}
