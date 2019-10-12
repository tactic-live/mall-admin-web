import CouponModel from '@/models/CouponModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_COUPON_LIST: 'FETCH_COUPON_LIST',
  COUPON_DELETE: 'COUPON_DELETE',
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

// 删除优惠券
export async function deleteCoupon(id) {
  const payload = await new CouponModel().deleteCoupon(id);
  return {
    type: ACTION_TYPES.COUPON_DELETE,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchCouponListCondition: async (...args) => {
      dispatch(await fetchCouponListCondition(...args));
      changeLoading(false);
    },
    deleteCoupon: async (...args) => {
      dispatch(await deleteCoupon(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchCouponListCondition,
  deleteCoupon
}
