import CouponModel from '@/models/CouponModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_COUPON_DETAIL: 'FETCH_COUPON_DETAIL',
  FETCH_COUPON_HISTORY: 'FETCH_COUPON_HISTORY'
};

// 优惠券详情
export async function fetchCouponDetail(id) {
  const payload = await new CouponModel().fetchCouponDetail(id);
  return {
    type: ACTION_TYPES.FETCH_COUPON_DETAIL,
    payload
  }
}

// 优惠券领取记录
export async function fetchCouponHistory(id) {
  const payload = await new CouponModel().fetchCouponHistory(id);
  return {
    type: ACTION_TYPES.FETCH_COUPON_HISTORY,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchCouponDetail: async (...args) => {
      dispatch(await fetchCouponDetail(...args));
      changeLoading(false);
    },
    fetchCouponHistory: async (...args) => {
      dispatch(await fetchCouponHistory(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  fetchCouponDetail,
  fetchCouponHistory
}
