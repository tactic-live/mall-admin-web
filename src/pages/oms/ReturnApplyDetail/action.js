import ReturnApplyModel from '@/models/ReturnApplyModel';
import CompanyAddressModel from '@/models/CompanyAddressModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_RETURN_APPLY_DETAIL_BY_ID: 'FETCH_RETURN_APPLY_DETAIL_BY_ID',
  FETCH_RETURN_COMPANY_ADDRESS_LIST: 'FETCH_RETURN_COMPANY_ADDRESS_LIST',
  UPDATE_RETURN_STATUS: 'UPDATE_RETURN_STATUS'
};

/**
 * 获取退货详情
 * @param {*} id  退货订单id
 */
export async function fetchReturnApplyDetailById(id) {
  const payload = await new ReturnApplyModel().fetchReturnApplyDetailById(id);
  return {
    type: ACTION_TYPES.FETCH_RETURN_APPLY_DETAIL_BY_ID,
    payload
  }
}

/**
 * 获取退货地址列表
 */
export async function fetchReturnCompanyAddressList() {
  const payload = await new CompanyAddressModel().fetchReturnCompanyAddressList();
  return {
    type: ACTION_TYPES.FETCH_RETURN_COMPANY_ADDRESS_LIST,
    payload
  }
}

/**
 * 更改退货订单状态
 */
export async function updateReturnStatus(params) {
  const payload = await new ReturnApplyModel().updateReturnStatus(params);
  return {
    type: ACTION_TYPES.UPDATE_RETURN_STATUS,
    payload
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    async fetchReturnApplyDetailById(...args) {
      dispatch(await fetchReturnApplyDetailById(...args));
      changeLoading(false);
    },
    async fetchReturnCompanyAddressList(...args) {
      dispatch(await fetchReturnCompanyAddressList(...args));
      changeLoading(false);
    },
    async updateReturnStatus(...args) {
      dispatch(await updateReturnStatus(...args));
      changeLoading(false);
    }
  }
}

export default {
  ACTION_TYPES,
  fetchReturnApplyDetailById,
  fetchReturnCompanyAddressList
}
