import ProductAttributeModel from '@/models/ProductAttributeModel';
import RootActions from '../action';

export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  CREATE_PRODUCT_ATTRIBUTE_CATEGORY: 'CREATE_PRODUCT_ATTRIBUTE_CATEGORY',
  UPDATE_PRODUCT_ATTRIBUTE_CATEGORY: 'UPDATE_PRODUCT_ATTRIBUTE_CATEGORY',
  FETCH_PRODUCT_ATTRIBUTE_LIST_BY_ID: 'FETCH_PRODUCT_ATTRIBUTE_LIST_BY_ID',
  DELETE_PRODUCT_ATTRIBUTE: 'DELETE_PRODUCT_ATTRIBUTE'
};

export async function updateAttributeCategory(id, name) {
  await new ProductAttributeModel().updateAttributeCategory(id, name);
  return {
    type: ACTION_TYPES.UPDATE_PRODUCT_ATTRIBUTE_CATEGORY,
    payload: {
      id,
      name
    }
  }
}

export async function createAttributeCategory(name) {
  await new ProductAttributeModel().createAttributeCategory(name);
  return {
    type: ACTION_TYPES.CREATE_PRODUCT_ATTRIBUTE_CATEGORY,
    payload: {
      name
    }
  }
}

export async function deleteProductAttribute(id) {
  await new ProductAttributeModel().deleteProductAttribute(id);
  return {
    type: ACTION_TYPES.DELETE_PRODUCT_ATTRIBUTE,
    payload: {
      id
    }
  }
}

export async function fetchAttributeListById(id, type, pageNumm = 1, pageSize = 5) {
  const payload = await new ProductAttributeModel().fetchAttributeById(id, type, pageNumm, pageSize);
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTE_LIST_BY_ID,
    payload
  }
}

export function actions(dispatch, ownProps) {
  console.log('ownProps', ownProps)
  const { changeLoading } = RootActions.actions(dispatch, ownProps);
  return {
    changeLoading,
    fetchAll: async (...args) => {
      dispatch(await fetchAttributeListById(...args));
      changeLoading(false);
    },
    deleteProductAttribute: async (...args) => {
      dispatch(await deleteProductAttribute(...args));
      changeLoading(false);
    },
  }
}

export default {
  ACTION_TYPES,
  updateAttributeCategory,
  fetchAttributeListById
}
