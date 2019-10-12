import CouponModel from '@/models/CouponModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  FETCH_COUPON_DETAIL: 'FETCH_COUPON_DETAIL',
  COUPON_ADD: 'COUPON_ADD',
  COUPON_UPDATE: 'COUPON_UPDATE',
};

// 添加优惠券
export async function addCoupon(params) {
  const payload = await new CouponModel().addCoupon(params);
  return {
    type: ACTION_TYPES.COUPON_ADD,
    payload
  }
}

// 更新优惠券
export async function updateCoupon(id, params) {
  const payload = await new CouponModel().updateCoupon(id, params);
  return {
    type: ACTION_TYPES.COUPON_UPDATE,
    payload
  }
}

// 优惠券详情
export async function fetchCouponDetail(id) {
  const payload = await new CouponModel().fetchCouponDetail(id);
  return {
    type: ACTION_TYPES.FETCH_COUPON_DETAIL,
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
    addCoupon: async (...args) => {
      dispatch(await addCoupon(...args));
      changeLoading(false);
    },
    updateCoupon: async (...args) => {
      dispatch(await updateCoupon(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchCouponDetail,
  addCoupon,
  updateCoupon
}
