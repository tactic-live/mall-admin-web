import CouponModel from '@/models/CouponModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_COUPON_LIST: 'FETCH_COUPON_LIST'
};

// 优惠券列表
export async function fetchCouponListCondition(condition) {
  const { pageNum, pageSize, ...res } = condition;
  const payload = await new CouponModel().fetchCouponList({
    pageNum: pageNum,
    pageSize: pageSize,
    ...res
  });

  return {
    type: ACTION_TYPES.FETCH_COUPON_LIST,
    payload
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchCouponListCondition: async (...args) => {
      dispatch(await fetchCouponListCondition(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchCouponListCondition
}
