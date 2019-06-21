import ProductAttributeModel from '@/models/ProductAttributeModel';

export const ACTION_TYPES = {
  UPDATE_PRODUCT_ATTRIBUTE_CATEGORY: 'UPDATE_PRODUCT_ATTRIBUTE_CATEGORY'
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
  updateAttributeCategory,
  initPage
}
