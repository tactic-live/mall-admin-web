import ProductAttributeModel from '@/models/ProductAttributeModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_PRODUCT_ATTRIBUTE: 'FETCH_PRODUCT_ATTRIBUTE',
  CREATE_PRODUCT_ATTRIBUTE: 'CREATE_PRODUCT_ATTRIBUTE',
  UPDATE_PRODUCT_ATTRIBUTE: 'UPDATE_PRODUCT_ATTRIBUTE',
};

export async function fetchProductAttribute(id) {
  const payload = await new ProductAttributeModel().fetchProductAttribute(id);
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTE,
    payload
  }
}

export async function createProductAttribute(productAttributeInfo) {
  const payload = await new ProductAttributeModel().createProductAttribute(productAttributeInfo);
  return {
    type: ACTION_TYPES.CREATE_PRODUCT_ATTRIBUTE,
    payload
  }
}

export async function updateProductAttribute(productAttributeInfo) {
  const payload = await new ProductAttributeModel().updateProductAttribute(productAttributeInfo);
  return {
    type: ACTION_TYPES.UPDATE_PRODUCT_ATTRIBUTE,
    payload
  }
}

export function actions(dispatch, ownProps) {
  const { changeLoading, fetchAllAttributeCategory, clearState } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    clearState,
    async fetchProductAttribute(...args) {
      const action = await fetchProductAttribute(...args);
      dispatch(action);
      changeLoading(false);
    },
    async fetchAllAttributeCategory() {
      await fetchAllAttributeCategory();
    },
    async createProductAttribute(...args) {
      await createProductAttribute(...args);
      changeLoading(false);
    },
    async updateProductAttribute(...args) {
      await updateProductAttribute(...args);
      changeLoading(false);
    },
    async deleteProductAttribute(...args) {
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES
}
