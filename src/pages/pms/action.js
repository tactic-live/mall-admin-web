import ProductActions from './Goods/action';

const { ACTION_TYPES: PRODUCT_ACTION_TYPES, ...productRest } = ProductActions;

export const ACTION_TYPES = {
  ...PRODUCT_ACTION_TYPES,
  LOADING: 'LOADING',
}

export async function wrapLoading(func) {
  await func.apply(this, arguments);

}

export const actions = (dispatch, ownProps) => {
  return {
    changeLoading: (isLoading) => {
      dispatch({
        type: ACTION_TYPES.LOADING,
        payload: isLoading
      })
    }
  }
};

export default {
  ACTION_TYPES,
  actions
};
