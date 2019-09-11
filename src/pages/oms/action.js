
export const ACTION_TYPES = {
  LOADING: 'LOADING',
  OMS_CLEAR: 'OMS_CLEAR',
  FETCH_BRAND_LIST: 'FETCH_BRAND_LIST',
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
    },
    clearState: (name, value) => {
      dispatch({
        type: ACTION_TYPES.OMS_CLEAR,
        payload: { name, value }
      })
    },
  }
};

export default {
  ACTION_TYPES,
  actions
};